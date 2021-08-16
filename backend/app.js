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
app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));
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
// app.use('/',express.static("../frontend/public"))
const products = require("./routes/store/products")
app.use('/api/v1',products);

// error middleware
const errorMiddleware = require('./middlewares/errors')
app.use(errorMiddleware)


module.exports =  app;




