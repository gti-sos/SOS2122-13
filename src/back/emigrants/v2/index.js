const API_DOC_PORTAL = "https://documenter.getpostman.com/view/20113253/UVyn3ytf"
const BASE_API_URL = "/api/v2";
var Datastore = require("nedb");
var db = new Datastore();
const bodyParser = require("body-parser");
const res = require("express/lib/response");

var emigrants = [];
   


module.exports.register = (app) => {

    // Celia Sánchez Gaitán

    //Documentación
    app.get(BASE_API_URL + "/emigrants/docs", (req, res) => {
        res.redirect(API_DOC_PORTAL);
    });

    db.insert(emigrants);
   

    //Cargar datos iniciales
    app.get(BASE_API_URL + "/emigrants/loadInitialData", (req, res) => {

        emigrantsInicial = [
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

        db.remove({}, { multi: true }, function (err, numRemoved) {
        });

        db.insert(emigrantsInicial);

        res.send(JSON.stringify(emigrantsInicial,null,2));
    });


    //GET al conjunto de recursos

    app.get(BASE_API_URL + "/emigrants", (req,res)=>{

        var query = req.query;
        var limit = parseInt(query.limit);
        var offset = parseInt(query.offset);
        var dbquery = {};

        if (req.query.country) dbquery["country"] = req.query.country;
        if (req.query.year) dbquery["year"] = parseInt(req.query.year);
        if (req.query.men) dbquery["men"] = parseFloat(req.query.men);
        if (req.query.women) dbquery["women"] = parseFloat(req.query.women);
        if (req.query.percentages) dbquery["percentages"] = parseFloat(req.query.percentages);

        db.find(dbquery).sort({country:1, year:-1}).skip(offset).limit(limit).exec((error, dataEmi) => {
            if (error){
                console.error("Error accessing DB in POST: " + err);
                res.sendStatus(500);
            }else {

            //Eliminación de Id
            dataEmi.forEach((t) => {
                delete t._id
            });

            res.send(JSON.stringify(dataEmi, null, 2));
            console.log("GET REQUEST have been sent.");
            }
        });
    });

    //GET a un recurso en concreto (país y año)

    app.get(BASE_API_URL + "/emigrants/:country/:year", (req, res) => {

        var reqCountry = req.params.country;
        var reqYear = parseInt(req.params.year);

        db.find({ country: reqCountry, year: reqYear }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR in GET: "+err);
                res.sendStatus(500);
            }
            else {
                if(data.length != 0){                
                console.log(`NEW GET request to <${reqCountry}>, <${reqYear}>`);
                res.status(200).send(JSON.stringify(data,null,2));
                }
                else{
                    console.error("Data not found");
                    res.status(404).send("Data not found in DB.");
                }

            }
        });
    });

    
    //POST al conjunto de recursos

    app.post(BASE_API_URL + "/emigrants",(req,res)=>{

        var dataNew = req.body;
        var countryNew = req.body.country;
        var yearNew = req.body.year;
        
        
        db.find({ country: countryNew, year: yearNew }, (err, data) => {
            if (err) {
                console.error("Error accessing DB in POST: " + err);
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    if (!dataNew.country ||
                        !dataNew.year ||
                        !dataNew.men ||
                        !dataNew.women ||
                        !dataNew.percentages) {

                        console.log("Number of parameters is incorrect.");
                        return res.status(400).send("Format incorrect.");
                    }else {
                        console.log("Inserting new data in DB: " + JSON.stringify(dataNew, null, 2));
                        db.insert(dataNew);
                        return res.status(201).send("Se ha creado correctamente: " +JSON.stringify(dataNew, null, 2));
                    }
                } else {
                    console.log("Conflit is detected.");
                    res.sendStatus(409);
                }
            }
        });
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
    app.put(BASE_API_URL + "/emigrants/:country/:year", (req,res) => {
        
        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);
        var data = req.body;

        if (Object.keys(data).length != 7) {
            console.log("Actualizacion de campos no valida");
            res.sendStatus(400);
        }else {
            db.update({ country: reqcountry, year: reqyear }, { $set: data }, {}, function (err, dataUpdate) {
                if (err) {
                    console.error("ERROR accesing DB in GET");
                    res.sendStatus(500);
                } else {
                    if (dataUpdate == 0) {
                        console.error("No data found");
                        res.sendStatus(404);
                    } else {
                        console.log("Campos actualizados")
                        res.sendStatus(200);
                    }
                }
            });
        }
    });

    //DELETE al conjunto de recursos

    app.delete(BASE_API_URL + "/emigrants", (req,res) => {

        db.remove({}, {multi: true}, (err, numDataRemoved) => {
            if (err || numDataRemoved == 0){
                console.log("ERROR deleting DB: "+err);
                res.sendStatus(500);
            }else{
                console.log(numDataRemoved+" has been successfully deleted from the BD.");
                res.sendStatus(200);
            }
        });
    });

    //DELETE a un recursoa en concreto (país)

    app.delete(BASE_API_URL + "/emigrants/:country/:year", (req,res)=>{

        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);

        db.remove({country : reqcountry, year : reqyear},{multi:true}, (err, data) => {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if(data != 0){
                    console.log(`NEW DELETE request to <${reqcountry}>, <${reqyear}>`);
                    res.status(200).send("The corresponding data for " + reqcountry + " and " + reqyear + " has been deleted");
                }else{
                    console.log("Data not foundd");
                    res.sendStatus(404);
                }
            }
        });
    });

};
