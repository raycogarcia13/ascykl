const { Schema, model, Types } = require("mongoose");

const dataSchema = new Schema({

    shippingInfo:{
        address:{
            type: String,
            requiered: true
        },
        city:{
            type: String,
            requiered: true
        },
        phoneNo:{
            type: String,
            requiered: true
        },
        postalCode:{
            type: String,
            requiered: true
        },
        country:{
            type: String,
            requiered: true
        },
    },
    user:{
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems:[
        {
            name:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            },
            price:{
                type: Number,
                required: true
            },
            product:{
                type: Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    paymentInfo:{
        id: {
            type: String
        },
        status:{
            type: String
        }
    },
    paidAt:{
        type: Date,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus:{
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt:{
        type: Date
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
    
});

module.exports =  model('Order',dataSchema);