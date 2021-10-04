const express = require('express');
const router = express.Router();
const {Order} = require("../models/orders");
const authorize = require("../middlewires/authoraize");

const newOrder = async (req,res)=>{
    const order = new Order(req.body);

    try {
        const saveOrder = await order.save();
        res.status(200).send("Order placed successfully");
        
    } catch (error) {
        res.status(400).send("Oops! Something going wrong");
    }
}

const orderList = async(req,res)=>{
    
    const order = await Order.find({userId: req.user._id});
    if(!order) return res.status(404).send("Not found");
    console.log(order);
    res.send(order);
}


router.route('/addOrder').post(authorize,newOrder);
router.route('/orderlist').get(authorize, orderList);

module.exports = router;