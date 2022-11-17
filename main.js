const date = require(__dirname+"/date.js");

let currentDay  = date.getDay();
let currentDate = date.getDate();

console.log("Current Day => "+currentDay);
console.log("Current Date => "+currentDate);