// Initialize firebase
var config = {
  apiKey: "AIzaSyBlH5qBxr5Q3z2JbR60gAOdytnbAPzXKLE",
  authDomain: "fir-hw-cbe74.firebaseapp.com",
  databaseURL: "https://fir-hw-cbe74.firebaseio.com",
  projectId: "fir-hw-cbe74",
  storageBucket: "fir-hw-cbe74.appspot.com",
  messagingSenderId: "987013667134"
};
firebase.initializeApp(config);

// Assign a reference to the database to a variable named "database"
var database = firebase.database();


// capture button click
$(".submitButton").on("click", function(event){
  event.preventDefault();

  train = $(".train-input").val().trim();
  destination = $(".destination-input").val().trim();
  firstTrain = $(".firstTrain-input").val().trim();
  frequency = $(".frequency-input").val().trim();

  database.ref().push({

    train: train,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

  });

  $(".train-input").val("");
  $(".destination-input").val("");
  $(".firstTrain-input").val("");
  $(".frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot){

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;
  var firstTimeConverted = moment(firstTrain, "HH:mmA").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesTillArrival = frequency - tRemainder;
  var nextTrain = moment().add(minutesTillArrival, "minutes");

console.log("train name: " + train);
console.log("destination: " + destination);
console.log("first train time: " + firstTrain);
console.log("frequency: " + frequency);
console.log("first time converted: " + firstTimeConverted);
console.log("current time: " + moment(currentTime).format("hh:mmA"));
console.log("difference in time: " + diffTime);
console.log("time remainder: " + tRemainder);
console.log("minutes till arrival: " + minutesTillArrival);
console.log("arrival: " + moment(nextTrain).format("hh:mmA"));

$(".train-name").append("<li>" + childSnapshot.val().train + "</li>" + "<br>");
$(".destination-name").append("<li>" + childSnapshot.val().destination + "</li>" + "<br>");
$(".frequency-time").append("<li>" + childSnapshot.val().frequency + "</li>" + "<br>");
$(".next-arrival").append("<li>" + moment(nextTrain).format("hh:mmA") + "</li>" + "<br>");
$(".minutes-away").append("<li>" + minutesTillArrival + "</li>" + "<br>")

}, function(errorObject){
  console.log("Errors Handled: " + errorObject.code);
});