
			//pinding DOM element to my functions

			window.addEventListener('load',getUserData);
			window.addEventListener('load',getLocations);
			window.addEventListener('load',readAllDoctors);
			window.addEventListener('load', reset);
			window.addEventListener('load', getSpecialities);
            window.addEventListener('load',getAllpost);
			document.getElementById('resetBtn').addEventListener('click',reset);
			document.getElementById('scheduleBtn').addEventListener('click',test);
			document.getElementById('exitDoctorModel').addEventListener('click',reloadPage);
			document.getElementById('exitUserModel').addEventListener('click',reloadPage);
			document.getElementById('logoutDashboard').addEventListener('click',logout);
            


			//reload the page at command
			function reloadPage() {
				setTimeout(function(){
					location.reload();
				},250);
			}


/********************************************************************/
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
/********************************************************************/

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
					data.forEach( da => {
					document.getElementById('locationSettings').innerHTML += `<option value="${da.location_id}">${da.location}</option>`;
					});
					
				})
				.catch(error => console.log('error', error));
			}

/********************************************************************/

			function getUserData() {

				var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			redirect: 'follow'
			};

			fetch("http://localhost/fileRouge/user/getAllUsers", requestOptions)
			.then(response => response.text())
			.then(function(result) {
				console.log(result);
									 
				var userData = JSON.parse(result);
				userData.forEach( da => {
					
          		document.getElementById('DataHolder').innerHTML += `
				  					<li class="table-row">
										<div class="col col-1" data-label="avatar"><img style="max-width: 50px; max-height: 70px;" src="../uploads/${da.avatar}" alt=""></div>
										<div class="col col-2" data-label="role">${da.role}</div>
										<div class="col col-3" data-label="username">${da.username}</div>
										<div class="col col-4" data-label="phone">${da.phone}</div>
										<div style="text-align:center;" class="col col-6" data-label="More">	
											<i style="color:red;" onclick="deleteUser(${da.user_id})" class="fas fa-trash-alt fa-2x"></i>
											<i style="color:#0188DF;margin-left:10px" data-bs-toggle="modal" data-bs-target="#exampleModal1" onclick="readSingleUser(${da.user_id})" class="fas fa-info-circle fa-2x"></i>

											</div>
									</li>
				  	`;
				});  
			})
			.catch(error => console.log('error', error));
			}

/********************************************************************/


			function deleteUser(id) {
				if(confirm('Are you sure you want to delete your account')) {
					
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"user_id": id
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/user/DeleteUser", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

				setTimeout(function(){
					location.reload();
				},500);
				}

			}
/********************************************************************/
			function readSingleUser(id) {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"user_id": id
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
					console.log(userData);
					document.getElementById('user_id').value = userData.user_id;
					document.getElementById('FirstName').value = userData.FirstName;
					document.getElementById('LastName').value = userData.LastName;
					document.getElementById('phone').value = userData.phone;
					document.getElementById('email').value = userData.email;
					document.getElementById('age').value = userData.age;
					document.getElementById('adresse').value = userData.adresse;
					document.getElementById('username').value = userData.username;
					document.getElementById('password').value = userData.password;

				})
				.catch(error => console.log('error', error));
			}
/********************************************************************/

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
/********************************************************************/

			function updateUser() {

				var uniqName = uploadImage();

				document.getElementById('updateduser').style.display = "block";
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"user_id": document.getElementById('user_id').value,
				"location_id": document.getElementById('locations').value,
				"FirstName": document.getElementById('FirstName').value,
				"LastName": document.getElementById('LastName').value,
				"phone": document.getElementById('phone').value,
				"email": document.getElementById('email').value,
				"password": document.getElementById('password').value,
				"age": document.getElementById('age').value,
				"username": document.getElementById('username').value,
				"adresse": document.getElementById('adresse').value,
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

/********************************************************************/

			function readAllDoctors() {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/doctor/ReadAllDoctors", requestOptions)
				.then(response => response.text())
				.then(function(result) {
					doctorData = JSON.parse(result);
					
								   var varlidation;
					doctorData.forEach( da => {
						if (da.validated==null) {
							varlidation = `<button onclick='validateDoctor(${da.doctor_id})' class='button' style='background-color:red;''>Unvalid</button>`;
						}else {
							varlidation = "<button class='button' style='background-color:green;''>Validated</button>";

						}

				document.getElementById('doctorDataHolder').innerHTML += `
								<li class="table-row">
									<div class="col col-1" data-label="Job Id">${da.user_id}</div>
									<div class="col col-2" data-label="Customer Name">${da.speciality_id}</div>
									<div class="col col-3 matricule" data-label="Amount">${da.matricule}</div>
									<div class="col col-4" data-label="Validation">${varlidation}</div>
									<div style="text-align:center;" class="col col-3" data-label="Action">
										<i style="color:red;margin-right:10px" onclick="deleteDoctor(${da.doctor_id})" class="fas fa-trash-alt fa-2x"></i>
										<i style="color:#0188DF;" data-bs-toggle="modal" data-bs-target="#exampleModal2" onclick="readSingleDoctor(${da.doctor_id})" class="fas fa-info-circle fa-2x"></i>


									</div>
								
								</li>
						`;
					});
				})
				.catch(error => console.log('error', error));
			}
/********************************************************************/

			function deleteDoctor(id) {
				if(confirm('Are you sure you want to delete this doctor')) {
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

				fetch("http://localhost/fileRouge/doctor/DeleteDoctor", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

				setTimeout(function(){
					location.reload();
				},500);
				}else {

				}
				
			}

/********************************************************************/

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

/********************************************************************/

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
			}

/********************************************************************/

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
					data.forEach( da => {
						document.getElementById('specialitySettings').innerHTML += `<option value="${da.speciality_id}">${da.speciality}</option>`;
					});
				})
				.catch(error => console.log('error', error));
    		}

