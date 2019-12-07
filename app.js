let express = require("express");
let app = express(); 

let PORT = 3000; 
let data15 = require("./public/assets/data/data15.json");
let data16 = require("./public/assets/data/data16.json");
let data17 = require("./public/assets/data/data17.json");
let data18 = require("./public/assets/data/data18.json");
let data19 = require("./public/assets/data/data19.json");
let suicideData15 = require("./public/assets/data/suicideData15.json");
let suicideData16 = require("./public/assets/data/suicideData15.json");
let top10_15 = require("./public/assets/data/top10Suicides15.json");
let top10_16 = require("./public/assets/data/top10Suicides16.json");
app.use(express.static("public"));

app.get("/data/:id", function(req, res) {
    let data = {}
    let id = req.params.id;
    console.log("ID IS: ", id)
    if(id == 15){
        data["happinessData"] = data15;
        data["suicideData"] = suicideData15;
        data["top"] = top10_15;
    }else if(id == 16) {
        data["happinessData"] = data16;
        data["suicideData"] = suicideData16;
        data["top"] = top10_16;
    } else if(id == 17) {
        data["happinessData"] = data17;
        data["suicideData"] = 'NA';
    }else if(id == 18){
        data["happinessData"] = data18;
        data["suicideData"] = 'NA';
    }else if(id == 19) {
        data["happinessData"] = data19;
        data["suicideData"] = 'NA';
    }
    res.json(data)
})

app.get("/data/data15", function(req, res) {
    let data = {
        "data15": data15,
        "suicideData":  suicideData
    }
    res.json(data)
})

app.get("/data/suicide", function(req, res) {

})

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`)
})