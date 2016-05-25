/**
 * Created by Karen on 01-05-2016.
 */
var category = require('./category.api.js'),
    express = require('express'),
    categoryRouter = express.Router();

// Get all categories
categoryRouter.get('/get', function(req, res, next) {
    category.getAll(function (err, categories) {
        if(err){
            var code = 500;
            var message = err.message;
            res.writeHead(code, message, {'content-type' : 'text/plain'});
        }
        else{
            res.json(categories);
        }
        res.end();
    })
});

// Get one category - specified with category id
categoryRouter.get('/get/:categoryId', function(req, res, next) {
    category.get( req.params.categoryId, function (err, category ) {
        if(err){
            var code = 500;
            var message = err.message;
            res.writeHead(code, message, {'content-type' : 'text/plain'});
        }
        else{
            res.json(category);
        }
        res.end();
    })
});

// Create one category - specified with category id
categoryRouter.post('/create', function(req, res, next) {
    category.create( req.body.category, function (err, category ) {
        if (err){
            var code = 500,
                message = err.message;
            res.writeHead(code, message, {'content-type' : 'text/plain'});
        }
        else{
            res.json(category);
        }
        res.end();
    })
});

// Update one category - specified with category id
categoryRouter.put('/update/:categoryId', function(req, res, next) {
    var categoryId = req.params.categoryId,
        updateCategory = req.body.category;
    category.update( req.params.categoryId, updateCategory, function (err, category) {
        if (err){
            var code = 500,
                message = err.message;
            res.writeHead(code, message, {'content-type' : 'text/plain'});
        }
        else{
            res.json(category)
        }
        res.end();
    })
});

// Delete one category - specified with category id
categoryRouter.delete('/delete/:categoryId', function(req, res) {
    var code = 200;
    var message = "Category deleted";
    category.delete( req.params.categoryId, function (err) {
        if (err){
            code = 500;
            message = err.message;
        }
        res.writeHead(code, message, {'content-type' : 'text/plain'});
        res.end();
    });
});

module.exports = categoryRouter;