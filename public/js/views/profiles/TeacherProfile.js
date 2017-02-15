define([
    'jquery',
    'underscore',
    'backbone',
    'async',
    'collections/categories/categories',
    'collections/posts/posts',
    'collections/users/users',
    'models/user/user',
    'views/posts/AddPostView',
    'views/posts/ProfilePostListView',
    'views/profiles/ProfileInfo',
    'text!templates/posts/onePost.html',
    'text!templates/profiles/teacherProfile.html'
], function ($, _, Backbone, async, CategoryCollection, PostCollection, UserCollection, UserModel, AddPostView,
             PostListView, ProfileInfoView, onePostTemplate, teacherProfileTemplate) {
    var TeacherProfileView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(teacherProfileTemplate),
        model: new UserModel(),
        postCollection: new PostCollection(),
        categoryCollection: new CategoryCollection(),
        events: {},
        initialize: function () {
            var self = this;
            async.waterfall([
                function (cb) {
                    $.ajax({
                        url: '/account/getLoggedUser/',
                        method: 'GET',
                        success: function (user) {
                            self.model = user;
                            cb(null, user);
                        }
                    });
                },
                function (user, cb) {
                    self.profileInfoRender();
                    self.postCollection.fetch({
                        reset: true,
                        success: function () {
                            cb();
                        }
                    });
                },
                function (cb) {
                    self.postListRender();
                    self.categoryCollection.fetch({
                        reset: true,
                        success: function () {
                            cb();
                        }
                    });
                },
                function (cb) {
                    self.addPostRender();
                    cb();
                }
            ], function (err) {
                if (err) {
                    console.log(err);
                }
                self.listenTo(self.postCollection, 'destroy', this.postListRender);
            });
            self.render();

        },
        postListRender: function () {
            this.$('#postListLoader').remove();
            var self = this;
            var posts = [];
            if (this.postCollection.size()) {
                posts = _.filter(this.postCollection.toJSON(), function (post) {
                    return post.author._id == self.model._id;
                });
            }

            this.postListView = new PostListView({posts: posts});
            this.postListView.$el = this.$('#postListWrapper');
            this.postListView.render();

            $('.btn-post-close').on('click', function (e) {
                // if (!confirm('Really?')) {
                //     return;
                // }
                var $post = $(e.target).closest('.blog-post');
                var id = $post.data('id');
                var post = self.postCollection.get(id);
                post.destroy();
                $post.remove();
            });

            this.fullLoaderHide();
        },
        profileInfoRender: function () {
            this.$('#profileInfoLoader').remove();
            this.$('#addPostLoader').show();
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

            this.listenTo(this.addPostView, 'addedNewPost', function (data) {
                self.$('.modal-background div').hide();
                self.$('.modal-background').hide();
                var template = _.template(onePostTemplate);
                self.$('#postListWrapper').prepend(template({post:data.post}));
            });

        },
        fullLoaderShow: function () {
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
