const app = require('./app')
require('dotenv').config();


app.set('port',process.env.PORT || 3000)

app.listen(app.get('port'),()=>{
    console.log(`server running at port ${app.get('port')} in ${process.env.NODE_ENV} mode`)
})