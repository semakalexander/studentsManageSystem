define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'collections/users/users',
    'text!templates/users/add.html'
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
                    data[$inputs[i]['name']] = $inputs[i]['value'];
                    $inputs[i].value = '';
                }
                data['login'] = data['firstName'] + data['lastName'];
                data['role'] = $('#role')[0]['value'];
                var user = new UserModel(data);

                user.save();

                self.trigger('addNewUser');

            });
        },
        render: function () {
            this.$el.html(this.template());
            this.subscribeOnBtnAdd();
            return this;
        }
    });
    return AddView;
});
