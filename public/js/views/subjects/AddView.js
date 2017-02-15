define([
    'jquery',
    'underscore',
    'backbone',
    'models/subject/subject',
    'collections/subjects/subjects',
    'text!templates/subjects/add.html'
], function ($, _, Backbone, SubjectModel, SubjectCollection, addSubjectTemplate) {
    var AddView = Backbone.View.extend({
        el: $('#subjectAddWrapper'),
        template: _.template(addSubjectTemplate),
        events: {},
        initialize: function (options) {
            this.collection = options.collection;
        },
        subscribeOnAdd: function () {
            var self = this;
            this.$('#btnAddSubject').on('click', function (e) {
                e.preventDefault();
                var $input = $('#nameInput');
                var name = _.escape($input.val().trim());

                var subject = new SubjectModel({name: name});
                subject.save();

                self.trigger('addedNewSubject');
                $input[0].value = '';
            });
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return AddView;
});
