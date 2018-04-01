$( document ).ready(function() {



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

    let tName = "";
    let dest = "";
    let firstDep= "";
    let freq = 0;
    let nextArrival = "";

  database = firebase.database();

 $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    let tName = $("#transport-name").val().trim();
    let dest = $("#destination").val().trim();
    let firstDep= $("#first-dep").val().trim();
    let freq = $("#frequency").val().trim();

    // clear all the text boxes

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

    //function for taking data from firebase db and showing it in DOM

    database.ref().on("child_added", function(childSnapshot, prevChildkey) {
  

        console.log(childSnapshot.val());

        let tName = childSnapshot.val().tName;
        let dest = childSnapshot.val().dest;
        let freq = childSnapshot.val().freq;
        let firstDep = childSnapshot.val().firstDep;

        if (tName === "") {

        } else {

        //First time transport runs

        let firstDepConverted = moment(firstDep, "hh:mm").subtract(1, "years");
        console.log(firstDepConverted);

        // Current Time

        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times

        let diffTime = moment().diff(moment(firstDepConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)

        let tRemainder = diffTime % freq;
        console.log(tRemainder);

        // Minutes Until Transport

        let tMinutesTillTrans = freq - tRemainder;
        console.log("MINUTES TILL TRAIN :" +tMinutesTillTrans);

        let nextArrival = moment(currentTime).add(tMinutesTillTrans, "minutes").format("hh:mm");
        console.log("TRANSPORT ARRIVAL: " +nextArrival);

        // Add data to table

        $('#trans-sched-table > tbody').append("<tr><td>" + tName + "</td><td>" + dest + "</td><td>" + freq + "</td><td>"+ nextArrival +"</td><td>" + tMinutesTillTrans)
        }

    });

 //calculate first transport time
//  first transport time + frequency = next arrival
// update first transport time to now() on arrival, then + frequency 



});