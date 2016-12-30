define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/subjects/add.html'
], function ($, _, Backbone, addSubjectTemplate) {
    var AddView = Backbone.View.extend({
        el: $('#addSubjectWrapper'),
        template: _.template(addSubjectTemplate),
        events: {
        },
        initialize: function () {
            this.render();
            this.$('#btnAddSubject').on('click', function (e) {
                e.preventDefault();
            })
        },
        onBtnAddSubject: function (e) {
            e.preventDefault();

        },
        render: function () {
            this.$el.html(this.template());

            return this;
        }
    });
    return AddView;
});
