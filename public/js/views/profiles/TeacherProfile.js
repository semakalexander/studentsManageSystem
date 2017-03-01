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
        el: '#container',
        template: _.template(teacherProfileTemplate),
        model: new UserModel(),
        postCollection: new PostCollection(),
        categoryCollection: new CategoryCollection(),
        events: {
            "click .btn-post-close": "onBtnPostClose",
            "click #btnAddCollapse": "onBtnAddCollapse",
            "click .modal-background": "onModalBackground"
        },
        initialize: function (options) {
            var self = this;
            this.socket = options.socket;
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
                self.listenTo(self.postCollection, 'destroy', self.postListRender);
            });
            self.render();

        },
        onBtnPostClose: function (e) {
            if (!confirm('Really?')) {
                return;
            }
            var $post = $(e.target).closest('.blog-post');
            var id = $post.data('id');
            var post = this.postCollection.get(id);
            post.destroy();
        },
        onBtnAddCollapse: function () {
            this.$('.modal-background').show();
            this.$('.modal-background div').show();

            this.$('#uploadPhotoWrapper').hide();
        },
        onModalBackground: function (e) {
            if (e.target.className == 'modal-background' || e.target.className == 'btn-close') {
                this.$('.modal-background div').hide();
                this.$('.modal-background').hide();
            }
        },
        postListRender: function () {
            this.$('#postListLoader').remove();
            var self = this;
            var posts = [];
            if (this.postCollection.size()) {
                posts = _.filter(this.postCollection.toJSON(), function (post) {
                    return post.author && post.author._id == self.model._id
                });
            }

            this.postListView = new PostListView({posts: posts});
            this.postListView.$el = this.$('#postListWrapper');
            this.postListView.render();

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
                socket: this.socket,
                categoryCollection: this.categoryCollection,
                postCollection: this.postCollection
            });
            this.addPostView.$el = this.$('#addPostWrapper');
            this.addPostView.render();

            this.$('#btnAddCollapse').show();

            this.listenTo(this.addPostView, 'addedNewPost', function (data) {
                var post = data.post;
                self.postCollection.set(post, {remove: false});
                self.$('.modal-background div').hide();
                self.$('.modal-background').hide();
                var template = _.template(onePostTemplate);
                self.$('#postListWrapper').prepend(template({post: post.toJSON()}));
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
