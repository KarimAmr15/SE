const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    price: String,
    orderDate: String,
    orderStatus: String,
    Address: String,
    product:mongoose.Schema.Types.ObjectId,
    customer:mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Order', orderSchema);


