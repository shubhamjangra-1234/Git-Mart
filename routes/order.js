const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    name:String,
    mobile:Number,
    email:String,
    address:String,
    product:String,
    quantity:Number,
    query:String,
});
module.exports = mongoose.model("Order",OrderSchema);