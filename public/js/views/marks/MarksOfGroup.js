define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users/users',
    'text!templates/marks/marksOfGroup.html'
], function ($, _, Backbone, UserCollection, marksOfGroupTemplate) {
    var MarksOfGroupView = Backbone.View.extend({
        el: $('#listMarks'),
        template: _.template(marksOfGroupTemplate),
        collection: new UserCollection(),
        initialize: function () {
            var self = this;
            this.collection.fetch({});
        },
        render: function (options) {
            var self = this;
            var users = new UserCollection(this.collection.first(10));
            this.$el.html(this.template({
                users: users.toJSON(),
                selectedMonth: options.selectedMonth,
                selectedSubject: options.selectedSubject
            }));
            this.$('select').on('change', function (e) {
                var selectedSubject = '';
                var arr = this.id.split('day');
                var userId = arr[0];
                var day = arr[1];
                var user = self.collection.get(userId);
                var marks = user.get('marks');
                marks[selectedSubject]['january'][day] = this.value;
                user.set(marks);
            });
        }
    });
    return MarksOfGroupView;
});
