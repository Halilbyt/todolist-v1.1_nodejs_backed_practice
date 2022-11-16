const express       =   require("express");
const bodyParser    =   require("body-parser");
const app           =   express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static('public'))

let items = [];

app.get("/",function(req,res){
    let day         =   new Date();
    let options     =   {
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let currentDay = day.toLocaleDateString("us-US",options);
 
    res.render("index",{theDay:currentDay,newItem:items})
})
app.post("/",function(req,res){
    let item    =   req.body.addedItem;
    let btn     =   req.body.submit;
    items.push(item);
    if(btn ==="send"){
        res.redirect("/");
    }
    else if(btn === "delete"){
        items = [];
        res.redirect("/");
    }
    
})

app.listen(8800,function(){
    console.log("the server is running on port 8800");
})