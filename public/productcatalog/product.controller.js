/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.product", [])
        .controller("productController", productController);

    //Define controller
    function productController($rootScope, $scope, $stateParams, productService)
    {
        //Set view class grid or list
        $scope.productId = $stateParams.productId;

        //Set product
        var modelProduct = function(product)
        {
            $scope.product = product;
        };

        //Get product
        productService.getProduct($scope.productId).
            then(modelProduct);
    }
}());