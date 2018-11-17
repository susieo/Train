$(document).ready(function () {
  
  var config = {
    apiKey: "AIzaSyDod8J1bLSMBHi2WywsM6Uyh7d1RBNpzTI",
    authDomain: "train-978c3.firebaseapp.com",
    databaseURL: "https://train-978c3.firebaseio.com",
    projectId: "train-978c3",
    storageBucket: "train-978c3.appspot.com",
    messagingSenderId: "964488472068"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

// database.ref("/trains").once("value").then(function(snapshop){
//   console.log(snapshop.val())
// })

$("#add-train").on("click", function(event) {
  
  event.preventDefault();

  trainname = $("#tname").val().trim();
  destination = $("#dest").val().trim();
  ftraintime = $("#ttime").val().trim();
  frequency = $("#freq").val().trim();
  
  
  database.ref("/trains").push({
    trainname: trainname,
    destination:destination,
    ftraintime:ftraintime,
    frequency:frequency
  });

  

});

database.ref("/trains").on("child_added", function(childSnapshot) {

  console.log(childSnapshot.val())
    
  var tname = childSnapshot.val().trainname;
  var tdestination = childSnapshot.val().destination;
  var tfrequency = childSnapshot.val().frequency;
  var tfirstTrain = childSnapshot.val().ftraintime;

  var timeArr = tfirstTrain.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  // var maxMoment = moment.max(moment(), trainTime);
  var tMinutes;
  var tArrival;

  var differenceTimes = moment().diff(trainTime, "minutes");
  var tRemainder = differenceTimes % tfrequency;
  tMinutes = tfrequency - tRemainder;
  // To calculate the arrival time, add the tMinutes to the current time
  tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  var tableRow = $("<tr>");
  tableRow.append($("<td>").text(tname));
  tableRow.append($("<td>").text(tdestination));
  tableRow.append($("<td>").text(tfrequency));
  tableRow.append($("<td>").text(tArrival));
  tableRow.append($("<td>").text(tMinutes));
  $("#tbody").append(tableRow);
});
});

