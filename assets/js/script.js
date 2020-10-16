// display the current day at the top of the page
function setCurrentDate(){
    //Make moment object
    var time = moment()
    console.log(time);
    //set the current date
    $("#currentDay").text(time.format("MM/DD/YYYY"));
}

setCurrentDate();