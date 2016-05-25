/**
 * Created by Karen on 01-05-2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Price Schema
var schema = {
    price: {type: String, required: true},
    currency: {type: String, required: false},
    type: {type: String, required: false},
    fromDate: {type: Date, required: false},
    toDate: {type: Date, required: false}
};

//Export price schema
module.exports = mongoose.model("Price", schema);