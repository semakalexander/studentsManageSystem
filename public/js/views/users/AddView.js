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
        el: $('#userAddWrapper'),
        template: _.template(AddTemplate),
        events: {},
        initialize: function (options) {
            this.collection = options.collection;
        },
        subscribeOnBtnAdd: function () {
            var self = this;
            this.$('#btnAddUser').on('click', function (e) {
                e.preventDefault();
                var $form = $('form');
                var $inputs = $form.find('div input');

                var data = {};
                for (var i = 0, length = $inputs.length; i < length; i++) {
                    data[$inputs[i]['name']] = _.escape($inputs[i]['value'].trim());
                    $inputs[i].value = '';
                }
                data['login'] = data['firstName'] + data['lastName'];
                data['role'] = $('#role')[0]['value'];
                var user = new UserModel(data);

                user.save();

                self.trigger('addNewUser');

            });
        },
        hide: function () {
          this.$el.hide(0);
        },
        show:function () {
            this.$el.show(500);
        },
        render: function () {
            this.$el.html(this.template());
            this.subscribeOnBtnAdd();
            return this;
        }
    });
    return AddView;
});


