var express = require('express'),
    mongoose = require('mongoose'),
    multer = require('multer'),
    router = express.Router(),
    cons = require('consolidate'),
    dust = require('dustjs-linkedin'),
    path = require('path'),
    bodyParser = require('body-parser');

var app = express();

var upload = multer({
    dest: __dirname + '/img/'
});

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: true }));


router.get('/', function(req, res) {

    res.render('index');
});


router.post('/save', upload.single('profile'), function(req, res) {
    var formdata = {
        'username': req.body.username,
        'email': req.body.email,
        'filesrc': req.file.path
    };
    console.log(formdata);
    res.render('save', { formdata: formdata });
});

app.use('/app', router);

app.listen('8000', function(req, res) {
    console.log('server running on port 8000');
});
