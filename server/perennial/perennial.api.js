/**
 * Created by Karen on 13-05-2016.
 */
/**
 * Created by Karen on 01-05-2016.
 */
var Perennial = require('./perennial.model'),
    Helper = require('./perennial.helper'),
    ProductHelper = require('.././product/product.helper'),
    async = require('async');

var PerennialApi = {

    //Create perennial
    create : function(perennial, handleCreatePerennial){
        var newPerennial = new Perennial(perennial);
        async.parallel([
                //Validate product
                function(handleValidateCreate) {
                    Helper.validateCreate(newPerennial);
                    handleValidateCreate();
                },
                //Get category refs
                function(handleValidateCreate) {
                    if(perennial.categories != null) {
                        var catNames = perennial.categories;
                        ProductHelper.getCategoryRefs(catNames, function (err, categoryRefs) {
                            if (err) return handleValidateCreate(err);
                            newPerennial.categories = categoryRefs;
                            handleValidateCreate();
                        });
                    }
                    else {
                        handleValidateCreate();
                    }
                }
            ],
            function(err) {
                if (err) return next(err);
                //Create product
                Perennial.create(newPerennial, function (error, perennial) {
                    if (error) return handleCreatePerennial(error);
                    handleCreatePerennial(null, perennial);
                });
            });
    },

    //Update perennial
    update : function(productId, perennial, handleUpdatePerennial){
        var newPerennial = new Perennial(perennial);
        async.parallel([
                //Validate product
                function(handleValidateUpdate) {
                    Helper.validateUpdate(productId, function(err, perennial){
                        if (err) return handleValidateUpdate(err);
                        handleValidateUpdate();
                    });
                },
                //Get category refs
                function(handleValidateUpdate) {
                    if(perennial.categories != null) {
                        var catNames = perennial.categories;
                        ProductHelper.getCategoryRefs(catNames, function (err, categoryRefs) {
                            if (err) return handleValidateUpdate(err);
                            newPerennial.categories = categoryRefs;
                            handleValidateUpdate();
                        });
                    }
                    else {
                        handleValidateUpdate();
                    }
                }
            ],
            function(err) {
                if (err) return handleUpdatePerennial(err);
                //Update product
                var updatePerennial = newPerennial.toObject();
                delete updatePerennial._id;
                Perennial.update( {productId: productId}, updatePerennial, function (error, perennial) {
                    if (error) return handleUpdatePerennial(error);
                    handleUpdatePerennial(null, perennial);
                });
            });
    },

    //Get all products from database
    getAll : function(handleGetAllPerennials){
        Perennial.find(function(err, perennials){
            if (err) return handleGetAllPerennials(err);
            handleGetAllPerennials(null, perennials);
        });
    },

    //Get perennial with "prodId" from database
    get : function(prodId, handelGetPerennial){
        Perennial.findOne({ 'productId': prodId }, function (err, perennial) {
            if (err) return handelGetPerennial(err);
            handelGetPerennial(null, perennial);
        });
    },

    //Delete product with "productId" from database
    delete : function(productId, handleDeletePerennial){
        //Validate before delete
        Helper.validateDelete(productId, function(err, perennial){
            if(err)return handleDeletePerennial(err);
            //Delete category
            perennial.remove(handleDeletePerennial());
        });
    }
};
module.exports = PerennialApi;