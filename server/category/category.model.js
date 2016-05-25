/**
 * Created by Karen on 01-05-2016.
 */
var Helper = require('./category.helper');
    mongoose = require('mongoose'),
    timestamp = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

//Category Schema
var schema = mongoose.Schema({
    categoryId: {type:Number, required:true},
    name: {type:String, required:true},
    description: {type:String, required:false},
    image: {type:String, required:false},
    parentCategory: {type: Number, required:true, default: 0},
    sortOrder: {type:Number, required:false}
});

//Set a created and updated date on the document
schema.plugin(timestamp);

//Export Schema
module.exports = mongoose.model("Category", schema);