/**
 * Created by Karen on 13-05-2016.
 */
var Product = require('./product.model');

var productHelper = {
    validateProduct : function(product) {
    },

    getCategoryRefs : function(catNames, handleGetCategoryRefs)
    {
        mongoose.model('Category').find({name: {$in: catNames}}, function (err, categories) {
            if (err) return handleGetCategoryRefs(err);
            var catRefs = [];
            for (var i = 0; i < categories.length; i++) {
                catRefs.push(categories[i]._id);
            }
            handleGetCategoryRefs(null, catRefs);
        });
    },
    validateDelete : function (productId, handleValidateDelete) {
        //Does the product exist?
        mongoose.model('Product').findOne({productId: productId}, function(err, product){
            if (err) return handleValidateDelete (err);
            if(product == undefined) {
                handleValidateDelete(new Error("Product does not exist"));
            }
            handleValidateDelete(product);
        });
    }
};
module.exports = productHelper;