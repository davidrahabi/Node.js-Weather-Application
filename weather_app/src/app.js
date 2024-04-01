const express = require("express");
const hbs = require("hbs");
const path = require("path");
const weatherData= require("../utils/weatherData");

const app = express();

const publicPath = path.join(__dirname,"../public"); //tell express server where the public folder exists
const viewsPath = path.join(__dirname,"../templates/views"); //tell express server where the public folder exists
const partialsPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

const port = process.env.PORT || 3003;
app.get("/", (req,res) => {
    res.render("index",{title: "Weather App"});
});

app.get("/weather", (req,res)=> {
    if(!req.query.address){
        return res.send({message: "Address required"});
    }
    weatherData(req.query.address, (error,result)=>{
       if(error){
        return res.send(error);
       } 
       res.send(result);
    });
});

app.get("*",(req,res)=>{
    res.render("404",{title:"Page not found"});
});
app.listen(port,() => {
    console.log("server listening on port " + port);
});
