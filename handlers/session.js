var Module = function () {
    var self = this;
    this.isAuthenticated = function (req, res, next, roles) {
        var role = req.session.role || 'unauth';

        if (roles.indexOf(role) > -1) {
            next();
        }
        else {
            var err = new Error("Access denied");
            err.status = 401;
            next(err);
        }
    };

    this.isAuthenticatedStudent = function (req, res, next) {
        self.isAuthenticated(req, res, next, ['student', 'teacher', 'admin']);
    };

    this.isAuthenticatedTeacher = function (req, res, next) {
        self.isAuthenticated(req, res, next, ['teacher', 'admin']);
    };

    this.isAuthenticatedAdmin = function (req, res, next) {
        self.isAuthenticated(req, res, next, ['admin']);
    };
};

module.exports = Module;