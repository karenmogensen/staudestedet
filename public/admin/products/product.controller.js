/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.adminProduct", [])
        .controller("adminProductController", adminProductController);

    //Define controller
    function adminProductController($rootScope, $scope, $stateParams, productService, categoryService)
    {
        $scope.title = 'Opret produkt';
        $scope.create = true;
        $scope.categoryOptions = [];

        //If update situation initialize and set title
        if($stateParams.categoryId == undefined)
        {
            $scope.title = 'Opdater produkt';
            $scope.create = false;
        }

        if($stateParams.productId == undefined)
        {
            $scope.priceFields = [{id: 'price1'}];
        }

        if($stateParams.categoryId == undefined)
        {
            $scope.categoryFields = [{id: 'cat1'}];
        }

        $scope.saveProduct = function(){
            if($scope.create)createProduct();
            else updateProduct();
        }

        //Create a new product
        function updateProduct(){
            //Create category, productflag, price
            $scope.product.categories = createCategoryObjects();
            $scope.product.prices = createPriceObjects();

            productService.updateProduct( $scope.product ).
            then(
                //Go back to list or hierarchy
                window.history.back()
            )
        };

        function createProduct(){
            //Set product id
            $scope.product.productId = $rootScope.nextProductId;

            //Create category, productflag, price
            $scope.product.categories = createCategoryObjects();
            $scope.product.prices = createPriceObjects();

            //Update product
            console.log($scope.product);

            productService.createProduct( $scope.product ).
                then( productService.getProducts().
                    then(
                        //Go back to list or hierarchy
                        window.history.back()
                    )
                );
        };

        function createCategoryObjects(){
            //Get array of categories
            var categories = [];
            if($scope.categoryFields) {
                for (var i = 0; i < $scope.categoryFields.length; i++) {
                    if (($scope.categoryFields[i].selected) != undefined) {
                        categories.push($scope.categoryFields[i].selected.name);
                    }
                }
            }
            return categories;
        }

        function createPriceObjects(){
            //Create prices
            var productPrices = [];
            if($scope.priceFields) {
                for (var i = 0; i < $scope.priceFields.length; i++) {
                    if ($scope.priceFields[i].price != undefined) {
                        productPrices.push({
                            "price": $scope.priceFields[i].price,
                            "currency": $scope.priceFields[i].currencyData.selected.name,
                            "type": $scope.priceFields[i].typeData.selected.name,
                            "fromDate": $scope.priceFields[i].fromDate,
                            "toDate": $scope.priceFields[i].toDate
                        });
                    }
                }
            }
            return productPrices;
        }

        //-----------------Setting up state field---------------------------------

        $scope.states = [{state:'Aktiv'}, {state:'Inaktiv'}];

        //---------------------Setting up category fields-------------------------
        //Add category field
        $scope.addCategory = function(category) {
            var newItemNo = $scope.categoryFields.length+1;
            $scope.categoryFields.push({'id':'cat' + newItemNo, 'options': $scope.categoryOptions});
        };

        //Remove category field
        $scope.removeCategory = function() {
            var lastItem = $scope.categoryFields.length-1;
            if ($scope.categoryFields.length > 1) {
                $scope.categoryFields.splice(lastItem);
            }
        };

        //If update mode - setup category fields with data
        function modelCategoryFields()
        {
            $scope.categoryFields = [];
            if(!$scope.create) {
                for (var i = 0; i < $scope.product.categories.length; i++) {
                    $scope.categoryFields.push({'id': 'cat' + i});
                    $scope.categoryFields[i].options = $scope.categoryOptions;
                    for(var j=0; j<$scope.categoryOptions.length; j++)
                    {
                        if($scope.categoryOptions[j]._id == $scope.product.categories[i]){
                            $scope.categoryFields[i].selected = $scope.categoryOptions[j];
                        }
                    }
                }
            }
            if($stateParams.categoryId){
                $scope.categoryFields.push({'id': 'cat1'});
                angular.forEach($scope.categoryOptions, function(category) {
                    if(category.categoryId == $stateParams.categoryId)
                    {
                        this.selected = category;
                    }
                }, $scope.categoryFields[0]);
                $scope.categoryFields[0].options = $scope.categoryOptions;
            }
            $scope.categoryFields.push({'id':'cat'+ $scope.categoryFields.length});
            $scope.categoryFields[$scope.categoryFields.length-1].options = $scope.categoryOptions;
        };

        //---------------------Setting up price fields-------------------------

        $scope.addNewPrice = function() {
            var newItemNo = $scope.priceFields.length+1;
            $scope.priceFields.push({'id':'price'+newItemNo});
        };

        $scope.removePrice = function() {
            var lastItem = $scope.priceFields.length-1;
            if ($scope.priceFields.length > 1) {
                $scope.priceFields.splice(lastItem);
            }
        };

        //Setup prices fields with data
        function modelPriceFields()
        {
            $scope.priceFields = [];
            $scope.priceOptions = [{name: 'Normalpris'}, {name: 'Tilbudspris'}, {name: 'Udsalgspris'}];
            $scope.currencyOptions = [{name: 'kr.'}, {name: 'EUR'}, {name: '£'}];
            if(!$scope.create) {
                for (var i = 0; i < $scope.product.prices.length; i++) {
                    $scope.priceFields.push({'id': 'flag' + i});
                    $scope.priceFields[i].typeData = {
                        selected: {'name': $scope.product.prices[i].type},
                        options: $scope.priceOptions
                    };
                    $scope.priceFields[i].currencyData = {
                        selected: {'name': $scope.product.prices[i].currency},
                        options: $scope.currencyOptions
                    };
                    $scope.priceFields[i].price = $scope.product.prices[i].price;
                    $scope.priceFields[i].currency = $scope.product.prices[i].currency;
                }
            }
            $scope.priceFields.push({'id':'flag'+ $scope.priceFields.length});
            $scope.priceFields[$scope.priceFields.length-1].typeData = {options: $scope.priceOptions, selected: {name: 'Normalpris'}};
            $scope.priceFields[$scope.priceFields.length-1].currencyData = {options: $scope.currencyOptions};
        };

        //Set product model object
        var modelProduct = function(product)
        {
            $scope.product = product;
            modelPriceFields();
            modelCategoryFields();
        };

        //Set categories - used in drop down list
        var modelCategories = function(categories)
        {
            for (var i = 0; i < categories.length; i++) {
                $scope.categoryOptions[i]=categories[i];
            }
            if($scope.create) modelCategoryFields();
        };


        //Get product
        if(!$scope.create) {
            var promise = categoryService.getCategories();
            promise.then(function(categories){
                modelCategories(categories);
                productService.getProduct($stateParams.productId)
                    .then(modelProduct);
            })
        }
        else{
            //Get categories
            categoryService.getCategories().then(modelCategories);
        }
    }
}());