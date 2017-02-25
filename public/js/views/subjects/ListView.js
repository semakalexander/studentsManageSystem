define([
    'jquery',
    'underscore',
    'backbone',
    'collections/subjects/subjects',
    'views/helpers/PaginationView',
    'text!templates/subjects/list.html'
], function ($, _, Backbone, SubjectCollection, PaginationView, listSubjectsTemplate) {
    var ListView = Backbone.View.extend({
        el: '#subjectListWrapper',
        template: _.template(listSubjectsTemplate),
        page: 1,
        perPage: 8,
        events: {
            "click .btn-subject-edit": "onBtnSubjectEdit",
            "click .btn-subject-edit-cancel": "onBtnSubjectEditCancel",
            "click .btn-subject-edit-save": "onBtnSubjectEditSave",
            "click .btn-subject-delete": "onBtnSubjectDelete",
            "click .pagination-link": "onPaginationLink"
        },
        initialize: function (options) {
            this.paginationView = new PaginationView();

            this.collection =  options.collection;

            this.collection.bind('add', this.render, this);
            this.collection.bind('change', this.render, this);
        },
        onBtnSubjectEdit: function (e) {
            var $tr = $(e.target).closest('tr');

            var id = $tr.data('id');
            this.render({subjectId: id});
        },
        onBtnSubjectEditCancel: function () {
            this.render();
        },
        onBtnSubjectEditSave: function (e) {
            var self = this;
            var $target = $(e.target);
            var $tr = $target.closest('tr');
            var $td = $target.closest('td');
            var subjectId = $tr.data('id');
            var subject = this.collection.get(subjectId);
            var $inputs = $td.siblings('td').children('input');

            var data = {};
            for (var i = 0, length = $inputs.length; i < length; i++) {
                var value = $inputs[i]['value'].trim();
                if (value == '') {
                    alert('bad ' +$inputs[i]['name']);
                    return;
                }
                data[$inputs[i]['name']] = value;
            }

            subject.save(data, {
                patch: true,
                success: function (model) {
                    self.collection.set(model, {remove: false});
                }
            });
        },
        onBtnSubjectDelete: function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var id = $tr.data('id');
            var user = this.collection.get({_id: id});
            user.destroy({
                success: function () {
                    if (self.collection.size() <= (self.page - 1) * self.perPage) {
                        self.page--;
                    }
                    self.render();
                }
            });
        },
        onPaginationLink: function (e) {
            e.preventDefault();
            this.page = $(e.target).data('page');
            this.render();
        },
        render: function (options) {
            var subjects = this.collection.toJSON();
            var subjectId = options ? options.subjectId : undefined;
            var start = (this.page - 1) * this.perPage;

            this.$el.html(this.template({
                subjects: subjects.slice(start, start + this.perPage),
                subjectId: subjectId
            }));

            this.paginationView.$el = this.$('#pagination');
            this.paginationView.render({
                currentPage: this.page,
                pagesQuantity: Math.ceil(subjects.length / this.perPage)
            });

            return this;
        }
    });
    return ListView;
});
