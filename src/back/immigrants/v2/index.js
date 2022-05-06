const API_DOC_PORTAL = "https://documenter.getpostman.com/view/20229866/UVysxbUT"
const BASE_API_URL = "/api/v2";
var Datastore = require("nedb");
var db = new Datastore();
const bodyParser = require("body-parser");
const res = require("express/lib/response");

var immigrants = [];
   


module.exports.register = (app) => {


    //Documentación
    app.get(BASE_API_URL + "/immigrants/docs", (req, res) => {
        res.redirect(API_DOC_PORTAL);
    });

    db.insert(immigrants);
   

    //Cargar datos iniciales
    app.get(BASE_API_URL + "/immigrants/loadInitialData", (req, res) => {

        immigrantsInicial = [
            {
                country: "españa",
                year: "2019",
                men: "2.913.747",
                women: "3.190.456",
                percentages: "12,90"
            },
            {
                country: "japon",
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
                country: "estados unidos",
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

        db.remove({}, { multi: true }, function (err, numRemoved) {
        });

        db.insert(immigrantsInicial);

        res.send(JSON.stringify(immigrantsInicial,null,2));
    });


    //GET al conjunto de recursos

    app.get(BASE_API_URL + "/immigrants", (req,res)=>{

        var query = req.query;
        var limit = parseInt(query.limit);
        var offset = parseInt(query.offset);
        var dbquery = {};

        if (req.query.country) dbquery["country"] = req.query.country;
        if (req.query.year) dbquery["year"] = parseInt(req.query.year);
        if (req.query.men) dbquery["men"] = parseFloat(req.query.men);
        if (req.query.women) dbquery["women"] = parseFloat(req.query.women);
        if (req.query.percentages) dbquery["percentages"] = parseFloat(req.query.percentages);

        db.find(dbquery).sort({country:1, year:-1}).skip(offset).limit(limit).exec((error, dataImmi) => {
            if (error){
                console.error("Error accessing DB in POST: " + err);
                res.sendStatus(500);
            }else {

            //Eliminación de Id
            dataImmi.forEach((t) => {
                delete t._id
            });

            res.send(JSON.stringify(dataImmi, null, 2));
            console.log("GET REQUEST have been sent.");
            }
        });
    });

    //GET a un recurso en concreto (país y año)

    app.get(BASE_API_URL + "/immigrants/:country/:year", (req, res) => {

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

    app.post(BASE_API_URL + "/immigrants",(req,res)=>{

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
    app.post(BASE_API_URL + "/immigrants/:country", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    //PUT al conjunto de recursos
    app.put(BASE_API_URL + "/immigrants", (req, res) => {
        res.sendStatus(405, "METHOD NOT ALLOWED");
    });

    //PUT a un recurso en concreto
    app.put(BASE_API_URL + "/immigrants/:country/:year", (req,res) => {
        
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
    app.delete(BASE_API_URL + "/immigrants", (req,res) => {

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
    app.delete(BASE_API_URL + "/immigrants/:country/:year", (req,res)=>{

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
