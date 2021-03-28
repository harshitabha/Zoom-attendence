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
var openFileM = function(event) {
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

var partStr = "";
var openFileP = function(event) {
    var input = event.target; 
    
    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      var node = document.getElementById('output');
      partStr = reader.result.substring(0);
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

    //repeat until the index is > than the string length or less than 0
    while(true)
    {
        masterList[arr] = masterStr.substring(oldIndex, index);

        arr++;
        oldIndex = index;
        index = masterStr.indexOf("\n", index + 1);
        if(index < 0)
        {
            masterList[arr] = masterStr.substring(oldIndex);
            break;
        }
    }

    //convertt the participant list to an array
    var iPart = partStr.indexOf("\n"); //contains the index of the next line escape char
    var oldIP = 0;
    var partList = new Array();

    //the index of the array
    var partIndex = 0;

    //repeat until the index is > than the string length or less than 0
    while(true)
    {
        partList[partIndex] = partStr.substring(oldIP, iPart);

        partIndex++;
        oldIP = iPart;
        iPart = partList.indexOf("\n", iPart + 1);
        if(iPart < 0)
        {
            masterList[partIndex] = partStr.substring(oldIP);
            break;
        }
    }

    //comparing the lists
    var missing = new Array();
    var missingIndex = 0;
    for(var m = 0; m < masterList.length; m++)
    {
        //if the current element from the master list is not in the participant 
        //list add it to the missing people list
        if(!partList.includes(masterList[m]))
        {
            missing[missingIndex] = masterList[m];
            missingIndex++;
        }
    }

    console.log("Now add the missing children");
    //add the missing info on to the website
    document.getElementById("missing").style.display="block";
    

    for(var i = 0; i < missing.length; i++)
    {
        var ul = document.getElementById("missingPeople");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(missing[i]));
        ul.appendChild(li);

        /*var element = document.getElementById("div1");
        element.appendChild(para);*/
    }


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
