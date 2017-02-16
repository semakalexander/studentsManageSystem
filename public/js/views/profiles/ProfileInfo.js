define([
    'jquery',
    'underscore',
    'backbone',
    'views/profiles/UploadPhotoView',
    'text!templates/profiles/profileInfo.html'
], function ($, _, Backbone, UploadPhotoView, profileInfoTemplate) {
    var ProfileInfoView = Backbone.View.extend({
        el: '#profileInfoWrapper',
        template: _.template(profileInfoTemplate),
        events:{
          "click #btnUploadPhoto": "onBtnUploadPhoto"
        },
        initialize: function (options) {
            this.user = options.user;
        },
        onBtnUploadPhoto: function () {
            this.uploadPhotoView = new UploadPhotoView({
               user:this.user
            });
            this.uploadPhotoView.$el = $('#uploadPhotoWrapper');
            this.uploadPhotoView.render();
            $('.modal-background').show();
            $('.modal-background div').show();
            $('#addPostWrapper').hide();
        },
        render: function () {
            this.$el.html(this.template({user: this.user}));
        }
    });
    return ProfileInfoView;
});
