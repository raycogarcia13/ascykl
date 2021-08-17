const fileUpload = require('express-fileupload');
const _ = require('lodash');
const express = require("express")
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path")

app.set('port',process.env.PORT || 3000)
//middlewares
// app.use(express.json())
const cookieParser = require('cookie-parser') 
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())
// app.use(bodyParser.urlencoded({extended: true}));

// statics
app.use(express.static(path.join(__dirname, "uploads")));

if(process.env.NODE_ENV == 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname,'../frontend/dist/index.html'))
    })
}

// routes import
const products = require("./routes/store/products")
app.use('/api/v1',products);
const auth = require("./routes/auth")
app.use('/api/v1',auth);
const order = require("./routes/store/orders")
app.use('/api/v1',order);

// error middleware
const errorMiddleware = require('./middlewares/errors')
app.use(errorMiddleware)


module.exports =  app;




