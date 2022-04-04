
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


//Thomas Tejeda Gordon

//GET para crear 5 datos
app.get(BASE_API_URL + "/immigrants/loadInitialData", (req, res) => {
    immigrants = [];
    var initialData = [
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
            country: "mexico",
            year: "2017",
            men: "620.387",
            women: "603.782",
            percentages: "0,99"
        },
        {
            country: "usa",
            year: "2015",
            men: "23.446.873",
            women: "24.732.004",
            percentages: "15,01"
        },
        {
            country: "afganistan",
            year: "2017",
            men: "66.738",
            women: "66.874",
            percentages: "0,45"
        }
    ];
    
    initialData.forEach((e) => {
        immigrants.push(e);
    });
    res.send(JSON.stringify(immigrants, null, 2));
});

//GET al conjunto de recursos
app.get(BASE_API_URL + "/immigrants", (req, res) => {
    res.send(JSON.stringify(immigrants, null, 2));
});

//GET a un recurso en concreto (país)
app.get(BASE_API_URL + "/immigrants/:country", (req, res) => {

    var immigrantCountry = req.params.country;
    filteredImmigrants = immigrants.filter((immigrant)=> {
        return (immigrant.country == immigrantCountry);
    });

    if(filteredImmigrants == 0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredImmigrants[0],null,2));
    }
    
});

//GET a un recurso en concreto (país y año)
app.get(BASE_API_URL + "/immigrants/:country/:year", (req, res) => {

    var immigrantCountry = req.params.country;
    var immigrantYear = req.params.year;
    
    filteredImmigrants = immigrants.filter((immigrant)=> {
        return ((immigrant.country == immigrantCountry) && (immigrant.year == immigrantYear));
    });

    if(filteredImmigrants == 0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredImmigrants[0],null,2));
    }
    
});

//POST al conjunto de recursos
function incorrect(immigrant){
    return (Object.keys(immigrant.body).length != 5 ||
    immigrant.body.country == null ||
    immigrant.body.year == null ||
    immigrant.body.men == null ||
    immigrant.body.women == null ||
    immigrant.body.percentages == null);
}

app.post(BASE_API_URL + "/immigrants", (req, res) => {
    if (incorrect(req)){
        res.sendStatus(400, "BAD REQUEST")
    }
    else {
        filteredImmigrants = immigrants.filter((immigrant) => {
            return (immigrant.country == req.body.country
                && immigrant.year == req.body.year
                && immigrant.men == req.body.men
                && immigrant.women == req.body.women
                && immigrant.percentages == req.body.percentages);
        });
        
        existente = immigrants.filter((immigrant) => {
            return (immigrant.year == req.body.year && immigrant.country == req.body.country);
        })

        if (existente != 0){
            res.sendStatus(409, "CONFLICT");
        }else{
            immigrants.push(req.body);
            res.sendStatus(201, "CREATED");
        }
    }
});

//POST a un recurso concreto (país)
app.post(BASE_API_URL + "/immigrants/:country", (req, res) => {
    res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT al conjunto de recursos
app.put(BASE_API_URL + "/immigrants", (req, res) => {
    res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT a un recurso en concreto
app.put(BASE_API_URL + "/immigrants/spain", (req, res) => {
    if (incorrect(req)){
        res.sendStatus(400, "BAD REQUEST")
    }else {
        var Country = req.params.country;
        var Year = req.params.year;
        var Body = req.body;
        var filteredImmigrants = immigrants.filter((immigrant) => {
            return(immigrant.country == Country && immigrant.year == Year)
        })
        var ind = immigrants.indexOf(filtered[0]);

        if (filteredImmigrants == 0){
            res.sendStatus(404, "NOT FOUND");
        }else if(Country != Body.country || Year != Body.year){
            res.sendStatus(400, "BAD REQUEST");
        }else{
            immigrants[i].men = Body.men;
            immigrants[i].women = Body.women;
            immigrants[i].percentages = Body.percentages;
            res.sendStatus(200, "OK");
        }
    }
});

//DELETE al conjunto de recursos
app.delete(BASE_API_URL + "/immigrants", (req, res) => {
    immigrants = [];
    res.sendStatus(200,"OK");
});

//DELETE a un estadística en concreto (país)
app.delete(BASE_API_URL + "/immigrants/:country", (req, res) => {

    var immigrantCountry = req.params.country;

    filteredImmigrants = immigrants.filter((immigrant)=> {
        return (immigrant.country == immigrantCountry);
    });

    if(filteredImmigrants == 0){
        res.sendStatus(404, "NOT FOUND");
    } else{
        immigrants = immigrants.filter( (immigrant) => {
            return ((immigrant.country != immigrantCountry));
        });
    }
    res.sendStatus(200, "OK");
});

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

