define([
    'jquery',
    'underscore',
    'backbone',
    'models/user/user',
    'collections/users/users',
    'text!templates/users/add.html'
], function ($, _, Backbone, UserModel, UserCollection, AddTemplate) {
    var AddView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(AddTemplate),
        collection: new UserCollection(),
        events: {
            'click #btnAddUser': 'onBtnAddUser'
        },
        initialize: function () {
            this
                .render()
                .collection.fetch();

        },
        onBtnAddUser: function (e) {
            e.preventDefault();
            var $form = $('form');
            var $inputs = $form.find('div input');
            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                data[$inputs[i]['name']] = $inputs[i]['value'];
            }
            data['login'] = data['firstName'] + data['lastName'];
            var user = new UserModel(data);

            user.save();

            this.trigger('addNewUser');
            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
    return AddView;
});
