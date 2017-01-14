define([
    'jquery',
    'underscore',
    'backbone',
    'collections/categories/categories',
    'collections/posts/posts',
    'collections/users/users',
    'views/posts/AddPostView',
    'views/posts/PostListView',
    'views/profiles/ProfileInfo',
    'text!templates/profiles/teacherProfile.html'
], function ($, _, Backbone, CategoryCollection, PostCollection, UserCollection, AddPostView, PostListView,
             ProfileInfoView, teacherProfileTemplate) {
    var TeacherProfileView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(teacherProfileTemplate),
        initialize: function () {
            var self = this;

            this.postCollection = new PostCollection();
            this.categoryCollection = new CategoryCollection();
            this.userCollection = new UserCollection();

            this.userCollection.fetch({
                success: function () {
                    self.categoryCollection.fetch({
                        success: function () {
                            self.postCollection.fetch({
                                success: function () {
                                    self.render();
                                }
                            });
                        }
                    });
                }
            });


        },
        render: function () {
            this.$el.html(this.template());

            var self = this;
            $.ajax({
                url: '/account/getLoggedUser/',
                method: 'GET'
            })
                .done(function (user) {
                    self.profileInfoView = new ProfileInfoView({user: user});
                    self.profileInfoView.$el = self.$('#profileInfoWrapper');
                    self.profileInfoView.render();

                    var posts = self.postCollection.search({author: user._id}).toJSON();
                    self.postListView = new PostListView({posts:posts});
                    self.postListView.$el = self.$('#postListWrapper');
                    self.postListView.render();
                });


            this.addPostView = new AddPostView({
                categoryCollection: this.categoryCollection
            });
            this.addPostView.$el = this.$('#addPostWrapper');
            this.addPostView.render();




            return this;
        }
    });
    return TeacherProfileView;
});
