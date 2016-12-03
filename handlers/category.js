var mongoose = require('mongoose');

var categorySchema = mongoose.Schemas.Category;

var Module = function (models) {
    var categoryModel = models.get('category', categorySchema);

    this.createCategory = function (req, res, next) {
        var body = req.body;
        var categoryName = body.name;
        var category = new categoryModel(body);
        category.save(function (err) {
            if (err) {
                return next(err);
            }

            res.status(200).send(category);
        });
    };

    this.editCategoryById = function (req,res,next) {
        var id = req.params.id;
        var body = req.body;
        categoryModel.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).exec(function (err, category) {
            if (err) {
                return next(err);
            }
            res.status(200).send(category);
        });
    };

    this.deleteCategoryById = function (req, res, next) {
        categoryModel.removeOne({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        })
    };
};
module.exports = Module;