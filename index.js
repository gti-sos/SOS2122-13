
const express = require ("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8082;

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



