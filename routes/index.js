var express = require('express');
var router = express.Router();

var firebase = require('firebase');

firebase.initializeApp({
    databaseURL: "https://con100t-f2921.firebaseio.com/"
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.writeHead(200,{'Content-Type': 'application/json'});
    var db = firebase.database();
    var ref = db.ref("/arduino1/enchufes");
    ref.once("value",function (snapshot) {
        console.log(snapshot.val());

        res.end(JSON.stringify(snapshot.val()));
    });
   // res.end();
   // 10.16.2.223

});


router.get('/p', function(req, res, next) {h
  var horaFormat = req.query.ft;
  var horaTS = horaFormat.replace(/:/g,'');
     var option = req.query.ca;
    var corrienteA = req.query.cA;
    var corrienteB = req.query.cB;
    var corrienteC = req.query.cC;
    var corrienteD = req.query.cD;
    var voltajeTotal = req.query.vt;
    var fechaFormat = req.query.fF;
    var fechaTS = fechaFormat.replace(/-/g,'')
    var corrienteTotal = req.query.cT;


    var db = firebase.database();
    var ref = db.ref("arduino1/");
    var registroRef = ref.child("registros");

    var newRegistroRef = registroRef.push();
    newRegistroRef.set({
        corrientea: corrienteA,
        corrienteb: corrienteB,
        corrientec: corrienteC,
        corriented: corrienteD,
        voltajet: voltajeTotal,
        horaTS: horaTS,
        horaFormat: horaFormat,
        fechaTS: fechaTS,
        fechaFormat: fechaFormat,
        corrienteT: corrienteTotal

    });


    console.log("voltaje total = : " + voltajeTotal );
    console.log("corriente a = " + corrienteA);
    console.log("corriente b = " + corrienteB);
    console.log("corriente c = " + corrienteC);
    console.log("corriente d = " + corrienteD);
    console.log("fechaFormat = " + fechaFormat);
    console.log("corriente Total= " + corrienteTotal);
    console.log("hora = " + horaFormat);
    console.log("pruebilla = " + option);
  res.end();
});



router.get('/test', function (req, res, next) {
    var db = firebase.database();
    var ref = db.ref("server/saving-data/fireblog");

    var postsRef = ref.child("posts");

    var newPostRef = postsRef.push();
    newPostRef.set({
        author: "deadmaufive",
        title: "me la pelas negs"
    });

// we can also chain the two calls together
//     postsRef.push({
//         author: "alanisawesome",
//         title: "The Turing Machine"
//     });



    // var usersRef = ref.child("users");
    // var hopperRef = usersRef.child("deadmaufive");
    // hopperRef.update({
    //     "Laptop": "MacbookPro 2012"
    // });

    res.end();
    // res.writeHead(200,{'Content-Type': 'application/json'});
    // var db = firebase.database();
    // var ref = db.ref("server/saving-data/fireblog");
    //
    // ref.once("value",function (snapshot) {
    //     console.log(snapshot.val());
    //
    //     res.end(+);
    // });



});



router.get('/getest' ,function (req, res , next) {
    var db = firebase.database();
    var ref = db.ref("server/saving-data/fireblog/posts");

// Attach an asynchronous callback to read the data at our posts reference
    ref.on("child_added", function(snapshot, prevChildKey) {
        var newPost = snapshot.val();
        console.log("Author: " + newPost.author);
        console.log("Title: " + newPost.title);
        console.log("Previous Post ID: " + prevChildKey);
    });
});

module.exports = router;
