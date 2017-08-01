var mongoose = require("mongoose");
//var dbConfig = require("./config.json");
// var obj =
// {
//   "url" : "mongodb://c03idmbi13.dslab.ad.adp.com",
//   "database" : "test",
//   "options" : {
//     "user": "stagerw",
//     "pass": "c7d0Ks!"
//   }
// }

var mongoConnector= {}
//dbConfig.options
mongoConnector.initialize = function () {
mongoose.connect('mongodb://localhost:27017/hackthon', { useMongoClient: true })
  //mongoose.connect(process.env.MongoDB)
  mongoose.connection.on('connected',function () {
     
    console.log('Mongoose connection opened');
  });
  mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });
  mongoose.connection.on('disconnected', function (){
    console.log('Mongoose connection disconnected');
  });
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose connection disconnected through process termination');
      process.exit(0);
    });
  });
}

module.exports= mongoConnector;