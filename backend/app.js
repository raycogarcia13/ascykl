const fileUpload = require('express-fileupload');
const _ = require('lodash');
const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")

app.set('port',process.env.PORT || 3000)
//middlewares
const cookieParser = require('cookie-parser');
const corsOption = require('./config/cors');
app.use(cors(corsOption))
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())

// routes import
const base = require("./routes/base")
app.use('/api/',base);
const products = require("./routes/store/products")
app.use('/api/v1',products);
const auth = require("./routes/auth")
app.use('/api/v1',auth);
const categ = require("./routes/store/category")
app.use('/api/v1',categ);
const order = require("./routes/store/orders")
app.use('/api/v1',order);
const admin = require("./routes/admin")
app.use('/api/v1/admin',admin);

// statics
app.use(express.static(path.join(__dirname, "uploads")));

if(process.env.NODE_ENV == 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
    })
}

// error middleware
const errorMiddleware = require('./middlewares/errors')
app.use(errorMiddleware)


module.exports =  app;




