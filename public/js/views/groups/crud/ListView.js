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

            this.groupCollection.bind('change', this.getGroupsFromDb, this);
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
        subscribeOnBtns: function () {
            var self = this;

            this.$('.btn-group-edit').on('click', function (e) {
                var $tr = $(e.target).closest('tr');
                var selectedGroupId = $tr.attr('data-id');

                self.render({selectedGroupId: selectedGroupId});
            });

            this.$('.btn-group-delete').on('click', function (e) {
                var $tr = $(e.target).closest('tr');
                var id = $tr.attr('data-id');
                var group = self.groupCollection.get({_id: id});
                group.destroy({
                    success: function () {
                        self.getGroupsFromDb();
                    }
                });
            });

            this.$('.btn-group-edit-save').on('click', function (e) {
                var $target = $(e.target);
                var $tr = $target.closest('tr');
                var $td = $target.closest('td');
                var groupId = $tr.attr('data-id');
                var group = self.groupCollection.get(groupId);
                var $inputs = $td.siblings('td').children();

                var data = {};
                for (var i = 0, length = $inputs.length; i < length; i++) {
                    data[$inputs[i]['name']] = $inputs[i]['value'];
                }

                group.save(data, {patch: true, wait:true});
            });

            this.$('.btn-group-edit-cancel').on('click', function () {
                self.render();
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
            this.subscribeOnBtns();

        }
    });
    return ListView;
});
