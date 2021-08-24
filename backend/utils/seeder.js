const asyncForEach = require('./asyncForEach');
// funciones seeders
const seedUsers = async ()=>{
    console.log('running users seeder')
    try{
        const Users = require("../models/user");
        const datas = require('../datas/users');
        console.log("Cleaning Users");
        await Users.deleteMany();
        await Users.insertMany(datas);
        console.log(`${datas.length} Users inserted`);
        return true;
    }catch(error){
        console.log('error',error);
        return false;
    }
}
// seeders activos
const seeders =[
    seedUsers,
]

// run all seeders
exports.init = async()=>{
    let status = true; 
    await asyncForEach(seeders,async(item)=>{
            let st = await item();
            if(!st) status =false
    })
    return status;
}
