define([
    'jquery',
    'underscore',
    'backbone',
    'collections/categories/categories',
    'collections/posts/posts',
    'collections/users/users',
    'models/user/user',
    'views/posts/AddPostView',
    'views/posts/PostListView',
    'views/profiles/ProfileInfo',
    'text!templates/profiles/teacherProfile.html'
], function ($, _, Backbone, CategoryCollection, PostCollection, UserCollection, UserModel, AddPostView, PostListView,
             ProfileInfoView, teacherProfileTemplate) {
    var TeacherProfileView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(teacherProfileTemplate),
        model: new UserModel(),
        postCollection: new PostCollection(),
        categoryCollection: new CategoryCollection(),
        events: {
            "postCollectionFetched": "onPostCollectionFetched",
            "categoryCollectionFetched": "onCategoryCollectionFetched"
        },
        initialize: function () {
            this.listenTo(this, 'userGetted', this.onUserGetted);
            this.listenTo(this.postCollection, 'reset', this.onPostCollectionFetched);
            this.listenTo(this.categoryCollection, 'reset', this.onCategoryCollectionFetched);
            this.render();
            this.getLoggedUser();
        },
        onUserGetted: function () {
            this.profileInfoRender();
            this.postCollection.fetch({
                reset: true
            });
        },
        getLoggedUser: function () {
            var self = this;
            $.ajax({
                url: '/account/getLoggedUser/',
                method: 'GET',
                success: function (user) {
                    self.model = user;
                    self.trigger('userGetted');
                }
            });
        },
        onPostCollectionFetched: function () {
            this.listenTo(this.postCollection, 'destroy', this.postListRender);
            this.postListRender();
            this.categoryCollection.fetch({
                reset: true
            });
        },
        onCategoryCollectionFetched: function () {
            this.addPostRender();
        },
        postListRender: function () {
            this.$('#postListLoader').remove();
            this.$('#addPostLoader').show();
            var self = this;

            var posts = this.postCollection.search({author: this.model['_id']}).toJSON();
            this.postListView = new PostListView({posts: posts});
            this.postListView.$el = this.$('#postListWrapper');
            this.postListView.render();

            $('.btn-post-close').on('click', function (e) {
                if (!confirm('Really?')) {
                    return;
                }
                var id = $(e.target).closest('.panel').data('id');
                var post = self.postCollection.get(id);
                post.destroy();
            });

            this.fullLoaderHide();


        },
        profileInfoRender: function () {
            this.$('#profileInfoLoader').remove();
            this.profileInfoView = new ProfileInfoView({user: this.model});
            this.profileInfoView.$el = this.$('#profileInfoWrapper');
            this.profileInfoView.render();
        },
        addPostRender: function () {
            this.$('#addPostLoader').remove();
            var self = this;

            this.addPostView = new AddPostView({
                categoryCollection: this.categoryCollection,
                postCollection: this.postCollection
            });
            this.addPostView.$el = this.$('#addPostWrapper');
            this.addPostView.render();

            this.$('#btnAddCollapse').show();
            this.$('#btnAddCollapse').on('click', function () {
                self.$('.modal-background').show();
                self.$('.modal-background div').show();
            });

            this.$('.modal-background').on('click', function (e) {
                if (e.target.className == 'modal-background' || e.target.className == 'btn-close') {
                    self.$('.modal-background div').hide();
                    self.$('.modal-background').hide();
                }
            });

            this.listenTo(this.addPostView, 'addedNewPost', function () {
                self.$('.modal-background div').hide();
                self.$('.modal-background').hide();
                self.postCollection.fetch({reset:true});
            });

        },
        fullLoaderShow:function () {
            this.$('#fullLoader').show();
            this.$('.modal-background').show();
        },
        fullLoaderHide: function () {
            this.$('#fullLoader').hide();
            this.$('.modal-background').hide();
        },
        render: function () {
            this.$el.html(this.template());
            this.fullLoaderShow();
            return this;
        }
    });
    return TeacherProfileView;
});
