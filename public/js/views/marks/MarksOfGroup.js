define([
    'jquery',
    'underscore',
    'backbone',
    'collections/marks/marks',
    'collections/users/users',
    'text!templates/marks/marksOfGroup.html'
], function ($, _, Backbone, MarkCollection, UserCollection, marksOfGroupTemplate) {
    var MarksOfGroupView = Backbone.View.extend({
        el: $('#listMarks'),
        template: _.template(marksOfGroupTemplate),
        initialize: function (options) {
            this.collection = options.collection;
        },
        render: function (options) {
            var self = this;
            var users = this.collection
                .sort()
                .toJSON()
                .filter(function (user) {
                    return user.group == options.selectedGroup;
                });

            this.$el.html(this.template({
                users: users,
                selectedMonth: options.selectedMonth,
                selectedSubject: options.selectedSubject
            }));

            this.$('select').on('change', function (e) {
                var selectedSubject = $('#subjectSelect')[0].value;
                var day = $(e.target).closest('td').data('day');
                var userId = $(e.target).closest('tr').data('id');

                var user = self.collection.get(userId);
                var marks = user.get('marks');
                if (!marks[selectedSubject]) {

                    marks[selectedSubject] = {};
                }
                marks[selectedSubject]['january'][day] = this.value;
                user.save();
            });
        }
    });
    return MarksOfGroupView;
});
