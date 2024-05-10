const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    seats: Number,
    tankCapacity: Number,
    acceleration: String,
    cylinders: Number,
    horsepower: Number,
    topSpeed: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
