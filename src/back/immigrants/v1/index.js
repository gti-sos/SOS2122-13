const API_DOC_PORTAL = "https://documenter.getpostman.com/view/20113253/UVysxbUT"
const BASE_API_URL = "/api/v1";
const bodyParser = require("body-parser");
const res = require("express/lib/response");

var immigrants = [
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


module.exports.register = (app, db) => {

    

    app.use(bodyParser.json());

    //Documentación
    app.get(BASE_API_URL + "/immigrants/docs", (req, res) => {
        res.redirect(API_DOC_PORTAL);
    });

   

    //Cargar datos iniciales
    app.get(BASE_API_URL + "/immigrants/loadInitialData", (req, res) => {

        db.find({}, function(err,filteredImmigrants){

            if(err){
                res.sendStatus(500, "CLIENT ERROR");
            }

            if(filteredImmigrants==0){
                for(var i = 0; i<immigrants.length;i++){
                    db.insert(immigrants[i]);
                }
                res.sendStatus(200,"OK");
            }
        })
    });


    //GET al conjunto de recursos
    app.get(BASE_API_URL  + "/immigrants",(req,res)=>{

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
        }
    
        db.find({},function(err, filteredImmigrants){
    
            if(err){
                res.sendStatus(500, "CLIENT ERROR");   
            }

            // Año
            if(year != null){
                var filteredImmigrants = filteredImmigrants.filter((reg)=>
                {
                    return (reg.year == year);
                });
                if (filteredImmigrants==0){
                    res.sendStatus(404, "NOT FOUND");     
                }
            }

            // From To
            if(from != null && to != null){
                filteredImmigrants = filteredImmigrants.filter((reg)=>
                {
                    return (reg.year >= from && reg.year <=to);
                });
    
                if (filteredImmigrants==0){
                    res.sendStatus(404, "NOT FOUND");
                }    
            }
            
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredImmigrants = pagination(req,filteredImmigrants);
            }
            filteredImmigrants.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(filteredImmigrants,null,2));
        });
      
    });

    //GET a un recurso en concreto (país)
    app.get(BASE_API_URL  + "/immigrants/:country",(req, res)=>{

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
        }
    
        db.find({}, function(err,filteredImmigrants){
                
            if(err){
                res.sendStatus(500, "CLIENT ERROR");
                return;
            }
    
            filteredImmigrants = filteredImmigrants.filter((reg)=>
            {
                return (reg.country == country);
            });
    
    
            if(from != null && to != null && from<=to){
                filteredImmigrants = filteredImmigrants.filter((reg)=>
                {
                   return (reg.year >= from && reg.year <=to);
                }); 
                
            }
        
            if (filteredImmigrants==0){
                res.sendStatus(404, "NOT FOUND");
                return;
            }
            
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredImmigrants = pagination(req,filteredImmigrants);
            }
            filteredImmigrants.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(filteredImmigrants,null,2));
        });
    
    });

    //GET a un recurso en concreto (país y año)
    app.get(BASE_API_URL + "/immigrants/:country/:year",(req, res)=>{

        var emigrantCountry =req.params.country
        var emigrantYear = req.params.year
    
        db.find({},function(err, filteredImmigrants){
    
            if(err){
                res.sendStatus(500, "ERROR EN CLIENTE");
            }
    
            filteredImmigrants = filteredImmigrants.filter((reg)=>
            {
                return (reg.country == emigrantCountry && reg.year == emigrantYear);
            });
    
            if (filteredImmigrants==0){
                res.sendStatus(404, "NO EXISTE");
            }
            
            //Pagination
            if(req.query.limit != undefined || req.query.offset != undefined){
                filteredImmigrants = pagination(req,filteredImmigrants);
                res.send(JSON.stringify(filteredImmigrants,null,2));
            }
            filteredImmigrants.forEach((element)=>{
                delete element._id;
            });
            res.send(JSON.stringify(filteredImmigrants[0],null,2));
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

    app.post(BASE_API_URL + "/immigrants", (req, res) => {

        if(incorrect(req)){
            res.sendStatus(400,"BAD REQUEST");
        }
        else{
            db.find({},function(err,filteredImmigrants){
    
                if(err){
                    res.sendStatus(500, "CLIENT ERROR");
                   
                }
    
                filteredImmigrants = filteredImmigrants.filter((reg)=>
                {
                    return(req.body.country == reg.country && req.body.year == reg.year)
                })
            
                if(filteredImmigrants.length != 0){
                    res.sendStatus(409, "CONFLICT");
                }else{
                    db.insert(req.body);
                    res.sendStatus(201, "CREATED");
                }
            });
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
    app.put(BASE_API_URL + "/immigrants/:country/:year", (req, res) => {
            if(incorrect(req)){
                res.sendStatus(400,"BAD REQUEST");
            }
        var Country = req.params.country;
        var Year = req.params.year;
        var Body = req.body; 

        db.find({},function(err,filteredImmigrants){
            if(err){
                res.sendStatus(500, "CLIENT ERROR");
                return;
            }

            //Si no existe...

            filteredImmigrants = filteredImmigrants.filter((reg)=>
            {
                return (reg.country == Country && reg.year == Year);
            });
            if (filteredImmigrants==0){
                res.sendStatus(404, "NOT FOUND");
                return;
            }

            //Si los campos han cambiado...

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
    app.delete(BASE_API_URL + "/immigrants", (req, res) => {
        db.remove({}, { multi: true}, (err, rem)=>{
            if (err){
                res.sendStatus(500, "CLIENT ERRORR");
            }
            res.sendStatus(200, "OK")
        })
    });

    //DELETE a un estadística en concreto (país y año)
    app.delete(BASE_API_URL + "/immigrants/:country/:year", (req, res) => {

        var Country = req.params.country;   
        var Year = req.params.year;
    
        db.find({country: Country, year: Year}, {}, (err, filteredImmigrants)=>{

            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            if(filteredImmigrants==0){
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
