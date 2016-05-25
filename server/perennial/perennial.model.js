/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
    productSchema = require('../product/product.model').schema,
    Schema = mongoose.Schema;

//Perennial Schema
var schema = productSchema.extend({
    genus: {type:String, required:true},
    epithet: {type:String, required:false},
    cultivar: {type:String, required:false},
    heightMin: {type:Number, required:false},
    heightMax: {type:Number, required:false},
    color: {type:String, required:false},
    flowerStart: {type:String, required:false},
    flowerEnd: {type:String, required:false},
    soil: {type:String, required:false},
    location: {type:String, required:false},
    specialProperty: {type:String, required:false}
});

//Export product schema
module.exports = mongoose.model("Perennial", schema);