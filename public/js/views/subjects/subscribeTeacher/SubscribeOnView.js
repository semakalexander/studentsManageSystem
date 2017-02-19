define([
    'jquery',
    'underscore',
    'backbone',
    'views/helpers/PaginationView',
    'text!templates/subjects/subscribeTeacher/list.html'
], function ($, _, Backbone, PaginationView, listTemplate) {
    var ListOnView = Backbone.View.extend({
        el: '#subscribeOn',
        template: _.template(listTemplate),
        page: 1,
        perPage: 8,
        paginationView: new PaginationView({linksQuantity: 5}),
        events: {
            "click .btn-subject-unsubscribe": "onBtnSubjectUnsubscribe",
            "click .pagination-link": "onPaginationLink"
        },
        initialize: function (options) {
        },
        onBtnSubjectUnsubscribe: function (e) {
            var self = this;
            var $tr = $(e.target).closest('tr');
            var teacherId = $('#teacherSelect')[0].value;
            var subjectId = $tr.data('id');
            $.ajax({
                url: "/subjects/unsubscribeTeacherOnSubject/",
                method: "POST",
                data: {
                    teacherId: teacherId,
                    subjectId: subjectId
                },
                success: function () {
                    self.trigger('subjectUnsubscribed', {
                        tr: $tr
                    });
                }
            });
        },
        onPaginationLink: function (e) {
            e.preventDefault();
            this.page = $(e.target).data('page');
            this.render();
        },
        render: function () {
            var self = this;
            var teacher = $('#teacherSelect')[0].value;
            $.ajax({
                url: "/subjects/getSubjectsByTeacher",
                method: "GET",
                data: {
                    teacherId: teacher
                },
                success: function (res) {
                    var subjectsOn = [];
                    if (res && res.length && res[0].subjects) {
                        subjectsOn = res[0].subjects;
                    }

                    var start = (self.page - 1) * self.perPage;

                    self.$el.html(self.template({
                        add: false,
                        subjects: subjectsOn.slice(start, start + self.perPage)
                    }));

                    self.paginationView.$el = self.$('#paginationOn');
                    self.paginationView.render({
                        currentPage: self.page,
                        pagesQuantity: Math.ceil(subjectsOn.length / self.perPage)
                    });
                }
            });
        }
    });
    return ListOnView;
});

