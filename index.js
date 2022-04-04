
const express = require ("express");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8080;
const BASE_API_URL = "/api/v1";


//Base Datos
const Datastore = require("nedb")
 , db_emigrants = new Datastore();

//Backend Celia Sánchez Gaitán
const emigrantsBackend = require("./src/emigrants/index.js");
emigrantsBackend.register(app, db_emigrants);
///

app.use(bodyParser.json());
app.use("/",express.static(`public`));


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});