/********************************************************************/

			function readSingleDoctor(id) {
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

			function validateDoctor(id) {
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

				fetch("http://localhost/fileRouge/doctor/validateDoctor", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));
				setTimeout(function(){
					location.reload();
				},250);
			}

			function deleteLocation(id) {
				
			}

			function deleteSpeciality() {

				
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"speciality_id": document.getElementById('specialitySettings').value
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/user/DeleteSpeciality", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

				reloadPage();
			}
			function addLocation() {

				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"location": document.getElementById('locationAddition').value
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/user/addLocation", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

				reloadPage();
			}

			function addSpeciality() {
				
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"speciality": document.getElementById('specialityAddition').value
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/user/addSpeciality", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

				reloadPage();
			}
			window.addEventListener('load',getContactMessage);
			function getContactMessage() {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/user/getContactMessage", requestOptions)
				.then(response => response.text())
				.then(function(result) {
					console.log(result);
					var messages = JSON.parse(result);
					
					messages.forEach( message => {
						document.getElementById('messageHolder').innerHTML += `
						<div class="message">
									<div class="namewrapper">
										<div class="name">
										<div id="full" class="full">${message.userName}</div>
										<div class="theX">
											<i onclick="deleteMessages(${message.contact_id})" id="theX" class="fas fa-minus-circle"></i>
										</div>
									</div></div>
									
									<div class="email">
									<span>Email : </span><span id="messageemail">${message.email}</span></div>
									<div id="messagephone" class="phone">${message.phone}</div>
									<div class="subject">
										<span>subject : </span><span id="subject">${message.subject}</span>
									</div>
									<hr>
									<div id="body" class="body">${message.message}</div>
									
									<div id="date" class="createAt">${message.dateCreated}</div>
								</div>
						`;
					}); 

				})
				.catch(error => console.log('error', error));
			}

			function deleteMessages(id) {

				if(confirm('Are you sure you want to delete this message')) {
					var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"contact_id": id
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/user/deleteContactMessage", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

				reloadPage();
				}
				
			}

            function getAllpost() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/getAllpostAdmin", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    console.log(result);
  var posts = JSON.parse(result);

  posts.forEach(post => {
      document.getElementById('doctorsPost').innerHTML += `
      <li class="table-row">
              <div class="col col-1" data-label="Avatar">
                   <div id="imageWrapper">
                      <img  width="50px" height="50px" src="../uploads/${post.image}" alt="">
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
    window.addEventListener('load',dashSatats);
    function dashSatats() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost/fileRouge/user/dashstats", requestOptions)
        .then(response => response.text())
        .then(function(result) {
            var dashstats = JSON.parse(result);
            document.getElementById('userCount').innerHTML = dashstats.userCount;
            document.getElementById('doctorCount').innerHTML = dashstats.doctorCount;
            document.getElementById('postCount').innerHTML = dashstats.postCount;
            document.getElementById('messageCount').innerHTML = dashstats.messageCount;
            
        })
        .catch(error => console.log('error', error));
    }

    window.addEventListener('load',stats);

    function stats() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
        };

        fetch("http://localhost/fileRouge/user/stats", requestOptions)
        .then(response => response.text())
        .then(function(result) {

            var xValues = [];
            var yValues = [];
            var xValuesline = [];
            var yValuesline = [];
            var stats = JSON.parse(result);

            stats.forEach( stat => {
                xValues.push(stat.LastName);
                yValues.push(stat.starcount);

                xValuesline.push(stat.LastName);
                yValuesline.push(stat.starcount);
                

            });
            new Chart("ChartJS1", {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [{
                    backgroundColor: "#0188DF",
                    data: yValues
                  }]
                },
                options: {
                  legend: {display: false},
                  title: {
                    display: true,
                    text: "World Wine Production 2018"
                  },
                  scales: {
                    yAxes: [{ticks: {min: 6, max:30}}],
                    }
                }
              });
              new Chart("ChartJS2", {
                type: "line",
                data: {
                    labels: xValuesline,
                    datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValuesline,
                    }]
                },
                options: {
                    legend: {display: false},
                    scales: {
                    yAxes: [{ticks: {min: 6, max:30}}],
                    }
                }
                }); 
            
            console.log(stats);
        })
        .catch(error => console.log('error', error));
    }
    // chart js 
						

    