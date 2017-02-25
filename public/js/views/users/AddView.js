define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'collections/users/users',
    'text!templates/users/add.html',
    'jquery_ui'
], function ($, _, Backbone, UserModel, UserCollection, AddTemplate) {
    var AddView = Backbone.View.extend({
        el: '#userAddWrapper',
        template: _.template(AddTemplate),
        events: {
            "click #btnAddUser": "onBtnAddUser"
        },
        initialize: function (options) {
            this.collection = options.collection;
        },
        onBtnAddUser: function (e) {
            e.preventDefault();
            var self = this;
            var $form = $('#userAddPanel');
            var $inputs = $form.find('div input');

            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                var value = _.escape($inputs[i]['value'].trim());
                if (value == '') {
                    alert('bad ' + $inputs[i]['name']);
                    return;
                }
                data[$inputs[i]['id']] = value;
            }
            data['login'] = data['firstName'] + data['lastName'];
            data['role'] = $('#role')[0]['value'];
            var user = new UserModel(data);

            user.save(null, {
                success: function () {
                    self.collection.add(user);
                    _.each($inputs, function (input) {
                        input.value = '';
                    });
                }
            });
        },
        hide: function () {
            this.$el.hide(0);
        },
        show: function () {
            this.$el.show(500);
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return AddView;
});


