var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//setup body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//setup port
var port = process.env.port || 8080;

//setup router
var router = express.Router();

//
// SCRIPT EXECUTION
//
function callScript() {
    const { exec } = require('child_process');

    exec('dir', // command line argument directly in string
        function (error, stdout, stderr) {      // one easy function to capture data/errors
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
}

//
// ROUTES
//

//middleware used to catch before being router to handling function.
router.use(function(req, res, next){
    // console.log('req: ' + req);
    // console.log('res: ' + res);
    // console.log('next: ' + next);
    // allow for cors
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Middleware called.');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Restful api used for searching local NAS.' });
});

router.get('/update', function (req, res) {
    console.log('Updating');
    //call update script
    callScript();
    res.json({ message: 'Update finished.' });
});

router.get('/search/:search_val', function (req, res) {
    console.log('Searching for: ' + req.params.search_val);
    //call search script
    callScript();
    res.json({ message: 'Search finished.' });
});

//register routes
app.use('/api', router);

//
// START SERVER
//
app.listen(port);
console.log('Starting server on port: ' + port);