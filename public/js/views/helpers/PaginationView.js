define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/helpers/pagination.html'
], function ($, _, Backbone, paginationTemplate) {
    var PaginationView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(paginationTemplate),
        events: {},
        initialize: function () {
        },
        render: function (options) {
            var currentPage = options.currentPage;
            var pagesQuantity = options.pagesQuantity;
            this.$el.html(this.template(
                {
                    currentPage: currentPage,
                    pagesQuantity: pagesQuantity
                }
            ));
        }
    });
    return PaginationView;
});
