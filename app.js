const express       =   require("express");
const bodyParser    =   require("body-parser");
const app           =   express();
const mongoose      =   require("mongoose");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static('public'))

const myItems       =   ["Wake up at 8:00 in the morning","Study for 1 hour before breakfast","Have breakfast","Study for 2 more hours"];
let workItems       =   [];

// database connection
mongoose.connect("mongodb://localhost:27017/todoListDB",{useNewUrlParser: true});

// creating scheme of object that we wanted.
const itemSchema = new mongoose.Schema({
    name: String
})

// creating model for db
const Item = mongoose.model("Item",itemSchema);

// my object for db
const rout1 = new Item({
    name:"Woke up 7:30 pm"
})
const rout2 = new Item({
    name:"1 Hour work out before breakfast"
})
const rout3 = new Item({
    name:"get breakfast"
})
const rout4 = new Item({
    name:"work 2 hour more and get 30min cafee break"
})
const rout5 = new Item({
    name:"work 3 more hour before lunch"
})
// creating a list that consist of our items
const defaultItems = [rout1,rout2,rout3,rout4,rout5]


let day         =   new Date();
let options     =   {
    weekday:"long",
    day:"numeric",
    month:"long"
};
let currentDay = day.toLocaleDateString("us-US",options);

app.get("/",function(req,res){
    Item.find({},function(err,items){

        if(items.length === 0){
            Item.insertMany(defaultItems,function(err,items){
                if(err){
                    console.log(err);
                    res.render("index",{theDay:currentDay,newItem:myItems,workTitle:"Schedule"});
                }else{
                    console.log("succesfully update items");
                }
            })
            res.redirect("/");
        }
        else if(err){
            console.log(err);
        }
        
        res.render("index",{theDay:currentDay,newItem:items,workTitle:"Schedule"});
    }) 
})

app.get("/about",function(req,res){
    res.render("about")
})
app.post("/",function(req,res){
    let item        =   req.body.addedItem;
    let btnSend     =   req.body.submit;
    let btnDel      =   req.body.submit;
    console.log(req.body);
    if(btnSend ==="Schedule"){
        items.push(item);
        res.redirect("/");
    }
    else if(btnDel === "delSchedule"){
        items = [];
        res.redirect("/");
    }
    if(btnSend ==="Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else if(btnDel === "delWork"){
        workItems = [];
        res.redirect("/work");
    }
    
})

app.get("/work",function(req,res){
    res.render("index",{theDay:currentDay,newItem:workItems,workTitle:"Work"})
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

    if we have 2 different page like "/" is main and "/work" second page we must use only one app.post response to page and we use res.redirect 
*/