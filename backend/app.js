const express = require("express")
const app = express();
const cors = require('cors')

//middlewares
app.use(express.json())
app.use(cors())
// app.use(express.static('../frontend'));\



// routes import
// app.use('/',express.static("../frontend/public"))
const home = require("./routes/home")
app.use(home);


module.exports =  app;




