/**
 * Created by Karen on 13-05-2016.
 */
var Perennial = require('./perennial.model');

var perennialHelper = {
    validateCreate : function (perennial) {
    },
    validateUpdate : function (productId, handleValidateUpdate) {
        mongoose.model('Perennial').findOne({productId: productId}, function (err, perennial) {
            if (err) return handleValidateUpdate(err);
            if (perennial == null) {
                return handleValidateUpdate(new Error("Product does not exist"));
            }
            handleValidateUpdate();
        });
    },
    validateDelete : function (productId, handleValidateDelete) {
        //Does the product exist?
        mongoose.model('Perennial').findOne({productId: productId}, function (err, perennial) {
            if (err) return handleValidateDelete(err);
            if (perennial == null) {
                return handleValidateDelete(new Error("Product does not exist"));
            }
            handleValidateDelete(null, perennial);
        });
    }
};
module.exports = perennialHelper;