define([
    'jquery',
    'underscore',
    'backbone',
    'models/subject/subject',
    'collections/subjects/subjects',
    'text!templates/subjects/add.html'
], function ($, _, Backbone, SubjectModel, SubjectCollection, addSubjectTemplate) {
    var AddView = Backbone.View.extend({
        el: '#subjectAddWrapper',
        template: _.template(addSubjectTemplate),
        events: {
            "click #btnAddSubject": "onBtnAddSubject"
        },
        initialize: function (options) {
        },
        onBtnAddSubject: function (e) {
            e.preventDefault();
            var self = this;
            var $input = $('#nameInput');
            var name = _.escape($input.val().trim());
            if(name == ''){
                alert('bad name');
                return;
            }
            var subject = new SubjectModel({name: name});
            subject.save(null, {
                success:function () {
                    self.collection.add(subject);
                    $input[0].value = '';
                }
            });

        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return AddView;
});
