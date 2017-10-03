var execAsync = require('async-child-process').execAsync;
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
async function callScript(arg) {
    // const { exec } = require('child_process');
    console.log('executing arg: ' + arg);
    const {stdout} = await execAsync(arg);
    var results = stdout.split("\n");
    console.log(results);
    return results;
    // return exec(arg, // command line argument directly in string
    //     function (error, stdout, stderr) {      // one easy function to capture data/errors
    //         if (error) {
    //             console.error(`exec error: ${error}`);
    //             return;
    //         }
    //         console.log(`stdout: ${stdout}`);
    //         console.log(`stderr: ${stderr}`);
    //         return stdout.split("\n");
    //     });
}

//
// ROUTES
//

//middleware used to catch before being router to handling function.
router.use(function(req, res, next){
    // allow for CORS (error occured in testing when react app was calling rest api).
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
    callScript('updateNAS.sh');
    res.json({ message: 'Update finished.' });
});

router.get('/search/:search_val', function (req, res) {
    var value = req.params.search_val;
    console.log('Searching for: ' + value);
    //call search script
    var search_results = callScript('searchNAS.sh ' + value);
    console.log(search_results);
    res.json({ message: 'Search finished.', results: search_results });
});

//register routes
app.use('/api', router);

//
// START SERVER
//
app.listen(port);
console.log('Starting server on port: ' + port);