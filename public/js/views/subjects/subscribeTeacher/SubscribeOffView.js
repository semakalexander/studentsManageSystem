define([
    'jquery',
    'underscore',
    'backbone',
    'views/helpers/PaginationView',
    'text!templates/subjects/subscribeTeacher/list.html'
], function ($, _, Backbone, PaginationView, listTemplate) {
    var ListOffView = Backbone.View.extend({
        el: $('#subscribeOff'),
        template: _.template(listTemplate),
        page: 1,
        perPage: 8,
        paginationView: new PaginationView({linksQuantity: 5}),
        initialize: function (options) {
        },
        subscribeOnBtns: function () {
            var self = this;
            this.$('.pagination-link').on('click', function (e) {
                e.preventDefault();
                self.page = $(e.target).data('page');
                self.render();
            });

            this.$('.btn-subject-subscribe').on('click', function (e) {
                var $tr = $(e.target).closest('tr');
                var teacherId = $('#teacherSelect').val();
                var subjectId = $tr.data('id');
                $.ajax({
                    url: "/subjects/subscribeTeacherOnSubject/",
                    method: "POST",
                    data: {
                        teacherId: teacherId,
                        subjectId: subjectId
                    },
                    success: function () {
                        self.trigger('subjectSubscribed', {
                            tr: $tr
                        });
                    }
                });
            });
        },
        render: function () {
            var self = this;
            var teacher = $('#teacherSelect').val();
            $.ajax({
                url: "/subjects/getSubjectsByTeacher",
                method: "POST",
                data: {
                    teacherId: teacher
                },
                success: function (res) {
                    var subjectsOn = [];
                    if (res && res.length && res[0].subjects) {
                        subjectsOn = res[0].subjects.map(function (subject) {
                            return subject['_id'];
                        });
                    }

                    var subjectsOff = [];


                    _.each(self.collection.models, function (subject) {
                        if (subjectsOn.indexOf(subject.get('_id')) < 0) {
                            subjectsOff.push(subject.toJSON());
                        }
                    });

                    var start = (self.page - 1) * self.perPage;

                    self.$el.html(self.template({
                        add: true,
                        subjects: subjectsOff.slice(start, start + self.perPage)
                    }));

                    self.paginationView.$el = self.$('#paginationOff');
                    self.paginationView.render({
                        currentPage: self.page,
                        pagesQuantity: Math.ceil(subjectsOff.length / self.perPage)
                    });

                    self.subscribeOnBtns();
                }
            });
        }
    });
    return ListOffView;
});

