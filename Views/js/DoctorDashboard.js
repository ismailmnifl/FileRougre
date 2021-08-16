window.addEventListener('load',retreaveData);
window.addEventListener('load',getLocations);
document.getElementById('scheduleBtn').addEventListener('click',test);
document.getElementById('resetBtn').addEventListener('click',reset);
document.getElementById('disactivateAccount').addEventListener('click',deleteDoctor);

function deleteDoctor() {
  if(confirm('Are you sure you want to delete your account')) {

      var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "doctor_id": sessionStorage.getItem('doctorIndex'),
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/doctor/DeleteDoctor", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  setTimeout(function(){

      window.location.href = "index.html";
  },500);
          }
          else {

          }
  
}

function test() {
var daysList = document.getElementById('days');
var startTime = document.getElementById('startTime');
var closeTime = document.getElementById('closeTime');
var displaySchedule = document.getElementById('displaySchedule');
if (daysList.options[daysList.selectedIndex] != undefined) {

console.log(daysList.options[daysList.selectedIndex].value+' from '+startTime.value+' to '+closeTime.value);
displaySchedule.innerHTML+= daysList.options[daysList.selectedIndex].value+' from '+startTime.value+' to '+closeTime.value+' / ';

    var object = {
      day : daysList.options[daysList.selectedIndex].value,
      startTime : startTime.value,
      closeTime : closeTime.value
    };

    arraySchedule.push(object);
    
daysList.options[daysList.selectedIndex].remove();
}
}
/***********************************************************************************/
function retreaveData() {
var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "user_id": sessionStorage.getItem("user_id")
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/user/readSingleUser", requestOptions)
  .then(response => response.text())
  .then(function(result) {

      userData  = JSON.parse(result);
      document.getElementById('name').innerHTML =userData.FirstName+' '+userData.LastName;
      document.getElementById('phone').innerHTML = userData.phone;
      document.getElementById('email').innerHTML = userData.email;
      document.getElementById('age').innerHTML = userData.age;
      document.getElementById('adress').innerHTML = userData.adresse;
      document.getElementById('username').innerHTML = userData.username;
      document.getElementById('password').innerHTML = userData.password;
      document.getElementById('avatar').src = `../uploads/${userData.avatar}`;
      document.getElementById('navbarimage').src = `../uploads/${userData.avatar}`;

      

  })
  .catch(error => console.log('error', error));

}
document.getElementById('logoutDashboard').addEventListener('click',logout);
function logout() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/auth/logout", requestOptions)
  .then(response => response.text())
  .then(function(result) {
    console.log(result);
    window.location.href = "index.html"	
  })
  .catch(error => console.log('error', error));
  sessionStorage.removeItem('user_id');
  sessionStorage.removeItem('role');
}

/************************************************************************************/
function getDoctorPosts(id) {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"doctor_id": id
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost/fileRouge/doctor/getDoctorPosts", requestOptions)
.then(response => response.text())
.then(function(result) {
  console.log(result);
  var posts = JSON.parse(result);

  posts.forEach(post => {
      document.getElementById('doctorsPost').innerHTML += `
      <li class="table-row">
              <div class="col col-1" data-label="Avatar">
                   <div id="imageWrapper">
                      <img src="../uploads/${post.image}" alt="">
                      </div>
                  
                  </div>
              <div class=" col col-2" data-label="Title">${post.title}</div>
              <div class="col col-3" data-label="Reaction">${post.dislikeControle}</div>
              <div class="col col-4" data-label="Comment">${post.commentControle}</div>
              <div class="col col-4" data-label="Date created">${post.dateCreated}</div>
              <div class="col col-4" data-label="Actions">
                  <i onclick="deletePost(${post.post_id})" id="trash" class="fas fa-trash-alt"></i>
                  <i id="more" onclick="singlePost(${post.post_id})" class="fas fa-info-circle" data-bs-toggle="modal" data-bs-target="#PostModal"></i>
              </div>

              
      </li>
      `;
  });
})
.catch(error => console.log('error', error));
}

window.addEventListener('load',getDoctorIdnformation);
function getDoctorIdnformation() {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"user_id": sessionStorage.getItem("user_id")
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost/fileRouge/user/isUserDoctor", requestOptions)
.then(response => response.text())
.then(function(result) {

  console.log(result);
  doctorInfos = JSON.parse(result);
  sessionStorage.setItem('doctorIndex',doctorInfos[0].doctor_id);
  console.log('doctor id : '+sessionStorage.getItem('doctorIndex'));
  getDoctorPosts(doctorInfos[0].doctor_id);
})
.catch(error => console.log('error', error));
}

function readSingleUser() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "user_id": sessionStorage.getItem("user_id"),
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/user/readSingleUser", requestOptions)
  .then(response => response.text())
  .then(function(result) {

      userProfileData  = JSON.parse(result);
   
      document.getElementById('Muser_id').value = userProfileData.user_id;
      document.getElementById('MFirstName').value = userProfileData.FirstName;
      document.getElementById('MLastName').value = userProfileData.LastName;
      document.getElementById('Mphone').value = userProfileData.phone;
      document.getElementById('Memail').value = userProfileData.email;
      document.getElementById('Mage').value = userProfileData.age;
      document.getElementById('Madresse').value = userProfileData.adresse;
      document.getElementById('Musername').value = userProfileData.username;
      document.getElementById('Mpassword').value = userProfileData.password;
      

  })
  .catch(error => console.log('error', error));
}

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
document.getElementById('Mlocations').innerHTML += `<option value="${da.location_id}">${da.location}</option>`;
});

})
.catch(error => console.log('error', error));
}

