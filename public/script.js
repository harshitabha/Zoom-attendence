//openning and closing sign in page
openSignIn = function() {
    closeCreateAccount();
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

//Come back and try to get modal window close if there's time

//openning and closing Create Account page
openCreateAccount = function() {
    closeSignIn();
    document.getElementById("createAccountForm").style.display="block";
}

closeCreateAccount = function() {
    document.getElementById("createAccountForm").style.display="none";
}

//reading the file
var masterStr = "";
var openFile = function(event) {
    var input = event.target; 
    
    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      var node = document.getElementById('output');
      masterStr = reader.result.substring(0);
      //console.log(masterStr);
    };

    reader.readAsText(input.files[0]);
};


function takeAttendance() {
    console.log("inside take attendance");
    //convertt the master list to an array
    var index = masterStr.indexOf("\n"); //contains the index of the next line escape char
    var oldIndex = 0;
    var masterList = new Array();

    //the index of the array
    var arr = 0;

    var c = 0;
    console.log(masterStr);
    //repeat until the index is > than the string length or less than 0
    while(true)
    {
        masterList[arr] = masterStr.substring(oldIndex, index);
        
        console.log("Count: " + c + "\nIndex of line break: " + index + "\nstring added: " + masterStr.substring(oldIndex, index));

        arr++;
        oldIndex = index;
        index = masterStr.indexOf("\n", index + 1);
        if(index < 0)
        {
            masterList[arr] = masterStr.substring(oldIndex);
            break;
        }
        c++
    }

    console.log(masterList);
}



//firebase login authenitcation
var firebaseConfig = {
    apiKey: "AIzaSyB2Lw4iLbc2UtUlhUi7uZ-2OM0RAq4O8VE",
    authDomain: "zoom-attendance-cfc54.firebaseapp.com",
    projectId: "zoom-attendance-cfc54",
    storageBucket: "zoom-attendance-cfc54.appspot.com",
    messagingSenderId: "620113033126",
    appId: "1:620113033126:web:d74a0f50a8cd26e601c167",
    measurementId: "G-11Q952CYZS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();



firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in

    } else {
      // User is signed out

    }
  });


function newUser() {
    let email = document.getElementById("createEmailField").value;
    let password = document.getElementById("createPasswordField").value;
    let confirmPassword = document.getElementById("confirmCreatePasswordField").value;

    if(confirmPassword!=password) {
        document.getElementById("createPasswordField").value="";
        document.getElementById("confirmCreatePasswordField").value="";
        window.alert("Passwords do not match, please try again");
    }
    else if(password.length>=8) {
        firebase.auth().createUserWithEmailAndPassword(email, password);
        window.alert("account created!");
        //don't forget to add what happens after signing in
    } 
    else {
        document.getElementById("createPasswordField").value="";
        document.getElementById("confirmCreatePasswordField").value="";
        window.alert("Password must be at least 8 characters");
    }
}


function login() {
    let email = document.getElementById("emailField").value;
    let password = document.getElementById("passwordField").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
        document.getElementById("emailField").value="";
        document.getElementById("passwordField").value="";
        alert(error.message);
      });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById("emailField").value="";
            document.getElementById("passwordField").value="";
            alert("Signed in!");
        }
    });
  }
