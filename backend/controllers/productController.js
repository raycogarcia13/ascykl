const Product = require('../models/product');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")
const fs = require("fs")
const path = require("path")
const base64Img = require("base64-img")
const asyncForEach = require("../utils/asyncForEach")

exports.store = catchAsyncErrors(async (req,res,next) =>{
    const {images,texts,price,category,subcategory,stock} = req.body;

    let imgSrc = [];
    await asyncForEach(images, async (item,i)=>{
        var filepath = await base64Img.imgSync(item.data_url, path.join(__dirname,"../uploads/products/"),Date.now())
        const pathArr = filepath.split('/');
        imgSrc.push({
            image_src: pathArr[pathArr.length -1]
        })
    });

    const newed = await Product.create({
        price,
        images: imgSrc,
        category,
        subcategory,
        texts,
        stock
    })

    return res.json({
        status:"success",
        message:"product.created",
        data:newed
    })
})

//get all => /api/v1/product?keyword=standard
exports.get = catchAsyncErrors(async (req,res,next) =>{
    const resPerPage = Number(process.env.RES_PER_PAGE);
    const productCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resPerPage);

    const all = await apiFeatures.query
    res.json({
        status:"success",
        count: all.length,
        total: productCount,
        data: all
    })
})

//get all => /api/v1/latest
exports.latest = catchAsyncErrors(async (req,res,next) =>{
    const all = await Product.find({}).sort({
        createdAt:'desc'
    }).limit(10);
    
    res.json({
        status:"success",
        data: all
    })
})

// // get one product by id : /api/v1/diameter/:id 
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

// // update one product by id : /api/v1/diameter/:id 
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

// delete one product by id : /api/v1/diameter/:id 
exports.remove = catchAsyncErrors(async (req,res,next) =>{
    let data = await Product.findById(req.params.id);
    
    if(!data){
        return next(new ErrorHandler('Product not found',404)) 
    }
   data.createdAt = Date.now;
   data.save();
    res.json({
        status:"success",
        data
    })
})