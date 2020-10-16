var tasksForTheDay = ["Event Goes Here ","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here. "];

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
    console.log("clicked!"); 
    textInput.trigger("focus");

});

//when you click off set back to text
$(".row").on("blur", "textarea",function(){
    //get current text
    var text = $(this).val().trim();
    console.log(text);
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
    console.log(currentTarget);
    $(currentTarget).replaceWith(pEl);
});
//Check for click of the save icon
$(".row").on("click",".save-icon",function(){
    //find the id of the row
    var targetRow = $(this).attr("id").replace("save-","");
    saveTasks(targetRow);
});
//Save tasks to storage
function saveTasks(targetRow){
    //grab the row to save
    var currentEvent = "#event-" + targetRow + " p";
    //target the event
    var currentEventEl =$(currentEvent);
    //Update Text
    console.log(currentEventEl.text());
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
    console.log(tasksForTheDay.toString());
}

//Load the tasks
function loadTasks(){
    //get the array from storage
    var arrayTask = localStorage.getItem("tasks");
    //parse the JSON string
    arrayTask = JSON.parse(arrayTask);
    //Run for loop to update the text in each slot
    for (var i = 1; i < 10; i++){
        var currentEvent = "#event-" + i + " p";
        var currentEventEl =$(currentEvent);
        currentEventEl.text(arrayTask[i-1] );
    }
    saveTasks();
}

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