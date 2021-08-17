 /* function calls start */

 window.addEventListener('load', getLocations);
 document.getElementById('sendDataBtn').addEventListener('click', insertUser);
 //document.getElementById('redirectbtn').addEventListener('click',redirect)
 function redirect() {
   var role = document.getElementById('role').value;
  if (role == "Doctor") {
   //window.location.replace("doctorRegister.html");
   window.location.href = "doctorRegister.html";
  }
     
 }

 /* function calls end */

 /* functions start */
 function getLocations() {
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     redirect: 'follow'
   };

   fetch("http://localhost/fileRouge/user/getAllLocation", requestOptions)
     .then(response => response.text())
     .then(function(result) {

       var data = JSON.parse(result);

       data.forEach( da => {
         document.getElementById('locations').innerHTML += `<option value="${da.location_id}">${da.location}</option>`;
       });
       
     })
     .catch(error => console.log('error', error));
 }

 function uploadImage() {

   var formData = new FormData();
   var imgFile = document.getElementById('avatar').files[0];
   if(imgFile === undefined) 
     return null;

   var ext = imgFile.name.split('.').pop();
   var uniqName = Math.floor(Math.random()*Math.pow(10,10)).toString() + '.' + ext;
   formData.append('uniqName', uniqName);
   formData.append('avatar', imgFile);
   // console.log(...formData);

   fetch("http://localhost/fileRouge/Includes/upload.php", {
     method: "post",
     body: formData

   }).catch(console.error);

   return uniqName;
 }
   
 function insertUser() {


    if (!validateForm(regexObj)) {
        return;
    }

   var uniqName = uploadImage();

   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");

   var formElements = document.forms['registerForm'].elements;
   var dataObj = {};

   for (var i = 0; i < formElements.length; i++) {
     //uploadImage
     element = formElements[i];
     if(element.type == "file") {
       
       dataObj[element.name] = uniqName ? uniqName : 'defaultAvatar.png';
       continue;
     }
     dataObj[element.name] = element.value;
   }
   
   var raw = JSON.stringify(dataObj);

   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
   };

   fetch("http://localhost/fileRouge/user/insertUser", requestOptions)
     .then(response => response.text())
     .then(function(result) {
       console.log(result);
       document.getElementById('alertSuccess').innerHTML = "registration complaite";
       document.getElementById('alertSuccess').style.display ="block";
       document.getElementById('alertSuccess').classList.remove("alert-danger");
        document.getElementById('alertSuccess').classList.add("alert-success");

       setTimeout(function(){
        redirect();
      },2000);
     })
     .catch(error => console.log('error', error));


 }

   
   var regexObj = {
       'FirstName' : {
           regex: /^.{3,}$/,
           error: 'FirstName must contain at least 3 characteres'
       },
       'LastName' : {
            regex: /^.{3,}$/,
            error: 'LastName must contain at least 3 characteres'
       },
        'phone': {
            regex: /^\+?[0-9]{8,13}$/,
            error: 'Please Enter a valid Phone number'
       },
        'email': {
            regex: /^[^@]+@[^@]+\.[^@]+$/,
            error: 'Please Enter a valid Phone email'
        },
        'age': {
            // regex: /^[0-9]{2}$/,
            regex: /^1[89]|[2-9][0-9]$/,
            error: 'you have to be 18 years to register'
        },
        'adresse': {
            regex: /^.{6,}$/,
            error: 'Please Enter a valid address'
        },
        'username': {
            regex: /^.{4,}$/,
            error: 'username must contain at least 4 characteres'
        },
        'password': {
            regex: /^.{4,}$/,
            error: 'password must contain at least 4 characteres'
        }

   };

   function validateForm(regexObj) {

        for(var id in regexObj) {
            // console.log(regexObj[id], typeof regexObj[id]);
            var value = document.getElementById(id).value;
            var regex = regexObj[id].regex;
            var error = regexObj[id].error;

            if(!regex.test(value)) {

                document.getElementById('alertSuccess').innerHTML = error;
                document.getElementById('alertSuccess').classList.remove("alert-success");
                document.getElementById('alertSuccess').classList.add("alert-danger");
                document.getElementById('alertSuccess').style.display = "block";
                
                console.log(id , error);
                return false;
            }
        }

        return true;
   }

//    validateForm(regexObj);

     /* regix part */

