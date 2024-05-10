const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: String,
    lname: String,
    mail:String,
    password: String,
    dob: String
});

const Customer = mongoose.model("customers",userSchema);

module.exports = Customer;



