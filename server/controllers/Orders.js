const Order = require('../models/Order');
const Product = require('../models/Product');

class Orders {
    async getOrders(req, res) {
        const {page} = req.params;
        const perPage = 5; 
        const skip = (page -1)*perPage;
        try {
            const count = await Order.find({}).countDocuments();
            const response = await Order.find({}).populate("productId","-colors -sizes -createdAt -updatedAt -description -stock -image2 -image3 -__v").populate("userId","-createdAt -updatedAt -__v -admin").skip(skip).limit(perPage).sort({updatedAt: -1})
            return res.status(200).json({orders:response, perPage, count});
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new Orders;