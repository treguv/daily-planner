var tasksForTheDay = ["Event Goes Here ","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here. "];
localStorage.setItem("default", JSON.stringify(tasksForTheDay));
// display the current day at the top of the page
function setCurrentDate(){
    //Make moment object
    var time = moment();
    //set the current date
    $("#currentDay").text(time.format("MM/DD/YYYY"));
}

//Set up click listener for first row and replae p with text when clicked
$(".row").on("click",".style-event",function(){
    //Figure out which item was clicked
    //console.log($(this));
    var rowId = $(this).attr("id").replace("event-","");
    //get current text
    var target = "#event-"+ rowId+ " p";
    var currentText = $(target).text().trim();
    //make new text input field
    var textInput = $("<textarea>")
    .addClass("form-control")
    .text(currentText);
    //replace 
    $(target).replaceWith(textInput);   
    //console.log("clicked!"); 
    textInput.trigger("focus");

});

//when you click off set back to text
$(".row").on("blur", "textarea",function(){
    //get current text
    var text = $(this).val().trim();
    //console.log(text);
    //find closest row elemtn
    var targetRow = $(this).closest(".style-event")
    .attr("id").replace("event-","");
    //Set the target to the text area
    var currentTarget = "#event-" + targetRow + " textarea";
    console.dir($(currentTarget));
    //make p tag again
    var pEl = $("<p>")
    .removeClass("form-control")
    .text(text);
    //replace
    //console.log(currentTarget);
    $(currentTarget).replaceWith(pEl);
});
//Check for click of the save icon
$(".row").on("click",".save-icon",function(){
    //find the id of the row
    var targetRow = $(this).attr("id").replace("save-","");
    saveTasks(targetRow);
});
//check this every hour
var checkTimeOfTasks = setInterval(auditTime(), 3000);
//Find the time slot
function auditTime(){
    console.log("In Audit Time!");
    var currentTime =(moment().hour());
    console.log(currentTime);
    for(var i = 1; i <= 9; i++){
        var checkingHour = i + 8;
        var checkEvent = "#time-" + i + " p";
        var eventTime = ($(checkEvent).text().replace("AM","").replace("PM",""));  
        //check how far away the event is
        //if event is in the past 
        if(currentTime > checkingHour){
            $(checkEvent).closest(".style-time").addClass("past-due");
        }else if ((currentTime -checkingHour) === 0){
            $(checkEvent).closest(".style-time").addClass("on-time");
        }else if(currentTime < checkingHour){
            $(checkEvent).closest(".style-time").addClass("future");
        }
    }
}
auditTime();
//Save tasks to storage
function saveTasks(targetRow){
    //grab the row to save
    var currentEvent = "#event-" + targetRow + " p";
    //target the event
    var currentEventEl =$(currentEvent);
    //Update Text
    //console.log(currentEventEl.text());
    tasksForTheDay[(parseInt(targetRow))-1] = currentEventEl.text();
    // for (var i = 1; i < 10; i++){
    //     var currentEvent = "#event-" + i + " p";
    //     var currentEventEl =$(currentEvent);
    //     console.log(currentEventEl.text());
    //     // $(currentEventEl).text("This is elemnt " + i);
    //     if((tasksForTheDay[i]) !== currentEventEl.text()){
    //         tasksForTheDay[i-1] = currentEventEl.text();
    //     }
    // }
    localStorage.setItem("tasks",JSON.stringify(tasksForTheDay));
    //console.log(tasksForTheDay.toString());
}

//Load the tasks
function loadTasks(){
    //check if it has previously stored stuff
    //console.log(localStorage.getItem("tasks") !== null);
    if(localStorage.getItem("tasks") !== null){
        //get the array from storage
        var arrayTask = localStorage.getItem("tasks");
        //parse the JSON string
        arrayTask = JSON.parse(arrayTask);
        //Run for loop to update the text in each slot
        for (var i = 1; i < 10; i++){
            var currentEvent = "#event-" + i + " p";
            var currentEventEl =$(currentEvent);
            currentEventEl.text(arrayTask[i-1] );
            saveTasks(i);
        }
        }
    }
    //save all tasks 


//populate event fields
function fillInEvents(){
    for (var i = 1; i < 10; i++){
        var currentEvent = "#event-" + i + " p";
        var currentEventEl =$(currentEvent);
        currentEventEl.text(tasksForTheDay[i-1] );
    }
    loadTasks();
}
fillInEvents();
setCurrentDate();