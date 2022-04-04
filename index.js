
const express = require ("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8080;
const BASE_API_URL = "/api/v1";


//Base Datos emigrants
const Datastore = require("nedb")
 , db_emigrants = new Datastore();

//Backend Celia Sánchez Gaitán
const emigrantsBackend = require("./src/emigrants/index.js");
emigrantsBackend.register(app, db_emigrants);
///

//Base Datos immigrants
const Datastoreim = require("nedb")
 , db_immigrants = new Datastore();

//Backend Thomas Tejeda Gordon
const immigrantsBackend = require("./src/immigrants/index.js");
immigrantsBackend.register(app, db_immigrants);
///

app.use(bodyParser.json());
app.use("/",express.static(`public`));


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});




