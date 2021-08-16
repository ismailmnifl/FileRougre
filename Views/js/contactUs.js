document.getElementById('sendDataBtn').addEventListener('click',submitContactUSMessage);

function submitContactUSMessage() {

    if (!validateForm(regexObj)) {
        return;
    }
       
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "message": document.getElementById('message').value,
    "userName":document.getElementById('fullname').value,
    "phone": document.getElementById('phone').value,
    "email": document.getElementById('email').value,
    "subject": document.getElementById('subject').value,
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/fileRouge/user/insertContactMessage", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    document.getElementById('messageerror').style.display = "block";
    document.getElementById('messageerror').innerHTML = "registration complaite";
    document.getElementById('messageerror').style.display ="block";
    document.getElementById('messageerror').classList.remove("alert-danger");
     document.getElementById('messageerror').classList.add("alert-success");
}


var regexObj = {
    'fullname' : {
        regex: /^.{3,}$/,
        error: 'fullname must contain at least 3 characteres'
    },
    'phone' : {
         regex: /^\+?[0-9]{8,13}$/,
         error: 'Please Enter a valid Phone number'
    },
     'email': {
        regex: /^[^@]+@[^@]+\.[^@]+$/,
        error: 'Please Enter a valid Phone email'
    },
     'subject': {
        regex: /^.{3,}$/,
        error: 'the subject must contain at least 3 characteres'
     },
     'message': {
        regex: /^.{3,}$/,
        error: 'the message must contain at least one word long'
     }
};

function validateForm(regexObj) {

     for(var id in regexObj) {
         // console.log(regexObj[id], typeof regexObj[id]);
         var value = document.getElementById(id).value;
         var regex = regexObj[id].regex;
         var error = regexObj[id].error;

         if( !regex.test(value)) {

             document.getElementById('messageerror').innerHTML = error;
             document.getElementById('messageerror').classList.remove("alert-success");
             document.getElementById('messageerror').classList.add("alert-danger");
             document.getElementById('messageerror').style.display = "block";
             
             console.log(id , error);
             return false;
         }
     }

     return true;
}
