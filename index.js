
const express = require ("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const request = require('request');

const port = process.env.PORT || 8083;


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

app.use(bodyParser.json());


//Proxy Celia Sánchez Gaitán

var paths2='/remoteApiDefense';
var apiServerHost2 = 'https://sos2122-26.herokuapp.com/api/v2/defense-spent-stats';

app.use(paths2, function(req, res) {
  var url = apiServerHost2 + req.url;
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



