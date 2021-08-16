const Product = require('../models/product');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")
const fs = require("fs")
const path = require("path")
const base64Img = require("base64-img")
const asyncForEach = require("../utils/asyncForEach")

exports.store = catchAsyncErrors(async (req,res,next) =>{
    const {images,name,price,description,category,stock} = req.body;

    let imgSrc = [];
    await asyncForEach(images, async (item,i)=>{
        var filepath = await base64Img.imgSync(item.data_url, path.join(__dirname,"../uploads/"),Date.now())
        const pathArr = filepath.split('/');
        imgSrc.push({
            image_src: pathArr[pathArr.length -1]
        })
    });

    const newed = await Product.create({
        name,
        price,
        description,
        images: imgSrc,
        category,
        stock
    })

    return res.json({
        status:"success",
        message:"product.created",
        data:newed
    })

    // let base64Data = image.split(',')[1];
    // var filepath = await base64Img.imgSync(image, path.join(__dirname,"../uploads/"),Date.now())
    
    // const pathArr = filepath.split('/');
    // const name = pathArr[pathArr.length -1]
    // res.json({url:`http://localhost:3000/${name}`,name,base64Data})
})

//get all => /api/v1/diamters?keyword=standard
exports.get = catchAsyncErrors(async (req,res,next) =>{
    const apiFeatures = new APIFeatures(Product.find(),req.query.filter,'name')
        .search();
    const all = await apiFeatures.query
    res.json({
        status:"success",
        count: all.length,
        data: all
    })
})

// // get one diameter by id : /api/v1/diameter/:id 
exports.find = catchAsyncErrors( async (req,res,next) =>{
    const data = await Product.findById(req.params.id);
    
    if(!data){
        return next(new ErrorHandler('Product not found',404)) 
    }

    res.json({
        status:"success",
        data
    })
})

// // update one diameter by id : /api/v1/diameter/:id 
exports.update = catchAsyncErrors(async (req,res,next) =>{
    let data = await Product.findById(req.params.id);
    
    if(!data){
        return next(new ErrorHandler('Product not found',404)) 
    }
    
    data = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    });

    res.json({
        status:"success",
        data
    })
})