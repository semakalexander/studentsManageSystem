define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/helpers/pagination.html'
], function ($, _, Backbone, paginationTemplate) {
    var PaginationView = Backbone.View.extend({
        el: $('#container'),
        template: _.template(paginationTemplate),
        linksQuantity: 11,
        initialize: function (options) {
            if(options) {
                this.linksQuantity = options.linksQuantity || 11;
            }
        },
        render: function (options) {
            var currentPage = options.currentPage;
            var pagesQuantity = options.pagesQuantity;
            this.$el.html(this.template(
                {
                    linksQuantity: this.linksQuantity,
                    currentPage: currentPage,
                    pagesQuantity: pagesQuantity
                }
            ));
        }
    });
    return PaginationView;
});
