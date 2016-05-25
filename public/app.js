/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";
    var app = angular.module('app', ['ui.router', 'app.uploadProducts', 'app.uploadImages', 'ngFileUpload', 'app.products', 'app.product', 'app.adminProduct', 'app.adminCategory', 'app.adminProductsHierarchy', 'app.adminProductsList', 'ui.tree']);

    app.run(
        [ '$rootScope', '$state', '$stateParams',
            function ($rootScope,   $state,   $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )

    app.directive('topmenu', [function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'admin/admin.menu.html'
        };
    }]);
    app.directive('productdetails', [function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'productcatalog/productdetails.html'
        };
    }]);
    app.directive('adminproductdetails', [function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'admin/products/product.detail.html'
        };
    }]);


    app.config( function ( $urlRouterProvider, $stateProvider ) {
        //$urlRouterProvider.otherwise("/");
        //Setting up routing
        $stateProvider
            //Frontend----------------------------------------------------
            .state('home', {
                url: '/',
                templateUrl: 'productcatalog/products.html',
                controller: 'productsController'
            })
            .state('product', {
                url: '/product/:productId',
                templateUrl: 'productcatalog/product.html',
                controller: 'productController'
            })
            //Backend/admin-----------------------------------------------
            //Admin menu
            .state('productcatalog', {
                url: '/admin',
                views: {
                    // Main template
                    '': {templateUrl: 'admin/products/product.catalog.html'},

                    // Left column template
                    'leftMenu@productcatalog': {templateUrl: 'admin/products/product.catalog.leftmenu.html'},

                    // Right column template
                    'content@productcatalog': { templateUrl: 'admin/products/product.hierarchy.html',
                                                controller: 'adminProductsHierarchyController'}
                }
            })
            .state('productcatalog.productlist', {
                url: '/list',
                views:{
                    'content@productcatalog': { templateUrl: 'admin/products/product.list.html',
                                                controller: 'adminProductsListController'
                    }
                }

            })
            .state('productcatalog.producthierarchy', {
                url: '/hierarchy',
                templateUrl: 'admin/products/product.hierarchy.html',
                controller: 'adminProductsHierarchyController'
            })
            .state('productcatalog.productupdate', {
                url: '/product/:productId',
                views:{
                    'content@productcatalog': { templateUrl: 'admin/products/product.html',
                                                controller: 'adminProductController'
                    }
                }
            })
            .state('productcatalog.productcreate', {
                url: '/product/create/:categoryId',
                views:{
                    'content@productcatalog': { templateUrl: 'admin/products/product.html',
                                                controller: 'adminProductController'
                    }
                }
            })
            .state('productcatalog.categorycreate', {
                url: '/category/create/:parentCategoryId',
                views: {
                    'content@productcatalog': {
                        templateUrl: 'admin/products/category.html',
                        controller: 'adminCategoryController'
                    }
                }
            })
            .state('productcatalog.categoryupdate', {
                url: '/category/update/:categoryId',
                views: {
                    'content@productcatalog': {
                        templateUrl: 'admin/products/category.html',
                        controller: 'adminCategoryController'

                    }
                }
            })
            .state('upload', {
                url: '/admin/upload',
                templateUrl: 'admin/upload/upload.html'
            })
            .state('upload.productImages', {
                url: '/product/images',
                templateUrl: 'admin/upload/upload.images.html',
                controller: 'uploadImagesController'
            })
            .state('upload.productFlagImages', {
                url: '/productflag/images',
                templateUrl: 'admin/upload/upload.images.html',
                controller: 'uploadImagesController'
            })
            .state('upload.products', {
                url: '/products',
                templateUrl: 'admin/upload/upload.products.html',
                controller: 'uploadProductsController'
            })

    })
}());