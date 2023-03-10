const express = require("express");
const bodyParser = require("body-parser");
const { LocalStorage } = require('node-localstorage');

const PORT = 3000; 
app = express();
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static("public"));
const ls = new LocalStorage('./scratch');
ls.clear();
let listItems = [];

if(ls.getItem("tdList")){
    temp = ls.getItem("tdList").split(",");
    for(var item of temp){
        listItems.push(item);
    }
}

app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
    };
    let day = today.toLocaleDateString("en-ca", options);
    res.render("list", {"dayOfWeek": day, "listItems": listItems});
});

app.post("/", function(req, res){
    let item = req.body.listItem;
    if(item){
        listItems.push(item);
    }
    ls.setItem("tdList", listItems);
    res.redirect("/");
});



app.listen(3000, function(){
    console.log("Server started on port", PORT + "...");
});


