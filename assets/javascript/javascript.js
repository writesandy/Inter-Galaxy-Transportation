$( document ).ready(function() {

let tName = "";
let dest = "";
let firstDep= "";
let freq = 0;
let nextArrival = "";


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmFo2zDsDeZ-p6JWsPhBwzHLKUqc23iR4",
    authDomain: "automagical-12e81.firebaseapp.com",
    databaseURL: "https://automagical-12e81.firebaseio.com",
    projectId: "automagical-12e81",
    storageBucket: "automagical-12e81.appspot.com",
    messagingSenderId: "757412646085"
  };
  firebase.initializeApp(config);

  database = firebase.database();

 $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    let tName = $("#transport-name").val().trim();
    let dest = $("#destination").val().trim();
    let firstDep= $("#first-dep").val().trim();
    let freq = $("#frequency").val().trim();

    $("#transport-name").val("")
    $("#destination").val("");
    $("#first-dep").val("")
    $("#frequency").val("");

    database.ref().push({
        tName: tName,
        dest: dest,
        firstDep: firstDep,
        freq: freq,
        date: firebase.database.ServerValue.TIMESTAMP,
    });



 });

 function transMins () {
     database.ref().child('L8jBq6po6qFz3XcGbdC').once
 }

});