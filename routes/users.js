var express = require('express');
var router = express.Router();
var request=require('request');
var list=[];
var cl=[];
redis = require('./redisco.js').exposeConnection();
/* GET users listing. */
router.get('/', function(req, res, next) {

    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/?format=json"
    }
    request.get(options, function(error, response, body) {
        //   res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            // console.log("success response from Myob: "+body);
            var jsonobj = JSON.parse(body);

            for (var a = 0; a < jsonobj.length; a++) {


                list.push(jsonobj[a].Name + ' ' + jsonobj[a].ProductLevel.Name);

                redis.set(jsonobj[a].Name + ' ' + jsonobj[a].ProductLevel.Name, JSON.stringify(jsonobj[a]));


            }
            redis.sadd( "company", list, function(err,res) {
                console.log("done");
                credis.end();
            });
        }
    });
     res.send('company list is transfered');
});


//need to create json array
router.get('/get', function(req, res, next) {
var k=[];
var l=0;
    res.contentType('application/json');
    redis.smembers("company", function(err,results) {

        var onlineUsers = results;

            for (var i in onlineUsers) {



                redis.get(onlineUsers[i],function (err,val) {
                    if(!err)


                console.log(val);

                })

        }
console.log(cl);
// var myjson=JSON.parse(cl);
        res.send('myjson');
        });
});











router.get('/myoblist', function(req, res, next) {
 res.render('myob/getlist');
});
module.exports = router;
