
const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
const request = require('request');

const port = process.env.PORT || 8083;

app.use(bodyParser.json());
app.use(cors());

//Base Datos
const Datastore = require("nedb")
  , db_emigrants = new Datastore();
  
   db_immigrants = new Datastore();

//Backend Celia Sánchez Gaitán
const emigrantsBackendV1 = require("./src/back/emigrants/v1/index.js");
emigrantsBackendV1.register(app,db_emigrants);

const emigrantsBackendV2 = require("./src/back/emigrants/v2/index.js");
emigrantsBackendV2.register(app,db_emigrants);
///

//Proxy Celia Sánchez Gaitán

var paths1 ='/remoteApiPollution/loadInitialData';
var apiServerHost1 = 'https://sos2122-12.herokuapp.com/api/v2/pollution-stats/loadinitialdata';

app.use(paths1, function(req, res) {
  var url = apiServerHost1 + req.url;
  req.pipe(request(url)).pipe(res);
});

var paths2 ='/remoteApiPollution';
var apiServerHost2 = 'https://sos2122-12.herokuapp.com/api/v2/pollution-stats';

app.use(paths2, function(req, res) {
  var url = apiServerHost2 + req.url;
  req.pipe(request(url)).pipe(res);
});


//Proxys Thomas Tejeda Gordon

var paths1 ='/remoteApiCancerDeaths/loadInitialData';
var apiServerHost1 = 'https://sos2122-24.herokuapp.com/api/v1/cancerdeaths-stats/loadInitialData';

app.use(paths1, function(req, res) {
  var url = apiServerHost1 + req.url;
  req.pipe(request(url)).pipe(res);
});

var paths2 ='/remoteApiCancerDeaths';
var apiServerHost2 = 'https://sos2122-24.herokuapp.com/api/v1/cancerdeaths-stats';

app.use(paths2, function(req, res) {
  var url = apiServerHost2 + req.url;
  req.pipe(request(url)).pipe(res);
});

var paths3 ='/remoteApiTechnologyDevices/loadInitialData';
var apiServerHost3 = 'http://sos2122-30.herokuapp.com/api/v2/technology_devices_stats/loadInitialData';

app.use(paths3, function(req, res) {
  var url = apiServerHost3 + req.url;
  req.pipe(request(url)).pipe(res);
});

var paths4 ='/remoteApiTechnologyDevices';
var apiServerHost4 = 'http://sos2122-30.herokuapp.com/api/v2/technology_devices_stats';

app.use(paths4, function(req, res) {
  var url = apiServerHost4 + req.url;
  req.pipe(request(url)).pipe(res);
});



//Backend Thomas Tejeda Gordon
const immigrantsBackendV1 = require("./src/back/immigrants/v1/index.js");
immigrantsBackendV1.register(app, db_immigrants);

const immigrantsBackendV2 = require("./src/back/immigrants/v2/index.js");
immigrantsBackendV2.register(app, db_immigrants);
///

app.use(bodyParser.json());
app.use("/",express.static(`public`));


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});



