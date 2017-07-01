var express = require('express');
var router = express.Router();
var request=require('request');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/con', function(req, res, next) {

    res.render('contacts', { title: 'Express' });
});
router.get('/cre', function(req, res, next) {

    res.render('createContact', { title: 'Express' });
});
// get list of contacts from a company
router.get('/contacts', function(req, res) {
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Contact/Customer/?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

// get one contact from a company
router.get('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log("Request param id: "+id);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Customer/"+id+"/?format=json"
    }
    request.get(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

// Create contact
router.post('/contacts/new', function(req, res) {
    var requestBody = JSON.stringify(req.body);
    console.log("Request body: "+requestBody);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Contact/Customer/?format=json",
        body: requestBody
    }
    request.post(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 201) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})

// Delete one contact from a company
router.delete('/contacts/:id', function(req, res) {
    var id = req.params.id;
    console.log("Request param id: "+id);
    var options = { headers: {
        'Authorization': 'Basic QWRtaW5pc3RyYXRvcjo='
    },
        url: "http://13.126.47.35:8080/AccountRight/48b58bb2-e017-4368-87c4-1fe44c1334ca/Customer/"+id+"/?format=json"
    }
    request.delete(options, function(error, response, body) {
        res.set('Content-Type', 'Application/json');
        if (!error && response.statusCode == 200) {
            console.log("success response from Myob: "+body);
            res.status(response.statusCode).send(body);
        } else {
            console.log("failure response from Myob: "+body);
            res.status(response.statusCode).send(body);
        }
    });
})
module.exports = router;
