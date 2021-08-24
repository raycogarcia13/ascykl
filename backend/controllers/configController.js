const Config = require('../models/config');

exports.init = async (req,res,next) =>{
    const config = await Config.findOne({key:"database"});
    if(config && config.value == "true"){
        res.json({
            status:"failed",
            message:"Project is alredy config"
        })
    }
    else{
        const {init} = require("../utils/seeder");
        let status = await init();
        if(status){
            const data = {  key:"database", value:"true" }
            await Config.findOneAndUpdate({key:"database"},data,{
                new:true,
                upsert:true
            })
            res.json({
                status:"success",
                message:"Database filed!!!"
            })
        }else {
            res.status(500).json({
                status:"failed",
                message:"a error ocurred in process data, see a logs !!!"
            })
        }
    }
    
}
