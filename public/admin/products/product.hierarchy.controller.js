/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.adminProductsHierarchy", [])
        .controller("adminProductsHierarchyController", adminProductsHierarchyController);

    //Define controller
    function adminProductsHierarchyController($rootScope, $scope, productService, categoryService)
    {
        //Initializing global variables
        $rootScope.nextCategoryId = 0;
        $rootScope.nextProductId = 0;
        $scope.showProducts = true;

        //Does a node have sub nodes/products
        $scope.subNodesExists = function(node) {
            var subNodes = node.nodes;
            var subProducts = node.products;
            var subNodesExist = false;
            if ((subNodes != null && subNodes.length > 0) || (subProducts != null && subProducts.length > 0))
            {
                subNodesExist = true;
            }
            return subNodesExist;
        };

        //Setup products
        var modelProducts = function(data)
        {
            $scope.products = data;
            $rootScope.nextProductId = $scope.products.length + 1;
        };

        //Setup categories
        var modelCategories = function(data)
        {
            $scope.categories = data;
            $rootScope.nextCategoryId = $scope.categories.length + 1;
        };

        $scope.$watch('categories', function() {
            $scope.refreshHierarchy();
        });

        $scope.$watch('products', function() {
            $scope.refreshHierarchy();
        });

        $scope.removeProduct = function (productId) {
            var retVal = confirm("Vil du slette produktet ?");
            if( retVal == true ) {
                //Delete product and refresh the model
                productService.deleteProduct(productId);
                productService.getProducts()
                    .then(modelProducts);
            }
        };

        $scope.removeCategory = function (node) {
            var retVal = confirm("Vil du slette kategorien ?");
            if( retVal == true ) {
                //Delete category and refresh the model
                if(hasSubCategories(node) && hasProducts(node)) {
                    categoryService.deleteCategory(node.catId);
                    categoryService.getCategories()
                        .then(modelCategories);
                }
                else{
                    alert("Kategorien kan ikke slettes, da den enten indeholder produkter eller har sub kategorier");
                }
            }
        };

        function hasSubCategories(node){
            if(node.nodes.length > 0) return false;
            else return true;
        }

        function hasProducts(node){
            if(node.products > 0) return false;
            else return true;
        }

        $scope.refreshHierarchy = function(){
            if($scope.categories != null && $scope.products != null) {
                addCategoriesToList();
            }
        }
        //--------------Setting up hierarchical product view:
        //Category: {title: name, catId: catId, _catId: _catId subcategories: [], products: []};
        //Product: {genus: genus, epithet: epithet, cultivar: cultivar, productId: productId}
        var addCategoriesToList = function()
        {
            var categories = $scope.categories;
            $scope.hierarchy = [];

            //Set top level category
            angular.forEach(categories, function(value, key) {
                if(value.parentCategory == 0)
                {
                    this.push({title: value.name, catId: value.categoryId, _catId: value._id, nodes: [], products: []});
                }
            }, $scope.hierarchy);
            //Set sub level category
            angular.forEach(categories, function(value, key) {
                if(value.parentCategory != 0)
                {
                    for(var i = 0; i < $scope.hierarchy.length; i++ )
                    {
                        if($scope.hierarchy[i].catId == value.parentCategory ){
                            var nodeNo = 0;
                            if($scope.hierarchy[i].nodes.length > 0){
                                nodeNo = $scope.hierarchy[i].nodes.length;
                            }
                            $scope.hierarchy[i].nodes[nodeNo] =  {title: value.name, catId: value.categoryId,  _catId: value._id, nodes: [], products: []};
                        }
                    }
                }
            }, $scope.hierarchy);

            if($scope.showProducts) {
                addProductsToList();
            }
        };

        var addProductsToList = function()
        {
            var products = $scope.products;
            angular.forEach(products, function(value, key) {

                for(var i = 0; i < value.categories.length; i++ )
                {
                    findMatchingCategory(value, value.categories[i])
                }
            }, $scope.hierarchy);
        };

        function findMatchingCategory(product, category) {
            for (var i = 0; i < $scope.hierarchy.length; i++) {
                if ( category == $scope.hierarchy[i]._catId ) {
                    var index = $scope.hierarchy[i].products.length;
                    $scope.hierarchy[i].products[index] = {
                        genus: product.genus,
                        epithet: product.epithet,
                        cultivar: product.cultivar,
                        productId: product.productId
                    };
                }
                findMatchingSubCategory($scope.hierarchy[i].nodes, product, category);
            }
        }
        function findMatchingSubCategory(nodes, product, category) {
            for (var i = 0; i < nodes.length; i++) {
                if ( category == nodes[i]._catId) {
                    var index = nodes[i].products.length;
                    nodes[i].products[index] = {
                        genus: product.genus,
                        epithet: product.epithet,
                        cultivar: product.cultivar,
                        productId: product.productId
                    };
                }
            }
        }

        //----------------Getting data from db--------------------
        //Get categories from category service
        categoryService.getCategories()
            .then(modelCategories);

        //Get products from product service
        productService.getProducts()
            .then(modelProducts);

    }
}());