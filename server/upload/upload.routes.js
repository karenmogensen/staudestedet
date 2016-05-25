/**
 * Created by Karen on 01-05-2016.
 */
var upload = require('./upload.api.js'),
    express = require('express'),
    multiparty = require('connect-multiparty'),
    uploadRouter = express.Router();

uploadRouter.post('/upload/product/images', multiparty(), upload.images );
uploadRouter.post('/upload/productflag/images', multiparty(), upload.images );
uploadRouter.post('/upload/products', multiparty(), upload.products );

module.exports = uploadRouter;