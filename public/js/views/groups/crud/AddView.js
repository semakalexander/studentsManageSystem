define([
    'jquery',
    'underscore',
    'backbone',
    'models/group/group',
    'text!templates/groups/crud/add.html'
], function ($, _, Backbone, GroupModel, addTemplate) {
    var AddView = Backbone.View.extend({
        el: $('#groupAddWrapper'),
        template: _.template(addTemplate),
        events: {},
        initialize: function (options) {
            this.groupCollection = options.groupCollection;
            this.userCollection = options.userCollection;
            this.render();
        },
        subscribeOnAdd: function () {
            var self = this;
            $('#btnAddGroup').on('click', function (e) {
                e.preventDefault();
                var $nameInput = $('#nameInput')[0];
                var $curatorSelect = $('#curatorSelect')[0];
                var group = new GroupModel({
                    name: $nameInput.value,
                    curator: $curatorSelect.value
                });
                group.save(null, {
                    success: function () {
                        $nameInput.value = '';
                        self.trigger('addedNewGroup');
                    }
                });

            });
        },
        render: function () {
            var teachers = this.userCollection
                .search({role: 'teacher'})
                .toJSON();
            this.$el.html(this.template({teachers: teachers}));
            this.subscribeOnAdd();
        }
    });
    return AddView;
});
