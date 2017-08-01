var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var custinfoSchema  = {
    "custLatitude" : String,
    "custLongitude" : String,
    "custID": String
};

module.exports = mongoose.model('custinfo', custinfoSchema);


