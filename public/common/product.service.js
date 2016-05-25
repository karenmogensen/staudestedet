/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    var productService = function($http){
        var url = 'http://localhost:3000';

        //Create product
        var createProduct = function(product){
            return $http.post('/api/product/create', { 'product' : product } )
                .then( function(response){
                    return response.data;
                });
        };

        //Update product
        var updateProduct = function(product){
            return $http.put('/api/product/update/' + product.productId, { 'product' : product } )
                .then( function(response){
                    console.log( response.data);
                });
        };

        //Get all products from database
        var getProducts = function(){
            return $http.get('/api/product/get')
                .then( function(response){
                    return response.data;
                });
        };

        //Get product with "prodId" from database
        var getProduct = function(prodId){
            return $http.get('/api/product/get/' + prodId)
                .then( function(response){
                    return response.data;
                });
        };

        //Delete product with "prodId" from database
        var deleteProduct = function(prodId){
            return $http.delete('/api/product/delete/' + prodId)
                .then( function(response){
                    return response.data;
                });
        };

        return {
            getProducts: getProducts,
            getProduct: getProduct,
            deleteProduct: deleteProduct,
            createProduct: createProduct,
            updateProduct: updateProduct
        };
    };

    angular
        .module('app')
        .factory('productService', productService);
}());