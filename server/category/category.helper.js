/**
 * Created by Karen on 13-05-2016.
 */
var Category = require('./category.model');

var categoryHelper = {

    validateCreate: function(category, handleValidateCreate) {
        if(category.parentCategory != 0) {
            mongoose.model('Category').findOne({categoryId: Number(category.parentCategory)}, function (err, parentCategory) {
                if (err) return handleValidateCreate(err);
                if (parentCategory == undefined) {
                    handleValidateCreate(new Error("Parent category does not exist"));
                }
                else {
                    handleValidateCreate();
                }
            });
        }
        else{
            handleValidateCreate();
        }
    },
    validateUpdate: function(categoryId, category, handleValidateUpdate) {
        mongoose.model('Category').findOne({categoryId: Number(categoryId)}, function(err, validateCategory){
            if (err) return handleValidateUpdate (err);
            if(validateCategory == undefined) {
                handleValidateUpdate(new Error("Category does not exist"));
            }
            else{
                if(category.parentCategory != 0) {
                    mongoose.model('Category').findOne({categoryId: Number(category.parentCategory)}, function (err, parentCategory) {
                        if (err) return handleValidateUpdate(err);
                        if (parentCategory == undefined) {
                            handleValidateUpdate(new Error("Parent category does not exist"));
                        }
                        else {
                            handleValidateUpdate();
                        }
                    });
                }
                else{
                    handleValidateUpdate();
                }
            }
        });
    },
    validateDelete: function(categoryId, handleValidateDelete){
        //Does the category exist?
        mongoose.model('Category').findOne({categoryId: Number(categoryId)}, function(err, category){
            if (err) return handleValidateDelete (err);
            if(category == undefined) {
                handleValidateDelete(new Error("Category does not exist"));
            }
            else{
                //Does the category have sub categories?
                mongoose.model('Category').find({'parentCategory': category.categoryId }, function(err, subCategories){
                    if (err) return handleValidateDelete (err);
                    if(subCategories.length > 0) {
                        handleValidateDelete(new Error("Category has sub categories"));
                    }
                    else{
                        handleValidateDelete(null, category);
                    }
                });
            }
        });
    }
};

module.exports = categoryHelper;