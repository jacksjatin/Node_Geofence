var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var dealerinfo = new Schema({
    DealerName: String,
    Address: String,
    dlrlatitued: String,
    dlrlongitued: String,
    inventorys:[
        {
vehicle_model:String,
vehicle_make:String

        }
    ]
});

module.exports= mongoose.model('dealerinfo', dealerinfo);
