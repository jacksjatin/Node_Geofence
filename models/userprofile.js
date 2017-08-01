var mongoose    =   require("mongoose");
var Schema = mongoose.Schema;
var userProfileSchema = new Schema({
    "firstName": String,
    "lastName": String,
    "emailId": String,
    "contact": String,
    "userID": String
});

module.exports= mongoose.model('userProfile', userProfileSchema);
