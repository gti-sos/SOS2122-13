
var Datastore = require("nedb");
var path = require('path');
var db = new Datastore();

const API_DOC_PORTAL = "https://documenter.getpostman.com/view/20113253/UVyn3ytf"
const BASE_API_URL = "/api/v2";
const bodyParser = require("body-parser");
const res = require("express/lib/response");

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


module.exports.register = (app, db) => {

    //Documentación
    app.get(BASE_API_URL + "/emigrants/docs", (req, res) => {
        res.redirect(API_DOC_PORTAL);
    });

    //Cargar datos iniciales
    app.get(BASE_API_URL + "/emigrants/loadInitialData", (req, res) => {

        db.find({}, function(err,filteredEmigrants){

            if(err){
                res.sendStatus(500, "CLIENT ERROR");
            }

            if(filteredEmigrants==0){
                for(var i = 0; i<emigrants.length;i++){
                    db.insert(emigrants[i]);
                }
                res.sendStatus(200,"OK");
                return;
            }
            else
            {
            res.sendStatus(200, "Ya inicializados")
        }
        })
    });

    function campos(req, l){

        var fields = req.query.fields;
        var contieneCountry = false;
        var contieneYear = false;
        var contieneMen = false;
        var contieneWomen = false;
        var contienePercentages = false;

        fields = fields.split(",");

        for(var i = 0; i<fields.length;i++){

            var element = fields[i];

            if(element=='country'){
                contieneCountry=true;
            }

            if(element=='year'){
                contieneYear=true;
            }

            if(element=='men'){
                contieneMen=true;
            }

            if(element=='women'){
                contieneWomen=true;
            }

            if(element=='percentages'){
                contienePercentages=true;
            }
        }

        if(!contieneCountry){
            l.forEach((element)=>{
                delete element.country;
            })
        }

        if(!contieneYear){
            l.forEach((element)=>{
                delete element.year;
            })
        }

        if(!contieneMen){
            l.forEach((element)=>{
                delete element.men;
            })
        }

        if(!contieneWomen){
            l.forEach((element)=>{
                delete element.women;
            })
        }

        if(!contienePercentages){
            l.forEach((element)=>{
                delete element.percentages;
            })
        }

        return l;

    }

    //GET al conjunto de recursos
    app.get(BASE_API_URL  + "/emigrants", (req, res)=>{

        var year = req.query.year;
        var from = req.query.from;
        var to   = req.query.to;
    
        for(var i = 0; i<Object.keys(req.query).length;i++){

            var element = Object.keys(req.query)[i];
            if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
                res.sendStatus(400, "BAD REQUEST");  
            }
        }

        if(from>to){
            res.sendStatus(400, "BAD REQUEST"); 
            return;  
        }
    
        db.find({},function(err, filteredEmigrants){
    
            if(err){
                res.sendStatus(500, "CLIENT ERROR"); 
                return;  
            }

            if(year != null){
                var filteredEmigrants = filteredEmigrants.filter((reg)=>
                {
                    return (reg.year == year);
                });
                if (filteredEmigrants==0){
                    res.sendStatus(404, "NOT FOUND"); 
                    return;    
                }
            }

            if(from != null && to != null){
                filteredEmigrants = filteredEmigrants.filter((reg)=>
                {
                    return (reg.year >= from && reg.year <=to);
                });
    
                if (filteredEmigrants==0){
                    res.sendStatus(404, "NOT FOUND");
                    return;
                }    
            }
            
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredEmigrants = pagination(req,filteredEmigrants);
            }
            filteredEmigrants.forEach((element)=>{
                delete element._id;
            });
           
            if(req.query.fields!=null){
                
                var listaFields = req.query.fields.split(",");
                for(var i = 0; i<listaFields.length;i++){
                    var element = listaFields[i];
                    if(element != "country" && element != "year" && element != "men"  && element != "women" && element != "percentages"){
                        res.sendStatus(400, "BAD REQUEST");
                        return;
                    }
                }
                filteredEmigrants = campos(req,filteredEmigrants);
            }
            res.send(JSON.stringify(filteredEmigrants, null, 2));
        });
      
    });

    //GET a un recurso en concreto (país)
    app.get(BASE_API_URL  + "/emigrants/:country",(req, res)=>{

        var country =req.params.country
        var from = req.query.from;
        var to = req.query.to;
    
        for(var i = 0; i<Object.keys(req.query).length;i++){

            var element = Object.keys(req.query)[i];
            if(element != "from" && element != "to"){
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }
    
        if(from>to){
            res.sendStatus(400, "BAD REQUEST"); 
            return;
        }
    
        db.find({}, function(err, filteredEmigrants){
                
            if(err){
                res.sendStatus(500, "CLIENT ERROR");
                return;
            }
    
            filteredEmigrants = filteredEmigrants.filter((reg)=>
            {
                return (reg.country == country);
            });
    
            var from = req.query.from;
            var to = req.query.to;

            if (from > to) {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
    
            if(from != null && to != null && from<=to){
                filteredEmigrants = filteredEmigrants.filter((reg)=>
                {
                   return (reg.year >= from && reg.year <=to);
                }); 
                
            }
        
            if (filteredEmigrants==0){
                res.sendStatus(404, "NOT FOUND");
                return;
            }
            
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredEmigrants = pagination(req, filteredEmigrants);
            }

            filteredEmigrants.forEach((element)=>{
                delete element._id;
            });

           if(req.query.fields!=null){
                //Comprobamos si los campos son correctos
                var listaFields = req.query.fields.split(",");
                for(var i = 0; i<listaFields.length;i++){
                    var element = listaFields[i];
                    if(element != "country" && element != "year" && element != "men"  && element != "women" && element != "percentages"){
                        res.sendStatus(400, "BAD REQUEST");
                        return;
                    }
                }
                //Escogemos los fields correspondientes
                filteredEmigrants = campos(req,filteredEmigrants);
            }
            res.send(JSON.stringify(filteredEmigrants, null, 2));
        })
    
    })

    //GET a un recurso en concreto (país y año)
    app.get(BASE_API_URL + "/emigrants/:country/:year",(req, res)=>{

        var emigrantCountry =req.params.country
        var emigrantYear = req.params.year
    
        db.find({},function(err, filteredEmigrants){
    
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
            }
    
            filteredEmigrants = filteredEmigrants.filter((reg)=>
            {
                return (reg.country == emigrantCountry && reg.year == emigrantYear);
            });
    
            if (filteredEmigrants==0){
                res.sendStatus(404, "NO EXISTE");
            }
            
            //Pagination
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredEmigrants = pagination(req,filteredEmigrants);
                res.send(JSON.stringify(filteredEmigrants,null,2));
            }
            filteredEmigrants.forEach((element)=>{
                delete element._id;
            });

            if(req.query.fields!=null){

                var listaFields = req.query.fields.split(",");
                for(var i = 0; i<listaFields.length;i++){
                    var element = listaFields[i];
                    if(element != "country" && element != "year" && element != "men"  && element != "women" && element != "percentages"){
                        res.sendStatus(400, "BAD REQUEST");
                        return;
                    }
                }
                
                filteredEmigrants = campos(req,filteredEmigrants);
            }
            res.send(JSON.stringify(filteredEmigrants[0], null, 2));
        });
    
    });

    function incorrect(req){
        return (req.body.country == null |
                req.body.year == null |
                req.body.men == null |
                req.body.women == null |
                req.body.percentages == null);
    };

    function pagination(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("ERROR");
            return res;
        }
    
        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;
    
    };

    
    //POST al conjunto de recursos
    app.post(BASE_API_URL + "/emigrants", (req, res) => {

        if(incorrect(req)){
            res.sendStatus(400,"BAD REQUEST");
        }
        else{
            db.find({},function(err,filteredEmigrants){
    
                if(err){
                    res.sendStatus(500, "CLIENT ERROR");
                   
                }
    
                filteredEmigrants = filteredEmigrants.filter((reg)=>
                {
                    return(req.body.country == reg.country && req.body.year == reg.year)
                })
            
                if(filteredEmigrants.length != 0){
                    res.sendStatus(409, "CONFLICT");
                }else{
                    db.insert(req.body);
                    res.sendStatus(201, "CREATED");
                }
            });
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

        if(incorrect(req)){
            res.sendStatus(400,"BAD REQUEST-Los parámetros son incorrectos");
            return;
        }

        var Country = req.params.country;
        var Year = req.params.year;
        var Body = req.body; 

        db.find({},function(err,filteredEmigrants){

            if(err){
                res.sendStatus(500, "CLIENT ERROR");
                return;
            }

            filteredEmigrants = filteredEmigrants.filter((reg)=>
            {
                return (reg.country == Country && reg.year == Year);
            });
            if (filteredEmigrants==0){
                res.sendStatus(404, "NOT FOUND");
                return;
            }

           

            if(Country != Body.country || Year != Body.year){
                res.sendStatus(400,"BAD REQUEST");
                return;
            }

            //Se hace el put
                
            db.update({$and:[{country: String(Country)}, {year: parseInt(Year)}]}, {$set: Body}, {},function(err, upd) {
                if (err) {
                    res.sendStatus(500, "CLIENT ERROR");
                    return;
                }else{
                    res.sendStatus(200, "UPDATED");
                    return;
                }
            });
        });
    }); 

    //DELETE al conjunto de recursos
    app.delete(BASE_API_URL + "/emigrants", (req, res) => {
        db.remove({}, { multi: true}, (err, rem)=>{
            if (err){
                res.sendStatus(500, "CLIENT ERROR");
                return;
            }
            res.sendStatus(200, "OK");
            return;
        });
    });

    //DELETE a un estadística en concreto (país y año)
    app.delete(BASE_API_URL + "/emigrants/:country/:year", (req, res) => {

        var Country = req.params.country;   
        var Year = req.params.year;
    
        db.find({country: Country, year: Year}, {}, (err, filteredEmigrants)=>{

            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            if(filteredEmigrants==0){
                res.sendStatus(404,"NOT FOUND");
                return;
            }
            db.remove({country: Country, year: Year}, {}, (err, rem)=>{
                if (err){
                    res.sendStatus(500,"ERROR EN CLIENTE");
                    return;
                }
            
                res.sendStatus(200,"OK");
                return;
                
            });
        });
    });

};
