const cool = require ("cool-ascii-faces");
const express = require ("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 8080;

const BASE_API_URL = "/api/v1";

app.use(bodyParser.json());
app.use("/",express.static(`public`));


app.get("/cool", (req,res)=>{
    console.log("Requested / route");
    res.send("<html><body><h1>"+cool()+"</h1></body></html>");
});


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});

// Opcional Celia Sánchez

var emigrants = [
    {
        country: "spain",
        year: "2019",
        men: "666.443",
        women: "778.449",
        percentages: "3,05"
    },
    {
        country: "japan",
        year: "2017",
        men: "379.52",
        women: "452.348",
        percentages: "0,66"
    },
    {
        country: "mexico",
        year: "2017",
        men: "6.909.042",
        women: "6.055.840",
        percentages: "10,45"
    }
];

app.get(BASE_API_URL + "/emigrants", (req, res) => {
    res.send(JSON.stringify(emigrants,null,2));
});

app.post(BASE_API_URL + "/emigrants", (req, res) => {
    emigrants.push(req.body);
    res.sendStatus(201,"CREATED");
});