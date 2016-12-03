var mongoose = require('mongoose');

var categorySchema = mongoose.Schemas.Category;

var Module = function (models) {
    var categoryModel = models.get('category', categorySchema);

    this.getAllCategories = function (req,res,next) {
        categoryModel.find({}, function (err, categories) {
            if(err) {
                return next(err);
            }
            res.status(200).send(categories);
        });
    };

    this.createCategory = function (req, res, next) {
        var body = req.body;
        var categoryName = body.name;

        if(!categoryName){
            var err = new Error('error fields');
            err.status = 400;
            return next(err);
        }

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
        categoryModel.remove({_id: req.params.id}).exec(function (err, resp) {
            if (err) {
                return next(err);
            }
            res.status(200).send(resp);
        })
    };
};
module.exports = Module;