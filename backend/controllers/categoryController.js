const Category = require('../models/category');
const SCategory = require('../models/subcategory');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const APIFeatures = require("../utils/apiFeatures")
const fs = require("fs")
const path = require("path")
const base64Img = require("base64-img")
const asyncForEach = require("../utils/asyncForEach")

// create new category => /api/v1/category
exports.storeCategory = catchAsyncErrors(async (req,res,next) =>{
    const {texts, image, description} = req.body;

        var filepath = await base64Img.imgSync(image, path.join(__dirname,"../uploads/categories"),Date.now())
        const pathArr = filepath.split('/');
        const img = pathArr[pathArr.length -1]

    const newed = await Category.create({
        image: img,
        texts
    })

    return res.json({
        status:"success",
        message:"admin.category.created",
        data:newed
    })
})

// create new sub-category => /api/v1/subcategory
exports.storeSubCategory = catchAsyncErrors(async (req,res,next) =>{

    const newed = await SCategory.create(req.body)

    return res.json({
        status:"success",
        message:"admin.subcategory.created",
        data:newed
    })
})

//get all => /api/v1/categories
exports.getCategories = catchAsyncErrors(async (req,res,next) =>{

    const all = await Category.find();
    res.json({
        status:"success",
        count: all.length,
        data: all
    })
})

//get all subcategories => /api/v1/categories
exports.getSubCategories = catchAsyncErrors(async (req,res,next) =>{

    const all = await SCategory.find()
               .populate({path:"category"});
               
    res.json({
        status:"success",
        count: all.length,
        data: all
    })
})

//get one subcategories => /api/v1/categories
exports.getSubCategory = catchAsyncErrors(async (req,res,next) =>{

    const all = await SCategory.findById(req.params.id)
               .populate({path:"category"});
               
    res.json({
        status:"success",
        data: all
    })
})

// // // update one product by id : /api/v1/diameter/:id 
// exports.update = catchAsyncErrors(async (req,res,next) =>{
//     let data = await Product.findById(req.params.id);
    
//     if(!data){
//         return next(new ErrorHandler('Product not found',404)) 
//     }
    
//     data = await Product.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators:true,
//         useFindAndModify: false
//     });

//     res.json({
//         status:"success",
//         data
//     })
// })

// // delete one product by id : /api/v1/diameter/:id 
// exports.remove = catchAsyncErrors(async (req,res,next) =>{
//     let data = await Product.findById(req.params.id);
    
//     if(!data){
//         return next(new ErrorHandler('Product not found',404)) 
//     }
//    data.createdAt = Date.now;
//    data.save();
//     res.json({
//         status:"success",
//         data
//     })
// })