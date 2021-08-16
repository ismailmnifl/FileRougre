window.addEventListener('load',getuserReview);
window.addEventListener('load',getuserComments);
window.addEventListener('load',retreaveData);

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
            

        })
        .catch(error => console.log('error', error));

}
/************************************************************************************/
function getuserReview() {

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

    fetch("http://localhost/fileRouge/user/getuserReview", requestOptions)
    .then(response => response.text())
    .then(function(result) {
        var reviews = JSON.parse(result);
        reviews.forEach(review => {
            document.getElementById('reviewHolder').innerHTML += `
            <li class="table-row">
                    <div class="col col-1" data-label="index">${review.review_id}</div>
                    <div class=" col col-2" data-label="doctor index">${review.doctor_id}</div>
                    <div class="col col-3" data-label="stars">${review.stars}</div>
                    <div class="col col-4" data-label="date created">${review.dateCreated}</div>
                    <div class="col col-4" data-label="date created">
                        <i onclick="deleteReview(${review.review_id})" id="trash" class="fas fa-trash-alt"></i>
                        <i id="more" onclick="getSingleReview(${review.review_id})" class="fas fa-info-circle" data-bs-toggle="modal" data-bs-target="#ReviewModal"></i>
                    </div>

                    
            </li>
            `;
        });
    })
    .catch(error => console.log('error', error));
}
/****************************************************************************/
function getuserComments() {
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

    fetch("http://localhost/fileRouge/user/getuserComments", requestOptions)
    .then(response => response.text())
    .then(function(result) {
        var comments  =JSON.parse(result);
        comments.forEach(comment => {

            document.getElementById('commentsHolder').innerHTML += `
            <li class="table-row">
                    <div class="col col-1" data-label="index">${comment.comment_id}</div>
                    <div class=" col col-2" data-label="post index">${comment.post_id}</div>
                    <div class="col col-4" data-label="date created">${comment.dateCreated}</div>
                    <div class="col col-4" data-label="date created">
                        <i onclick="deleteComment(${comment.comment_id})" id="trash" class="fas fa-trash-alt"></i>
                        <i id="more" onclick="getSingleuserComments(${comment.comment_id})" class="fas fa-info-circle" data-bs-toggle="modal" data-bs-target="#CommentModal"></i>    
                    </div>
                    
            </li>
            `;

        });
    })
    .catch(error => console.log('error', error));
    
}
/*********************************************************************************/
function getSingleuserComments(id) {
    console.log(id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "user_id": sessionStorage.getItem("user_id"),
    "comment_id": id,
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/fileRouge/user/getSingleuserComments", requestOptions)
    .then(response => response.text())
    .then(function(result) {
        var commentData = JSON.parse(result);
        document.getElementById('comment').value = commentData[0].comment;
        document.getElementById('commentID').value = commentData[0].comment_id;
        
    })
    .catch(error => console.log('error', error));
    
}
/*****************************************************************************************************/
function getSingleReview(id) {
    console.log(id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "user_id": sessionStorage.getItem("user_id"),
    "review_id": id,
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/fileRouge/user/getSingleuserReview", requestOptions)
    .then(response => response.text())
    .then(function(result) {
        console.log(result);
       var reviewData = JSON.parse(result);

       document.getElementById('stars').value = reviewData[0].stars;
       document.getElementById('review').value = reviewData[0].review;
       document.getElementById('reviewID').value = reviewData[0].review_id;
       
    })
    .catch(error => console.log('error', error));
}
function deleteReview(id) {
            console.log(id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "review_id": id,
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/fileRouge/user/DeleteSingleuserReview", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    setTimeout(function(){
          location.reload();
        },250);
}

function deleteComment(id) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "comment_id": id
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/fileRouge/user/DeleteSingleuserComments", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    setTimeout(function(){
          location.reload();
        },250);
}

/********************************************************************/
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
/***********************************************************************************/
function updateComment() {

var comment = document.getElementById('comment').value;
if (comment.length<3) { 
  document.getElementById('alertSuccess').className = '';
  document.getElementById('alertSuccess').classList.add("alert-danger");
  document.getElementById('alertSuccess').classList.add("alert");
  document.getElementById('alertSuccess').style.display = "block";
}else{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "comment_id": document.getElementById('commentID').value,
  "comment": document.getElementById('comment').value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/fileRouge/user/updateUserComment", requestOptions)
  .then(response => response.text())
  .then(function(result) {
    console.log(result);
    document.getElementById('alertSuccess').className = '';
    document.getElementById('alertSuccess').classList.add("alert");
    document.getElementById('alertSuccess').classList.add("alert-success");
    document.getElementById('alertSuccess').style.display = "block";

  })
  .catch(error => console.log('error', error));

}

}

function reload() {
setTimeout(function(){
            location.reload();
        },250);
}
function updateReview() {

var comment = document.getElementById('review').value;
if (comment.length<3) { 
  document.getElementById('alertSuccessReview').className = '';
  document.getElementById('alertSuccessReview').classList.add("alert-danger");
  document.getElementById('alertSuccessReview').classList.add("alert");
  document.getElementById('alertSuccessReview').style.display = "block";
}else{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "review_id": document.getElementById('reviewID').value,
  "stars": document.getElementById('stars').value,
  "review": document.getElementById('review').value
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost/fileRouge/user/updateUserReview", requestOptions)
  .then(response => response.text())
  .then(function(result) {
    console.log(result);
    document.getElementById('alertSuccessReview').className = '';
    document.getElementById('alertSuccessReview').classList.add("alert");
    document.getElementById('alertSuccessReview').classList.add("alert-success");
    document.getElementById('alertSuccessReview').style.display = "block";

  })
  .catch(error => console.log('error', error));
}
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
}

/*************************************************************************************/


/********************************************************************/
window.addEventListener('load',getLocations);
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
