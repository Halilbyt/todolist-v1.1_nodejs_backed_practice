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

// description of the codes above:
/*
 const express require("express") // adding express framework
 const app = express() // creating express object from express class instance
 const bodyParser = require("body-parser") // ading body parser framework into bodyParser constant 

 app.use(bodyParser.urlencoded({extended:true})) // make use of body-parser into app which express.js
 app.set("view engine","ejs") // adding ejs as view engine and before that we must create a folder named views and inside that create index.ejs file
 app.get("/",function(req,res){
    // decide to show web page from server
    // first create a date object to get current day month information
    let day = new Date();
    //creation options object that descripbe data formating which demonstrate on webside
    let  options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    }
    let currentDay = day.toLocalDateString("tr-TR",options) // first param is region shurtcuts and seconds is our options object that created before
    res.render("index",{theDay:currentDay,newItem:items}) // now render our index.ejs page to server but we only type it "index" not extensiton included

 })

 not:
  <h1><%= myVariable %></h1> // we put <%= %> inside that to describe our variable to change from server
  <% for(let i=0;i<myList.length;i++){ %>
    <li class="myList-style"><%= myList[i] %></li>
  <%}%>
    we put "<%" start of every line which have js script and put "%>" to end of every line as well.
     
*/