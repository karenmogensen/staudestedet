/**
 * Created by Karen on 01-05-2016.
 */
var path = require('path'),
    fs = require('fs')
    jsonfile = require('jsonfile'),
    perennialApi = require('../perennial/perennial.api'),
    async = require('async');

var upload = {
    images: function(req, res, next){
        // the multiparty middleware
        var file = req.files.file;
        var target_path;

        // set where the file should actually exists - depends on what is uploaded
        if(req.url == '/upload/productflag/images'){
            target_path = path.join(__dirname, '..', '..', 'public/ressources/images/productflags', file.name);
        }
        if(req.url == '/upload/product/images'){
            target_path = path.join(__dirname, '..', '..', 'public/ressources/images/products', file.name);
        }
        // get the temporary location of the file
        var tmp_path = file.path;

        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) throw err;
                res.send('File uploaded to: ' + target_path + ' - ' + file.size + ' bytes');
            });
        });
    },
    products: function(req, res, next){

        var file = req.files.file;
        var target_path = path.join(__dirname, '..', '..', 'public/ressources/products', file.name);

        // Get temporary location of the uploaded file
        var tmp_path = file.path;

        // Move file from temp location to intended location
        fs.renameSync(tmp_path, target_path, function(err) {
            if (err) throw err;
            // Delete the temporary file
            fs.unlink(tmp_path, function() {
                if (err) throw err;
            });
        });

        //Create products
        var file = path.join( 'public/ressources/products/' , file.name);
        var errorMessage;
        jsonfile.readFile(file, function(err, result) {
            if(err) errorMessage = err.message;
            products = result.products;
            async.forEachSeries(products, function(product){
                    perennialApi.create(product, function(err){
                        if(err) errorMessage = err.message;
                        console.log(err);
                    });
            });
            res.send(result);
        })
    }
};

// Return the object
module.exports = upload;