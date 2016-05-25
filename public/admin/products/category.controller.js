/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.adminCategory", [])
        .controller("adminCategoryController", adminCategoryController);

    //Define controller
    function adminCategoryController($rootScope, $scope, $stateParams, $location, categoryService)
    {
        $scope.parentCatId = $stateParams.parentCategoryId;

        //---------------Setup title---------------
        $scope.title = "Opret ny varegruppe";

        if($scope.parentCatId == undefined){
            $scope.title = "Opdater varegruppe";
        }
        if($scope.parentCatId == 0)
        {
            $scope.title = "Opret ny top varegruppe";
        }

        //---------------Setup category - if update
        var modelCategory = function(data){
            $scope.category = data;
            //Get the name of the parent category if any
            $scope.parentCatId = $scope.category.parentCategory;
            if($scope.parentCatId != 0){
                getParentCategory();
            }
        }

        var modelParentCategory = function(data){
            $scope.parentCategory = data;
        }
        //Save product - either create a new or update an existing
        $scope.saveCategory = function(){
            //If sub category set parent category id
            var parentCategoryId = 0;
            if($scope.parentCategory != undefined){
                parentCategoryId = $scope.parentCategory.categoryId;
            }
            //Create new category json object
            var category = {
                "categoryId": $scope.categoryId,
                "parentCatId": parentCategoryId,
                "name": $scope.category.name,
                "description": $scope.category.description,
                "image": $scope.category.image
            };
            //Call category service to save new category
            categoryService.saveCategory( category ).
            //Return to product list
            then($location.path( "/admin" ));
        };

        //Get parent category
        function getParentCategory(){
            categoryService.getCategory($scope.parentCatId).
            then(modelParentCategory);
        }

        //If category id is defined it is update mode
        if($stateParams.categoryId != undefined){
            $scope.categoryId = $stateParams.categoryId;
            $scope.mode = "update";
            categoryService.getCategory($stateParams.categoryId).
            then(modelCategory);
        }

        //If parent category id is defined it is create mode
        if($stateParams.parentCategoryId != undefined){
            $scope.categoryId = $rootScope.nextCategoryId;
            $scope.parentCatId = $stateParams.parentCategoryId;
            $scope.mode = "create";
            getParentCategory();
        }
    }
}());