//setting the time in the header
var today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY h:mm:ss a"));


$(document).ready(function() {
    today = moment();
    dateUpdate();
    setInterval(dateUpdate, 1000);
  });

function dateUpdate (){
today = moment();
$("#currentDay").text(today.format("MMM Do, YYYY h:mm:ss a"));
if (today.format('mm:ss')== "00:00"){
setRows();
}
};


//targeting the schedule element
var schedule = $('#schedule');

//array of times for the scheduler
var times = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17
];


//creating the rows in the scheduler
function setRows() {
for (var i =0; i < times.length; i++) {
    //creating the row for the scheduler
    var calendarRow = $('<li>');
    calendarRow.addClass('row time-block');
    //creating the hour, keeping it at 1/4 of the page, adding it to scheduler row
    var hour = $('<div>');
    hour.addClass('hour col-2');
    if (times[i]>12){
        hour.text((times[i]-12)+"pm")
    }
    else {
        hour.text(times[i]+"am");
    }
    calendarRow.append(hour);
    //creating the area to enter details, and putting it in the scheduler
    var details = $('<input type="text" name="mytext[]"/>');
    details.addClass ('col-9');
    //checking to change the color of the past present and future time slots
    if (today.format('HH') < times[i]) {
        details.addClass ('future');
    } else if (today.format('HH') > times[i]) {
        details.addClass ('past');
    } else {
        details.addClass ('present');
    }
    //checking for local storage data
    if(localStorage.getItem(hour.text())!==null){
        details.val(localStorage.getItem(hour.text()));
        }
    calendarRow.append (details);
    //creating the save button and putting it in the scheduler row
    var saveBtn = $('<button>');
    saveBtn.addClass('saveBtn hover col-1');
    saveBtn.text('Save')
    calendarRow.append(saveBtn);
    //appending the row to the schedule
    schedule.append(calendarRow);
    }
}
setRows();
$('button').on('click', function() {
    var selectedRow = $(this).parent();
    var selectedInput = selectedRow.find('input');
    var selectedTime = selectedRow.find('div');
    localStorage.setItem(selectedTime.text(), selectedInput.val());
    localStorage.setItem(selectedTime, selectedInput);
});

