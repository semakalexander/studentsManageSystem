define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/profiles/uploadPhoto.html'
], function ($, _, Backbone, uploadPhotoTemplate) {
    var UploadPhotoView = Backbone.View.extend({
        el: '#uploadPhotoWrapper',
        template: _.template(uploadPhotoTemplate),
        events: {
            "click #btnUpload": "onBtnUpload"
        },
        initialize: function (options) {
            this.el = options.el;
            this.user = options.user;
        },
        onBtnUpload: function (e) {
            var $input = $('#photoInput')[0];
            var file = $input.files && $input.files[0];
            var fd = new FormData();
            fd.append('profile_photo', file);

            $.ajax({
                url: "/users/uploadProfilePhoto/",
                method: "POST",
                data: fd,
                contentType: false,
                processData: false,
                success: function (xhr) {
                    $('.modal-background div').hide();
                    $('.modal-background').hide();
                },
                error: function (xhr) {
                    console.log(xhr);
                }
            });

        },
        render: function () {
            this.$el.html(this.template());
        }
    });
    return UploadPhotoView;
});
