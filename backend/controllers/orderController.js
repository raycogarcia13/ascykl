const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")

// create new order => /api/v1/order
exports.newOrder = catchAsyncErrors(async (req,res,next) =>{
    const { 
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
     } = req.body;

     let priceItems = 0;
     orderItems.forEach( current => {
        priceItems += (current.quantity * current.price)
     } )

     const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice: priceItems,
        taxPrice,
        shippingPrice,
        totalPrice:Number(itemsPrice+taxPrice+shippingPrice),
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
     })

    return res.json({
        status:"success",
        message:"product.created",
        data:order
    })
})

//get all => /api/v1/product?keyword=standard
exports.get = catchAsyncErrors(async (req,res,next) =>{
    
    const all = await Order.find()
        .populate('user');

    let totalAmount =0;
    all.forEach( item => totalAmount += item.totalPrice )

    res.json({
        status:"success",
        count: all.length,
        totalAmount,
        data: all
    })
})

// // get one product by id : /api/v1/diameter/:id 
exports.find = catchAsyncErrors( async (req,res,next) =>{
    const data = await Order.findById(req.params.id)
        .populate('user',"email name");
    
    if(!data){
        return next(new ErrorHandler('Order not found',404)) 
    }

    res.json({
        status:"success",
        data
    })
})
// my orders
exports.findMyOrders = catchAsyncErrors( async (req,res,next) =>{
    const data = await Order.find({user:req.user.id})
    
    res.json({
        status:"success",
        data
    })
})