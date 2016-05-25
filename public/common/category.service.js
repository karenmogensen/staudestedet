/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    var categoryService = function($http){
        var url = 'http://localhost:3000';

        //Update existing category
        var saveCategory = function(category){
            return $http.put('/api/category/update/' + category.categoryId, { 'category' : category } )
                .then( function(response){
                    return response.data;
                });
        };

        //Get category with "categoryId" from db
        var getCategory= function(categoryId){
            return $http.get('/api/category/get/' + categoryId)
                .then( function(response){
                    return response.data;
                });
        };

        //Get all categories from database
        var getCategories = function(){
            return $http.get('/api/category/get')
                .then( function(response){
                    return response.data;
                });
        };

        //Delete category with "categoryId" from database
        var deleteCategory = function(categoryId){
            return $http.delete('/api/category/delete/' + categoryId)
                .then( function(response){
                    return response.data;
                });
        };

        return {
            getCategory: getCategory,
            getCategories: getCategories,
            deleteCategory: deleteCategory,
            saveCategory: saveCategory
        };
    };

    angular
        .module('app')
        .factory('categoryService', categoryService);
}());