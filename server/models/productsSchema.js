const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    modelName: String,
    price: String,
    seats: String,
    tank: String,
    acceleration: String,
    cylinders: String,
    horsepower: String,
    topSpeed: String,
    stock:String,
    img:String
});

module.exports = mongoose.model('products', productSchema);


