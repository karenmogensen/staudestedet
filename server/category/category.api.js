/**
 * Created by Karen on 01-05-2016.
 */
var Category = require('./category.model'),
    Helper = require('./category.helper'),
    async = require('async');

var category = {

    getAll: function(handleGetAllCategories){
        Category.find(function(err, categories){
            if(err) return handleGetAllCategories(err);
            handleGetAllCategories(null, categories);
        });
    },

    get: function(categoryId, handleGetCategory){
        Category.findOne({ 'categoryId': categoryId }, function (err, category) {
            if(err) return handleGetCategory(err);
            handleGetCategory(null, category);
        });
    },

    create: function(category, handleCreateCategory){
        var newCategory = new Category(category);
        //Validate new category
        Helper.validateCreate(newCategory, function(error){
            if (error) return handleCreateCategory(error);
            //Create category
            Category.create(newCategory, function (error, cat) {
                if (error) return handleCreateCategory(error);
                handleCreateCategory();
            });
        });

    },

    update : function(categoryId, category, handleUpdateCategory){
        var newCategory = new Category(category);
        Helper.validateUpdate(categoryId, category, function(err){
            if (err) return handleUpdateCategory(err);
            var updateCategory = newCategory.toObject();
            delete updateCategory._id;
            Category.update( {categoryId: categoryId}, updateCategory, function (error, category) {
                if (error) return handleUpdateCategory(error);
                handleUpdateCategory(null, category);
            });
        });
    },

    delete: function(categoryId, handleDeleteCategory){
        //Validate before delete
        Helper.validateDelete(categoryId, function(err, category){
            if(err)return handleDeleteCategory(err);
            //Delete category
            category.remove(handleDeleteCategory());
        });
    }

};

// Return the object
module.exports = category;