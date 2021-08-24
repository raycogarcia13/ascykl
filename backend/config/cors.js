var whitelist = ['http://localhost:3000', "http://localhost:8080", ]
var corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
      callback(null, true)
  },
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}

module.exports =  corsOptions
