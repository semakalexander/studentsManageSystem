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
        events: {
            "click #btnAddGroup": "onBtnAddGroup"
        },
        initialize: function (options) {
            this.groupCollection = options.groupCollection;
            this.userCollection = options.userCollection;
            this.render();
        },
        onBtnAddGroup: function (e) {
            var self = this;
            e.preventDefault();
            var $nameInput = this.$el.find('#nameInput')[0];
            var name = _.escape($nameInput.value.trim());
            if( name == ''){
                alert('bad name!');
                return;
            }
            var $curatorSelect = $('#curatorSelect')[0];
            var group = new GroupModel({
                name: name,
                curator: $curatorSelect.value
            });
            group.save(null, {
                success: function () {
                    $nameInput.value = '';
                    self.trigger('addedNewGroup');
                }
            });

        },
        render: function () {
            var teachers = this.userCollection
                .search({role: 'teacher'})
                .toJSON();
            this.$el.html(this.template({teachers: teachers}));
        }
    });
    return AddView;
});
