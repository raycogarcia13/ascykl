const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(db=> console.log(`Mongodb connected to ${process.env.DATABASE_URI}`))
.catch(err=>console.log(err))