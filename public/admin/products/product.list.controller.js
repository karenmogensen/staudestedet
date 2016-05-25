/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.adminProductsList", [])
        .controller("adminProductsListController", adminProductsListController);

    //Define controller
    function adminProductsListController($rootScope, $scope, productFilter, productService, categoryService)
    {
        //Initializing global variables
        $rootScope.nextCategoryId = 0;
        $rootScope.nextProductId = 0;

        //Initializing search fields
        $scope.filter = {};
        $scope.filter.searchName = '';
        $scope.filter.searchGenus = '';
        $scope.filter.searchEpithet = '';
        $scope.filter.searchCultivar = '';

        $scope.deleteProduct = function(productId){
            var retVal = confirm("Vil du slette produktet ?");
            if( retVal == true ) {
                productService.deleteProduct(productId);
                removeFromProductList(productId);
            }
        };

        $scope.$watchGroup(['filter.searchName', 'filter.searchGenus', 'filter.searchEpithet', 'filter.searchCultivar', 'filter.color', 'filter.category'], function(){
            if($scope.products) {
                $scope.products = productFilter.filterProducts($scope.originalProducts, $scope.categories, $scope.filter);
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

        var modelProducts = function(data){
            $scope.products = data;
            $scope.originalProducts = data;
            $rootScope.nextProductId = $scope.products.length + 1;
            $scope.filter.color = 'Alle';
            $scope.colors = [];
            $scope.colors.push('Alle');
            $scope.filter.color = 'Alle';
            angular.forEach($scope.originalProducts, function(product) {
                var index = $scope.colors.indexOf(product.color);
                if(index == -1)
                    this.push(product.color);
            }, $scope.colors);
        }

        var modelCategories = function(data){
            $scope.categories = data;
            $scope.filter.category = {name:'Alle', categoryId:0};
            $scope.categories.push($scope.filter.category);
        }

          function removeFromProductList(productId){
            for(var i= 0; i<$scope.products.length; i++) {
                if ($scope.products[i].productId == productId) {
                    $scope.products.splice(i, 1);
                }
            }
        }
        //Get products from product service
        categoryService.getCategories()
            .then(modelCategories);


        //Get products from product service
        productService.getProducts()
            .then(modelProducts);

    }
}());