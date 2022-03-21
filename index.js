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


// Opcional Thomas Tejeda

var immigrants = [
    {
        country: "spain",
        year: "2019",
        men: "2.913.747",
        women: "3.190.456",
        percentages: "12,90"
    },
    {
        country: "japan",
        year: "2017",
        men: "1.044.113",
        women: "1.277.363",
        percentages: "1,83"
    },
    {
        country: "italy",
        year: "2015",
        men: "2.637.798",
        women: "3.167.530",
        percentages: "9,57"
    }
];

app.get(BASE_API_URL + "/immigrants", (req, res) => {
    res.send(JSON.stringify(immigrants,null,2));
});

app.post(BASE_API_URL + "/immigrants", (req, res) => {
    immigrants.push(req.body);
    res.sendStatus(201,"CREATED");
});