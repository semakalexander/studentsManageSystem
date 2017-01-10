define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'views/subjects/PaginationView',
    'text!templates/subjects/list.html'
], function ($, _, Backbone, SubjectCollection, PaginationView, listSubjectsTemplate) {
    var ListView = Backbone.View.extend({
        el: $('#subjectListWrapper'),
        template: _.template(listSubjectsTemplate),
        page: 1,
        perPage: 300,
        initialize: function (options) {
            this.paginationView = new PaginationView();
            this.collection = options.collection;
            this.collection.bind('reset', this.render, this);
            this.collection.bind('change', this.render, this);
        },
        getSubjectsFromDb: function (options) {

            var self = this;
            this.collection.fetch({
                success: function (collection) {
                    self.collection = collection;
                },
                reset: true,
                data: {pageNum: self.page}
            });
        },
        subscribeOnEditBtns: function () {
            var self = this;

            this.$('.btn-subject-edit').on('click', function (e) {
                var $tr = $(e.target).closest('tr');

                var id = $tr.attr('data-id');
                self.render({subjectId: id});
            });

            this.$('.btn-subject-delete').on('click', function (e) {
                var $tr = $(e.target).closest('tr');
                var id = $tr.attr('data-id');
                var user = self.collection.get({_id: id});
                user.destroy({
                    success: function () {
                        $tr.remove();
                    }
                });
            });

            this.$('.btn-subject-edit-save').on('click', function (e) {
                var $target = $(e.target);
                var $tr = $target.closest('tr');
                var $td = $target.closest('td');
                var subjectId = $tr.attr('data-id');
                var subject = self.collection.get(subjectId);
                var $inputs = $td.siblings('td').children('input');

                var data = {};
                for (var i = 0, length = $inputs.length; i < length; i++) {
                    data[$inputs[i]['name']] = $inputs[i]['value'];
                }

                subject.save(data, {patch: true});
            });

            this.$('.btn-subject-edit-cancel').on('click', function () {
                self.render();
            });

            this.$('.pagination-link').on('click', function (e) {
                e.preventDefault();
                self.page = $(e.target).data('page');
                self.render();
            });
        },
        render: function (options) {
            var subjects = this.collection.toJSON();
            var subjectId = options ? options.subjectId : undefined;
            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({subjects: subjects.slice(start, start + this.perPage), subjectId: subjectId}));
            this.paginationView.$el = this.$('#pagination');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(subjects.length / this.perPage)
            });

            this.subscribeOnEditBtns();
            return this;
        }
    });
    return ListView;
});
