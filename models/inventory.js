var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var inventory = new Schema({    
    "vehicle_make": String,
    "vehicle_model": String,
    "dealername": String
    });

module.exports= mongoose.model('inventorys', inventory);
