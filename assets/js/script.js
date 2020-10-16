var tasksForTheDay = ["Event Goes Here ","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here","Event Goes Here. "];

// display the current day at the top of the page
function setCurrentDate(){
    //Make moment object
    var time = moment();
    //set the current date
    $("#currentDay").text(time.format("MM/DD/YYYY"));
}

//Set up click listener for first row and replae p with text when clicked
$(".event-1").on("click",function(){
    //get current text
    var currentText = $(".event-1 p").text().trim();
    //make new text input field
    var textInput = $("<textarea>")
    .addClass("form-control ")
    .text(currentText);
    //replace 
    $(".event-1 p").replaceWith(textInput);
    console.log("clicked!"); 

});

//when you click off set back to text
$(".event-1").on("blur", "textarea",function(){
    //get current text
    console.log("blured text area");
    var currentText = $(".event-1 textarea").text().trim();
    //make p tag again
    var pEl = $("<p>")
    .removeClass("form-control")
    .text(currentText);
    //replace
    $(".event-1 textarea").replaceWith(pEl);
});

$(".event-2").on("click",function(){
    //get current text
    var currentText = $(".event-2 p").text().trim();
    //make new text input field
    var textInput = $("<textarea>")
    .addClass("form-control ")
    .text(currentText);
    //replace 
    $(".event-2 p").replaceWith(textInput);
    console.log("clicked!"); 

});

//when you click off set back to text
$(".event-2").on("blur", "textarea",function(){
    //get current text
    console.log("blured text area");
    var currentText = $(".event-2 textarea").text().trim();
    //make p tag again
    var pEl = $("<p>")
    .removeClass("form-control")
    .text(currentText);
    //replace
    $(".event-2 textarea").replaceWith(pEl);
});
//Save tasks to storage
function saveTasks(){
    for (var i = 1; i < 10; i++){
        var currentEvent = "#event-" + i + " p";
        var currentEventEl =$(currentEvent);
        console.log(currentEventEl.text());
        // $(currentEventEl).text("This is elemnt " + i);
        if((tasksForTheDay[i]) !== currentEventEl.text()){
            tasksForTheDay[i-1] = currentEventEl.text();
        }
    }
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
}
fillInEvents();
setCurrentDate();