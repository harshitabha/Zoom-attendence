
//openning and closing sign in page
openSignIn = function() {
    document.getElementById("login").style.display="block";
}

closeSignIn = function() {
    document.getElementById("login").style.display="none";
}

//picking master and participant files
const master = document.getElementById("master");

chooseMaster = function() {
    document.getElementById("master").click();
}

function choosePart() 
{
    document.getElementById("participant").click();
}

function takeAttendance() {
    const fs = require("fs");
    const master = document.get
    fs.readFile()
    console.log("hello world");
}