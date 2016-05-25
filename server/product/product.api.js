/**
 * Created by Karen on 13-05-2016.
 */
/**
 * Created by Karen on 01-05-2016.
 */
var Product = require('./product.model'),
    ProductHelper = require('./product.helper'),
    async = require('async');

var ProductApi = {

        //Create product
        create : function(product, handleCreateProduct){
            var catNames = product.categories,
                newProduct = new Product(product);

            Product.create(newProduct, function (error, product) {
                if (error) return handleCreateProduct(error);
                handleCreateProduct(null, product);
            });
        },

        //Update product
        update : function(product){

        },

        //Get all products from database
        getAll : function(handleGetAllProducts){
            Product.find(function(err, products){
                if(err) return handleGetAllProducts(err);
                handleGetAllProducts(null, products);
            });
        },

        //Get product with "prodId" from database
        get : function(prodId, handleGetProduct){
            Product.findOne({ 'productId': prodId }, function (err, product) {
                if (err) return handleGetProduct(err);
                handleGetProduct(null, product);
            });
        },

        //Delete product with "prodId" from database
        delete : function(prodId, handleDeleteProduct){
            //Validate before delete
            ProductHelper.validateDelete(productId, function(err, product){
                if(err)return handleDeleteProduct(err);
                //Delete product
                product.remove(handleDeleteProduct());
            });
        }
};
module.exports = ProductApi;