/**
 * Created by Karen on 25-05-2016.
 */
(function(){
    "use strict";

    var productFilter = function(){
        var matchingCategories = [];

        var filterProducts = function(products, categories, filter){
            var searchResult = [];
            matchingCategories = [];

            if(products) {
                if(filter && filter.category && filter.category.name != 'Alle'){
                    getMatchingCategories(filter.category.categoryId, categories);
                    matchingCategories.push(filter.category);
                    console.log(matchingCategories);
                }
                for (var i = 0; i < products.length; i++) {
                    var match = true;
                    var product = products[i];
                    if (filter.searchName && product.name && product.name.toLowerCase().indexOf(filter.searchName.toLowerCase()) === -1) {
                        match = false;
                    }
                    if (filter.searchGenus && product.genus && product.genus.toLowerCase().indexOf(filter.searchGenus.toLowerCase()) === -1) {
                        match = false;
                    }
                    if(product.epithet == undefined && filter.searchEpithet){
                        match = false;
                    }
                    if (filter.searchEpithet && product.epithet && product.epithet.toLowerCase().indexOf(filter.searchEpithet.toLowerCase()) === -1) {
                        match = false;
                    }
                    if (filter.searchCultivar && product.cultivar && product.cultivar.toLowerCase().indexOf(filter.searchCultivar.toLowerCase()) === -1) {
                        match = false;
                    }
                    if (filter.color!='Alle' && product.color && filter.color != product.color) {
                        match = false;
                    }
                    if (filter.category && filter.category.name != 'Alle'){
                        if(!isCategoryMatched(matchingCategories, product)){
                            match = false;
                        }
                    }
                    if (match) searchResult.push(product);
                }
                return searchResult;
            }
        };

        function isCategoryMatched(matchingCategories, product){
            if(product.categories != undefined)
            {
                var categoryMatched = false;
                for(var i=0; i<product.categories.length; i++)
                {
                    for(var j=0; j<matchingCategories.length; j++ ) {
                        if(matchingCategories[j].categoryId ==0){
                            return true;
                        }
                        else{
                            if( product.categories[i] === matchingCategories[j]._id){
                                categoryMatched =  true;
                            }
                            else{
                                categoryMatched =  false;
                            }
                        }
                        if(categoryMatched) break;
                    }
                }
                return categoryMatched;
            }
        }

        //Getting matching categories hierarchical
        function getMatchingCategories(categoryId, categories){
            console.log(matchingCategories);
            angular.forEach(categories, function(category) {
                if(category.parentCategory === categoryId)
                {
                    this.push(category);
                    if(category.parentCategory != 0) {
                        getMatchingCategories(category.categoryId, categories);
                    }
                }
            }, matchingCategories);
        }

        return {
            filterProducts: filterProducts
        };
    };

    angular
        .module('app')
        .factory('productFilter', productFilter);
}());
