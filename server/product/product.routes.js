/**
 * Created by Karen on 01-05-2016.
 */
var express = require('express'),
    productRouter = express.Router(),
    product = require('.././perennial/perennial.api');

/*Comment in to use the generic product model instead of Perennials
    ProductApi = require('./product.api'),
    api = new ProductApi();
*/
// Get all products
productRouter.get('/get', function(req, res, next) {
    product.getAll( function (err, products) {
        if (err) {
            var code = 500;
            var message = err.message;
            res.writeHead(code, message, {'content-type' : 'text/plain'});
        }
        else{
            res.json(products);
        }
        res.end();
    })
});

// Create a product
productRouter.post('/create', function(req, res, next){
    var code = 200;
    var message = "Perennial created";
    product.create(req.body.product, function (err, product) {
        if (err) {
            code = 500;
            message = err.message;
            res.writeHead(code, message, {'content-type': 'text/plain'});
        }
        else {
            res.json(product);
        }
        res.end();
    })
});

// Get one product
productRouter.get('/get/:productId', function(req, res, next) {
    product.get(req.params.productId, function (err, product) {
        if (err) {
            var code = 500;
            var message = err.message;
            res.writeHead(code, message, {'content-type' : 'text/plain'});
        }
        else{
            res.json(product);
        }
        res.end();
    })
});

// Update one product
productRouter.put('/update/:productId', function(req, res, next) {
    var productId = req.params.productId,
        updateProduct = req.body.product;

        product.update(productId, updateProduct, function (err, product) {
            if (err){
                var code = 500;
                var message = err.message;
                res.writeHead(code, message, {'content-type' : 'text/plain'});
            }
            else{
                res.json(product);
            }
            res.end();
        });
});

// Delete one product
productRouter.delete('/delete/:productId', function(req, res, next) {
    var code = 200;
        message = "Product deleted",
        productId = req.params.productId;

    product.delete( productId, function (err) {
        if (err){
            code = 500;
            message = err.message;
        }
        res.writeHead(code, message, {'content-type' : 'text/plain'});
        res.end();
    });
});

module.exports = productRouter;