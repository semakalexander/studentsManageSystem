define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/groups/crud/list.html'
], function ($, _, Backbone, listTemplate) {
    var ListView = Backbone.View.extend({
        el: $('#groupListWrapper'),
        template: _.template(listTemplate),
        events: {},
        initialize: function (options) {
            this.groupCollection = options.groupCollection;
            this.userCollection = options.userCollection;
            this.groupCollection.bind('reset', this.render, this);
            this.render();
        },
        getGroupsFromDb: function () {
            var self = this;
            this.groupCollection.fetch({
                success: function (collection) {
                    self.groupCollection = collection;
                },
                reset: true
            });
        },
        render: function (options) {
            var selectedGroupId = options ? options.selectedGroupId : undefined;
            var teachers = this.userCollection
                .search({role: 'teacher'})
                .toJSON();
            var groups = this.groupCollection.toJSON();

            this.$el.html(this.template({
                selectedGroupId: selectedGroupId,
                teachers: teachers,
                groups: groups
            }));
        }
    });
    return ListView;
});
