/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    timestamp = require('mongoose-timestamp'),
    priceSchema = require('./price.model').schema,
    Schema = mongoose.Schema;

//Product Schema
var schema = mongoose.Schema({
    productId: {type:String, required:true},
    name: {type:String, required:true},
    shortDescription: {type:String, required:false},
    longDescription: {type:String, required:false},
    categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
    productFlags: [{type: String, required:false}],
    prices: [priceSchema],
    image: {type:String, required:false},
    state: {type:String, required:false}
});
//Set a created and updated date on the document
schema.plugin(timestamp);
//Export product schema
module.exports = mongoose.model("Product", schema);