const cool = require ("cool-ascii-faces");
const express = require ("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 8080;

const BASE_API_URL = "/api/v1";
const API_DOC_PORTAL = "https://documenter.getpostman.com/view/20113253/UVyn3ytf"


app.use(bodyParser.json());
app.use("/",express.static(`public`));


app.get("/cool", (req,res)=>{
    console.log("Requested / route");
    res.send("<html><body><h1>"+cool()+"</h1></body></html>");
});


app.listen(port, () => {
    console.log(`Server TRULY ready at port ${port}`);
});

// Celia Sánchez Gaitán

var emigrants = [];

app.get(BASE_API_URL + "/emigrants/docs", (req, res) => {
    res.redirect(API_DOC_PORTAL);
});


//GET para crear 5 datos
app.get(BASE_API_URL + "/emigrants/loadInitialData", (req, res) => {
    emigrants = [];
    var initialData = [
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
        },
        {
            country: "usa",
            year: "2015",
            men: "1.509.309",
            women: "1.473.126",
            percentages: "0,93"
        },
        {
            country: "afganistan",
            year: "2017",
            men: "2.544.670",
            women: "2.281.794",
            percentages: "16,25"
        }
    ];
    
    initialData.forEach((e) => {
        emigrants.push(e);
    });
    res.send(JSON.stringify(emigrants, null, 2));
});


//GET al conjunto de recursos
app.get(BASE_API_URL + "/emigrants", (req, res) => {
    res.send(JSON.stringify(emigrants, null, 2));
});

//GET a un recurso en concreto (país)
app.get(BASE_API_URL + "/emigrants/:country", (req, res) => {

    var emigrantCountry = req.params.country;
    filteredEmigrants = emigrants.filter((emigrant)=> {
        return (emigrant.country == emigrantCountry);
    });

    if(filteredEmigrants == 0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredEmigrants[0],null,2));
    }
    
});

//GET a un recurso en concreto (país y año)
app.get(BASE_API_URL + "/emigrants/:country/:year", (req, res) => {

    var emigrantCountry = req.params.country;
    var emigrantYear = req.params.year;
    
    filteredEmigrants = emigrants.filter((emigrant)=> {
        return ((emigrant.country == emigrantCountry) && (emigrant.year == emigrantYear));
    });

    if(filteredEmigrants == 0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredEmigrants[0],null,2));
    }
    
});

//POST al conjunto de recursos
function incorrect(emigrant){
    return (Object.keys(emigrant.body).length != 5 ||
    emigrant.body.country == null ||
    emigrant.body.year == null ||
    emigrant.body.men == null ||
    emigrant.body.women == null ||
    emigrant.body.percentages == null);
}

app.post(BASE_API_URL + "/emigrants", (req, res) => {
    if (incorrect(req)){
        res.sendStatus(400, "BAD REQUEST")
    }
    else {
        filteredEmigrants = emigrants.filter((emigrant) => {
            return (emigrant.country == req.body.country
                && emigrant.year == req.body.year
                && emigrant.men == req.body.men
                && emigrant.women == req.body.women
                && emigrant.percentages == req.body.percentages);
        });
        
        existente = emigrants.filter((emigrant) => {
            return (emigrant.year == req.body.year && emigrant.country == req.body.country);
        })

        if (existente != 0){
            res.sendStatus(409, "CONFLICT");
        }else{
            emigrants.push(req.body);
            res.sendStatus(201, "CREATED");
        }
    }
});

//POST a un recurso concreto (país)
app.post(BASE_API_URL + "/emigrants/:country", (req, res) => {
    res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT al conjunto de recursos
app.put(BASE_API_URL + "/emigrants", (req, res) => {
    res.sendStatus(405, "METHOD NOT ALLOWED");
});

//PUT a un recurso en concreto
app.put(BASE_API_URL + "/emigrants/:country/:year", (req, res) => {
    if (incorrect(req)){
        res.sendStatus(400, "BAD REQUEST")
    }else {
        var Country = req.params.country;
        var Year = req.params.year;
        var Body = req.body;
        var filteredEmigrants = emigrants.filter((emigrant) => {
            return(emigrant.country == Country && emigrant.year == Year)
        })
        var ind = emigrants.indexOf(filteredEmigrants[0]);

        if (filteredEmigrants == 0){
            res.sendStatus(404, "NOT FOUND");
        }else if(Country != Body.country || Year != Body.year){
            res.sendStatus(400, "BAD REQUEST");
        }else{
            emigrants[ind].men = Body.men;
            emigrants[ind].women = Body.women;
            emigrants[ind].percentages = Body.percentages;
            res.sendStatus(200, "OK");
        }
    }
});

//DELETE al conjunto de recursos
app.delete(BASE_API_URL + "/emigrants", (req, res) => {
    emigrants = [];
    res.sendStatus(200,"OK");
});

//DELETE a un estadística en concreto (país)
app.delete(BASE_API_URL + "/emigrants/:country", (req, res) => {

    var emigrantCountry = req.params.country;

    filteredEmigrants = emigrants.filter((emigrant)=> {
        return (emigrant.country == emigrantCountry);
    });

    if(filteredEmigrants == 0){
        res.sendStatus(404, "NOT FOUND");
    } else{
        emigrants = emigrants.filter( (emigrant) => {
            return ((emigrant.country != emigrantCountry));
        });
    }
    res.sendStatus(200, "OK");
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

