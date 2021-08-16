// const asyncForEach = require('./asyncForEach');
// // funciones seeders
// const seedDiameters = async ()=>{
//     console.log('running diameters seeder')
//     try{
//         const Diameters = require("../models/Diameters");
//         const datas = require('../data/diameters');
//         console.log("Cleaning Diameters");
//         await Diameters.deleteMany();
//         await Diameters.insertMany(datas);
//         console.log(`${datas.length} Diameters inserted`);
//         return true;
//     }catch(error){
//         console.log('error',error);
//         return false;
//     }
// }
// const seedTraders = async ()=>{
//     // console.log('running traders seeder')
//     try{
//         const Traders = require("../models/Traders");
//         const datas = require('../data/traders');
//         // console.log("Cleaning Traders");
//         await Traders.deleteMany();
//         await Traders.insertMany(datas);
//         // console.log(`${datas.length} Traders inserted`);
//         return true;
//     }catch(error){
//         console.log('error',error);
//         return false;
//     }
// }
// const seedLenghtSpans = async ()=>{
//     // console.log('running traders seeder')
//     try{
//         const Lenght = require("../models/Lenghts_Span");
//         const datas = require('../data/spans_lenght');
//         // console.log("Cleaning Traders");
//         await Lenght.deleteMany();
//         await Lenght.insertMany(datas);
//         // console.log(`${datas.length} Traders inserted`);
//         return true;
//     }catch(error){
//         console.log('error',error);
//         return false;
//     }
// }
// const seedLenghtOverhangs = async ()=>{
//     // console.log('running traders seeder')
//     try{
//         const Lenght = require("../models/Lenghts_Overhang");
//         const datas = require('../data/overhangs_lenght');
//         // console.log("Cleaning Traders");
//         await Lenght.deleteMany();
//         await Lenght.insertMany(datas);
//         // console.log(`${datas.length} Traders inserted`);
//         return true;
//     }catch(error){
//         console.log('error',error);
//         return false;
//     }
// }
// // seeders activos
// const seeders =[
//     seedDiameters,
//     seedTraders,
//     seedLenghtSpans,
//     seedLenghtOverhangs
// ]

// // run all seeders
// exports.init = async()=>{
//     let status = true; 
//     await asyncForEach(seeders,async(item)=>{
//             let st = await item();
//             if(!st) status =false
//     })
//     return status;
// }
