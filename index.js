var express = require('express'),
    mongoose = require('mongoose'),
    Busboy = require('busboy'),
    router = express.Router(),
    cons = require('consolidate'),
    dust = require('dustjs-linkedin'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));


router.get('/', function(req, res) {

    res.render('index');
});

router.get('/save', function(req, res) {
    res.render('save');
});


router.post('/save', function(req, res) {
    var busboy = new Busboy({ headers: req.headers });
    var saveTo;
    var formdata={};
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        saveTo = path.join(__dirname, '/img/', filename);
        formdata.profileSrc=saveTo;
         console.log(formdata);
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
         formdata = {
            "username": req.body.username,
            "email": req.body.email
        };
        console.log(formdata);
        res.render('save', { formdata: formdata });

    });

    return req.pipe(busboy);
});

app.use('/app', router);

app.listen('8000', function(req, res) {
    console.log('server running on port 8000');
});
