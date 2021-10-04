const mongoose = require('mongoose');

const orderSchema= new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    ingredients: [{type:{type:String}, amount:Number}],
    customer:{
        deliveryAddress: String,
        phone: String,
        paymentType: String
      
    },
    price: Number,
    orderTime: {type: Date, default: Date.now()} 
})

const Order = mongoose.model("Order", orderSchema);

module.exports.Order = Order;