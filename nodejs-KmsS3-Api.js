// requrie the aws sdk

var AWS = require('aws-sdk');


// require the web server/middleare libs

var express = require('express');

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 * 'body-parser' must be installed (via `npm install --save body-parser`)
 * For more info see: https://github.com/expressjs/body-parser
 */

var bodyParser = require('body-parser');

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());


AWS.config.update({region: 'us-east-1'});


// viewed at http://localhost:8080

    app.use(express.static('.'));

    app.get('/index.html', function (req, res) {
       res.sendFile( __dirname + "/" + "index.html" );
    })


    app.post('/post', function (req, res) {

    var plaintext = req.body;



    var params1 = {
    KeyId: "arn:<foo>", // The identifier of the CMK to use for encryption. You can use the key ID or Amazon Resource Name (ARN) of the CMK, or the name or ARN of an alias that refers to the CMK.
    Plaintext: plaintext.Password // The data to encrypt.
};

var kms = new AWS.KMS();


    kms.encrypt(params1, function(err, data) {
    if (err)
            res.send(err).sendStatus(500); // an error occurred

    else
         var s3 = new AWS.S3();
                  var params = {
                      Body: JSON.stringify(data),
                      Bucket: 'secsandman-secret',
                      Key: 'secrets.txt',
                      ServerSideEncryption: "AES256",
                      Tagging: "env=dev&name=kmslab"
                     };
                     s3.putObject(params, function(err, data) {
                       if (err) console.log(err, err.stack); // an error occurred
                       else
                           console.log('Secrets uploaded!');           // successful response
                     });

    });

        res.send('Congrats, your application with app ID of ' + req.body.AppID + ' has been saved. Your Git repo is being cloned and your DB connection string variables are being exported into memory of your host. Your DB secret has been encrypted at the appllicaiton tier and on AWS S3 both');


});

app.listen(8080, function () {
    console.log('listening on port', 8080);
});
