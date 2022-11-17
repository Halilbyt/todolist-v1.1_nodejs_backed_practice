
module.exports.getDate = getDate;

function getDate(){
    let day         =   new Date();

    let options     =   {
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let currentDate = day.toLocaleDateString("us-US",options);
    return currentDate;
}

module.exports.getDay = getDay;

function getDay(){
    let day         =   new Date();

    let options     =   {
        weekday:"long"
    };

    let currentDay = day.toLocaleDateString("us-US",options);
    return currentDay;
}