const ProductModel = require("../models/Product")

class HomeProducts{
    async categoryProducts(req,res){
        const {name,page=1} = req.params;
        const perPage = 2; 
        const skip = (page -1)*perPage;
        try {
            const count = await ProductModel.find({category:name}).where("stock").gt(0).countDocuments();
            const response = await ProductModel.find({category:name}).where("stock").gt(0).skip(skip).limit(perPage).sort({updatedAt: -1})
            return res.status(200).json({products:response, perPage, count});
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new HomeProducts();