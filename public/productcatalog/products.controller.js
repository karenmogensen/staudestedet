/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.products", [])
        .controller("productsController", productsController);

    //Define controller
    function productsController($scope, productFilter, productService, categoryService)
    {
        //----------------------Set view mode grid, list or detail---------------------------
        $scope.viewClass = 'grid-group-item';
        $scope.gridMode = true;
        $scope.listMode = false;
        $scope.detailMode = false;
        $scope.searchShowed = false;
        $scope.filter = {};
        $scope.filter.searchName = '';
        $scope.filter.searchGenus = '';
        $scope.filter.searchEpithet = '';
        $scope.filter.searchCultivar = '';

        $scope.changeViewGrid = function(){
            $scope.gridMode = true;
            $scope.listMode = false;
            $scope.detailMode = false;
            if ($scope.viewClass === 'list-group-item')
                $scope.viewClass = 'grid-group-item';
        };

        $scope.changeViewList = function(){
            $scope.listMode = true;
            $scope.gridMode = false;
            $scope.detailMode = false;
            if ($scope.viewClass === 'grid-group-item')
                $scope.viewClass = 'list-group-item';
        };

        $scope.changeViewDetail = function(){
            $scope.detailMode = true;
            $scope.gridMode = false;
            $scope.listMode = false;
            if ($scope.viewClass === 'grid-group-item')
                $scope.viewClass = 'list-group-item';
        };

        //-------------------Filtering
        $scope.toogleSearch = function(){
            if($scope.searchShowed)$scope.searchShowed=false;
            else{
                $scope.searchShowed=true;
            }
        }

        $scope.$watchGroup(['filter.searchName', 'filter.searchGenus', 'filter.searchEpithet', 'filter.searchCultivar', 'filter.color', 'filter.category'], function(){
            if($scope.products) {
                $scope.products = productFilter.filterProducts($scope.allProducts, $scope.categories, $scope.filter);
            }
        });

        $scope.resetFilters = function(){
            $scope.filter.color = 'Alle';
            $scope.filter.category = 'Alle'
            $scope.filter.searchName = '';
            $scope.filter.searchGenus = '';
            $scope.filter.searchEpithet = '';
            $scope.filter.searchCultivar = '';
            productFilter.filterProducts();
        }

        //---------------------Fetch data------------------------------
        //Set categories
        var modelCategories = function(categories)
        {
            $scope.categories = categories;
            $scope.filter.category = {name:'Alle', categoryId:0};
            $scope.categories.push($scope.filter.category);
        };

        //Get categories
        categoryService.getCategories().
        then(modelCategories);

        //Set products
        var modelProducts = function(products)
        {
            $scope.allProducts = products;
            $scope.products = products;
            $scope.filter.color = 'Alle';
            $scope.colors = [];
            $scope.colors.push('Alle');
            angular.forEach($scope.allProducts, function(product) {
                var index = $scope.colors.indexOf(product.color);
                if(index == -1)
                this.push(product.color);
            }, $scope.colors);
        };

        //Get products
        productService.getProducts().
        then(modelProducts);
    }
}());