function deletePost(id) {
  if(confirm('Are you sure you want to delete your account')) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
      "post_id": id
      });

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
      };

      fetch("http://localhost/fileRouge/post/deletePost", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

      reloadPage();

  }
  }

//reload the page at command
function reloadPage() {
  setTimeout(function(){
      location.reload();
  },250);
}

function readSingleDoctor() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "doctor_id": sessionStorage.getItem('doctorIndex'),
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/doctor/readSingleDoctor", requestOptions)
  .then(response => response.text())
  .then(function(result) {

      console.log(result);
      doctorData = JSON.parse(result);
      var toDisplay = "";
      var schedule = JSON.parse(doctorData.schedule);
      console.log(schedule);
      schedule.forEach( sh => {
          toDisplay += sh.day +' from '+sh.startTime+' to '+ sh.closeTime +' / ';
      }); 
      document.getElementById('matricule').value = doctorData.matricule;
      document.getElementById('description').value = doctorData.description;
      document.getElementById('displaySchedule').value =JSON.stringify(toDisplay);
      document.getElementById('doctor_id').value = doctorData.doctor_id;
      
      
      

  })
  .catch(error => console.log('error', error));
}

  /********************************************************************/
window.addEventListener('load',getSpecialities);

function getSpecialities() {

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var requestOptions = {
method: 'POST',
headers: myHeaders,
redirect: 'follow'
};
fetch("http://localhost/fileRouge/user/getAllSpecialites", requestOptions)
.then(response => response.text())
.then(function(result) {
  //console.log(result);
  var data = JSON.parse(result);
  data.forEach( da => {
      document.getElementById('speciality').innerHTML += `<option value="${da.speciality_id}">${da.speciality}</option>`;
  });
})
.catch(error => console.log('error', error));
}
window.addEventListener('load', reset);

//array of object 
var arraySchedule = [];

function reset() {
  //arraySchedule = [];
  document.getElementById('displaySchedule').innerHTML = "";
  //console.log(arraySchedule);
   
  document.getElementById('days').innerHTML = `
  <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday ">Saturday </option>
    <option value="Sunday">Sunday</option>`;
}

/********************************************************************/
function uploadImage() {

  var formData = new FormData();
  var imgFile = document.getElementById('Mavatar').files[0];
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
  /********************************************************************/

  function updateUser() {

  var uniqName = uploadImage();
  
  document.getElementById('updateduser').style.display = "block";
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "user_id": document.getElementById('Muser_id').value,
  "location_id": document.getElementById('Mlocations').value,
  "FirstName": document.getElementById('MFirstName').value,
  "LastName": document.getElementById('MLastName').value,
  "phone": document.getElementById('Mphone').value,
  "email": document.getElementById('Memail').value,
  "password": document.getElementById('Mpassword').value,
  "age": document.getElementById('Mage').value,
  "username": document.getElementById('Musername').value,
  "adresse": document.getElementById('Madresse').value,
  "avatar": uniqName
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/user/updateUser", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  setTimeout(function(){
    location.reload();
  },250);
  }

/*************************************************************************************/
function updateDoctor() {

    

document.getElementById('updatedoctor').style.display = "block";
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"doctor_id": document.getElementById('doctor_id').value,
"matricule": document.getElementById('matricule').value,
"description": document.getElementById('description').value,
"schedule": JSON.stringify(arraySchedule)
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost/fileRouge/doctor/updateDoctor", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

reloadPage();
}

/********************************************************************/
function singlePost(id) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
  "post_id": id
  });

  var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
  };

  fetch("http://localhost/fileRouge/post/selectSingpost", requestOptions)
  .then(response => response.text())
  .then(function(result) {
      console.log('***************************************');
      console.log(result);
      var postDataForUpdate = JSON.parse(result);

      document.getElementById('postimage').src = `../uploads/${ postDataForUpdate[0].image}`;
      document.getElementById('title').value = postDataForUpdate[0].title;
      document.getElementById('postID').value = postDataForUpdate[0].post_id;
      
      CKEDITOR.instances.content.setData(postDataForUpdate[0].body);
      
      document.getElementById('source').value = postDataForUpdate[0].resources;
  })
  .catch(error => console.log('error', error));
}




function uploadNewPostImage() {

    var formData = new FormData();
    var imgFile = document.getElementById('postavatar').files[0];
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


function updatePost() {

    var uniqName = uploadNewPostImage();
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "post_id": document.getElementById('postID').value,
  "title": document.getElementById('title').value,
  "body": CKEDITOR.instances.content.getData(),
  "resources": document.getElementById('source').value,
  "dislikeControle": document.getElementById('likeControle').value,
  "commentControle": document.getElementById('comControle').value,
  "image": uniqName
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/fileRouge/post/updateSingePost", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  reloadPage();
}


function reloadPage() {
    setTimeout(function(){
        location.reload();
    },250);
}