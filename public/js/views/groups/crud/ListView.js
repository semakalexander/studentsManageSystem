define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/groups/crud/list.html'
], function ($, _, Backbone, listTemplate) {
    var ListView = Backbone.View.extend({
        el: $('#groupListWrapper'),
        template: _.template(listTemplate),
        events: {
            "click .btn-group-edit": "onBtnGroupEdit",
            "click .btn-group-delete": "onBtnGroupDelete",
            "click .btn-group-edit-save": "onBtnGroupEditSave",
            "click .btn-group-edit-cancel": "onBtnGroupEditCancel"
        },
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
        onBtnGroupEdit: function (e) {
            var $tr = $(e.target).closest('tr');
            var selectedGroupId = $tr.data('id');
            this.render({selectedGroupId: selectedGroupId});
        },
        onBtnGroupDelete: function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var id = $tr.attr('data-id');
            var group = this.groupCollection.get({_id: id});
            group.destroy({
                success: function () {
                    self.render();
                }
            });
        },
        onBtnGroupEditSave: function (e) {
            var self = this;
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var $td = $target.closest('td');
            var $inputs = $td.siblings('td').children();

            var groupId = $tr.data('id');
            var group = this.groupCollection.get(groupId);


            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                var val = $inputs[i]['value'].trim();
                if (val == '') {
                    alert('bad ' + $inputs[i]['name'] + ', man. bad name');
                    return;
                }
                data[$inputs[i]['name']] = val.trim();
            }

            group.save(data, {
                patch: true,
                success: function () {
                    self.getGroupsFromDb();
                }
            });
        },
        onBtnGroupEditCancel: function () {
            this.render();
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
