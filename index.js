var express = require('express')
var app = express();
const route = express.Router();
var bodyParser  =   require("body-parser");
var mongoOp =  require("./models/storecustloc");
var dlrop =  require("./models/dealerinfo");
var invop =  require("./models/inventory");
var router  =  express.Router();
var mongoose = require('mongoose');
var mongoconnect = require("./mongoconnect");
var setsop = require("./models/settings");

var profileinfo = require("./models/userprofile");
var shortid = require('shortid');

var config = require("./config.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.use('/',route);


//Global Variables 

//var virtualDirPath = config.virtualDirPath || "";

var virtualDirPath = process.env.virtualDirPath || "";

// Mongoose import


// Mongoose connection to MongoDB (ted/ted is readonly)
// mongoose.connect('mongodb://localhost:27017/hackthon', function (error) {
//     if (error) {
//         console.log(error);
//     }
// });

// Mongoose Schema definition


var obj = [];

var dlrls = [];
// Mongoose Model definition

route.get(virtualDirPath + '/', function(req, res) {
  res.end("working");
})
 
route.get(virtualDirPath + '/ping', function(req, res) {
  res.json({status: "App is running"})
})

route.get(virtualDirPath+ '/dealers',function(req,res){
dlrop.find({},{"DealerName":"","Address":"",_id: 0}, function(err, res1) {
  if (err) throw err;
 res.json(res1);
})
})


route.post(virtualDirPath+ '/dlrListbyInv',function(req,res){


// var caldist= distance(db.custLatitude,db.custLongitude,dlrlat,dlrlong)

var  latitude =  req.body.Latitude;
var longitute = req.body.Logitude;

var dist =  5;

var finaldlrlst = [];

// dlrop.find({},{_id: 0}, function(err, res1) {
//   if (err) throw err;
//  obj = res1;
// dlrop.find({inventorys: {$elemMatch: {vehicle_model:req.body.vehicle_model,vehicle_make:req.body.vehicle_make}}}, function(err, res2) {
//   if (err) throw err;
//   else{
//     dlrls = res2;
//        for (var i = 0;i < dlrls.length; i++){
           
//         var caldist =  distance(req.body.Latitude, req.body.Logitude,dlrls[i].dlrlatitued,dlrls[i].dlrlongitued,"K");
//         if(caldist<dist)
//         {
//         finaldlrlst.push(dlrls[i]);
//         }
//        }
       
//        res.json(finaldlrlst);
//   }
// })

dlrop.find({}, function(err, res2) {
  if (err) throw err;
  else{
    dlrls = res2;
    //    for (var i = 0;i < dlrls.length; i++){
           
    //     var caldist =  distance(req.body.Latitude, req.body.Logitude,dlrls[i].dlrlatitued,dlrls[i].dlrlongitued,"K");
    //     if(caldist<dist)
    //     {
    //     finaldlrlst.push(dlrls[i]);
    //     }
    //    }
       
       res.json(res2);
  }
})
})
// })

   // var query  = ;


route.post(virtualDirPath + '/addProfile',function(req,res){
var addobj = new profileinfo();
var result = {};
addobj.firstName = req.body.firstName;
addobj.lastName = req.body.lastName;
addobj.emailId = req.body.emailId;
addobj.contact = req.body.contact;
addobj.userID = shortid.generate();

 addobj.save(function(err){
            if(err) {
                result = {"error" : true,"message" : "Error adding Profile"};
            } else {
                result = {"error" : false,"message" : "Profile added Successfully"};
            }
            res.json({"UserID": addobj.userID});
        });
})


route.post(virtualDirPath + '/settings', function(req,res) {
    var setobj = new setsop();
    setobj.userID = req.body.userID;
    setobj.offers = req.body.offers;
    setobj.promotions = req.body.promotions;
    var response = {};
    delete setobj._doc._id;

setsop.findOneAndUpdate(
    {userID: setobj.userID}, // find a document with that filter
    setobj, // document to insert when nothing was found
    {upsert: true, new: true, runValidators: true}, // options
    function (err, doc) { // callback
        if (err) {
            // handle error
           response = {"error" : true,"message" : "Error updating setting"};
        } else {
            // handle document
            response = {"error" : false,"message" : "Settings updated successfully"};
        }
    }
);
//     setsop.find(req.body.userID, function (err, todo) {  
//     // Handle any possible database errors
//     if (err) {
//         res.status(500).send(err);
//     } else {
//         // Update each attribute with any possible attribute that may have been submitted in the body of the request
//         // If that attribute isn't in the request body, default back to whatever it was before.
//        setobj.userID = req.body.userID;
//     setobj.offers = req.body.offers;
//     setobj.promotions = req.body.promotions;

//         // Save the updated document back to the database
//         setobj.save(function (err, setobj) {
//             if (err) {
//                 res.status(500).send(err)
//             }
//             res.send(setobj);
//         });
//     }
// });

    // setsop.find({"userID" : setobj.userID}, function (err, docs) {
    //     if (docs.length){
    //        //setsop.findByIdAndUpdate({"userID" : setobj.userID},  req.body);
    //     //     var query = { userID : setobj.userID };
    //     //    setobj.save();

                     
    //     }else{
    //          setobj.save(function(err){
    //         if(err) {
    //             result = {"error" : true,"message" : "Error adding user Settings"};
    //         } else {
    //             result = {"error" : false,"message" : "Settings updated Successfully"};
    //         }
    //         res.json(result);
    //     });
    //     }
    // });

      
}) 


route.post(virtualDirPath + '/custdetails',function(req,res){
        var db = new mongoOp();
        var response = {};
        
        console.log(shortid.generate());
        db.custLatitude = req.body.custLatitude; 
        db.custLongitude =  req.body.custLongitude;
        db.custID = shortid.generate();

         db.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
       

//         dlrop.find({}, function(err, res1) {
//   if (err) throw err;
//  obj = res1;

//   var cmprKM = 1;
//      for (var i = 0;i < obj.length; i++) {
  
//             var dlrlat =obj[i]._doc.dlrlatitued;
//             var dlrlong = obj[i]._doc.dlrlongitued;
//   var caldist= distance(db.custLatitude,db.custLongitude,dlrlat,dlrlong)
            
//             if(caldist<cmprKM)
//                 {     
//                  response = {"message" : "Notification Triggered"};
//                  var gcm = require('node-gcm');
 
//                     // Set up the sender with your GCM/FCM API key (declare this once for multiple messages) 
//                  var sender = new gcm.Sender('YOUR_API_KEY_HERE');
 
//                     // Prepare a message to be sent 
//                  var message = new gcm.Message({
//                  data: { key1: 'msg1' }
//                  });
 
//                 // Specify which registration IDs to deliver the message to 
//                 var regTokens = ['YOUR_REG_TOKEN_HERE'];
 
//                 // Actually send the message 
//                 sender.send(message, { registrationTokens: regTokens }, function (err, response) {
//                         if (err) console.error(err);
//                         else console.log(response);
//                 });
//                 // write pust notfication logic here
//                 }   
//             else
//                 {
//                     response = {"message" : "Customer Out of Range"};
//                 }
//             res.json(response);
//                 }
//         });
      

        
       
});


route.post(virtualDirPath + '/sendmessage', function(req, res) {
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pushnotification-d7760.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = "fB2paxEVXeM:APA91bEHn_gF_y8oMrkz5laqRORuL1Mx8_2zSNlUBFe-fsLihcaCUaQEr50P0uZ874ITeAfY_lgFFB8EsKciJo65LkIn2CwBW1AxfwNJUE4uIxVvhc4gLiOoZwEn_asxv-Ql6H4R7UhJ";


// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
//   data: {
//     score: "850",
//     time: "2:45"
//   


// "data": 
// {
//     "img_url": "	    ",
//     "message": "Firebase Push Message Using API",
//     "title": "Fcm Image notification"
// },
//   "to" : "fB2paxEVXeM:APA91bEHn_gF_y8oMrkz5laqRORuL1Mx8_2zSNlUBFe-fsLihcaCUaQEr50P0uZ874ITeAfY_lgFFB8EsKciJo65LkIn2CwBW1AxfwNJUE4uIxVvhc4gLiOoZwEn_asxv-Ql6H4R7UhJ"


notification: {
                title: "Title of the notification",
                body: "welcome cdk global"
}
,
 data: {
     image: "./icon.jpg",
     message: "Firebase Push Message Using API",
     AnotherActivity: "True"
  }



               // image: "http://img08.deviantart.net/d605/i/2015/111/b/1/mountain_hd__3840x2160__png_by_alimohyel_din-d6867r9.png"
//                 data: {   
//                      "image":"http://img08.deviantart.net/d605/i/2015/111/b/1/mountain_hd__3840x2160__png_by_alimohyel_din-d6867r9.png",       
//                      "title":"App name",
//                      "text":"Image with Text"
//    }



// "data": {   
//         "image":"http://img08.deviantart.net/d605/i/2015/111/b/1/mountain_hd__3840x2160__png_by_alimohyel_din-d6867r9.png",       
//        "title":"App name",
//        "text":"Image with Text"
//    },"notification":{"title":"App Name","body":"description"}  
            //   },              
            //   data:{
            //     image : "http://img08.deviantart.net/d605/i/2015/111/b/1/mountain_hd__3840x2160__png_by_alimohyel_din-d6867r9.png",
                
            //   }

// data: {
//       "title": "Big Picture",
//       "message": "This is",
//       "style": "picture",
//       "picture": "http://img08.deviantart.net/d605/i/2015/111/b/1/mountain_hd__3840x2160__png_by_alimohyel_din-d6867r9.png",
//       "summaryText": "How can"
//     }
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().sendToDevice(registrationToken, payload)
  .then(function(response) {
    // See the MessagingDevicesResponse reference documentation for
    // the contents of response.
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });









//     var gcm = require('node-gcm');
//     var sender = new gcm.Sender('AIzaSyCAt_yjvg77kYsDTnvCA0ocdZh4kjiC7GE');
//                     // Prepare a message to be sent 
//                  var message = new gcm.Message({
//                  data: { key1: 'from node service' }
//                  });
 
//                 // Specify which registration IDs to deliver the message to 
//                 var regTokens = ['fB2paxEVXeM:APA91bEHn_gF_y8oMrkz5laqRORuL1Mx8_2zSNlUBFe-fsLihcaCUaQEr50P0uZ874ITeAfY_lgFFB8EsKciJo65LkIn2CwBW1AxfwNJUE4uIxVvhc4gLiOoZwEn_asxv-Ql6H4R7UhJ'];
 
//                 // Actually send the message 
//                 sender.send(message, { registrationTokens: regTokens }, function (err, response) {
//                         if (err) console.error(err);
//                         else console.log(response);
//                 });

//   res.json({status: "App is running"})

// var FCM = require('fcm-node');
//     var serverKey = 'AIzaSyCAt_yjvg77kYsDTnvCA0ocdZh4kjiC7GE'; //put your server key here 
//     var fcm = new FCM(serverKey);
 
//     var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera) 
//         to: 'fB2paxEVXeM:APA91bEHn_gF_y8oMrkz5laqRORuL1Mx8_2zSNlUBFe-fsLihcaCUaQEr50P0uZ874ITeAfY_lgFFB8EsKciJo65LkIn2CwBW1AxfwNJUE4uIxVvhc4gLiOoZwEn_asxv-Ql6H4R7UhJ', 
//          notification: {
//             title: 'Title of your push notification', 
//             body: 'Body of your push notification' 
//         },
        
//         data: {  //you can send only notification or only data(or include both) 
//             my_key: 'my value',
//             my_another_key: 'my another value'
//         }
//     };
    
//     fcm.send(message, function(err, response){
//         if (err) {
//             console.log("Something has gone wrong!");
//         } else {
//             console.log("Successfully sent with response: ", response);
//         }
//     });
})


// var fs = require('fs');
// var stream = fs.createWriteStream("my_file.txt");
// stream.once('open', function(fd) {
//   stream.write("My first row\n");
//   stream.end();
// });





// app.post('/register', function(req, res){
// 	if(req.body && req.body.deviceID && req.body.platform){
// 		if(req.body.platform === 'ios' || req.body.platform === 'android'){

// 	        // {Endpoint Body Here}

// 		} else{
// 			res.status(400);
// 			res.json({
// 				message: 'Invalid platform'
// 			});
// 		}
// 	} else{
// 		res.status(400);
// 		res.json({
// 			message: 'Invalid parameters'
// 		});
// 	}
// });
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist;
}

var port = process.env.PORT;
app.listen(port,function(){
mongoconnect.initialize();
})