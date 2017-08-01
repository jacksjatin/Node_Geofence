var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var settingsSchema = new Schema({
    "userID": String,
    "offers": String,
    "promotions": String    
});

module.exports= mongoose.model('settings', settingsSchema);
