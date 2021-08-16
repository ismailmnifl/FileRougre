	// pinding the DOM element with my function
				/********************************************************************/
				window.addEventListener('load',getSpecialities);
				window.addEventListener('load',getLocations);
				window.addEventListener('load',readAllDoctors);
				document.getElementById('search').addEventListener('keyup',retreveDoctorRecomendationSearch);
				function search() {
           var inputSearchValue = document.getElementById('search').value;
            if (inputSearchValue == "") {
                document.getElementById('autocompleteList').style.display = "none";
            }else {
                document.getElementById('autocompleteList').style.display = "block";
                
                            
        		}
			}
				

				//functions are bellow
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
						console.log(data);
						data.forEach( da => {
							document.getElementById('specialities').innerHTML += `<option value="${da.speciality_id}">${da.speciality}</option>`;
						});
					})
					.catch(error => console.log('error', error));
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
						
					})
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

				fetch("http://localhost/fileRouge/doctor/retreveDoctorRecomendation", requestOptions)
				.then(response => response.text())
				.then(function(result) {

					console.log(result);
					data = JSON.parse(result);
					console.log(data);
					data.forEach( da => {
						var stars = "" ;

							for (let index = 0; index < Math.round(da.AVGstars); index++) {
								stars += '<img src="images/star.png" alt="">';
								
							}
							for (let j = 0; j < 5-Math.round(da.AVGstars); j++) {
									
									stars += '<img src="images/emptystar.png" alt="">';
							}
							document.getElementById('doctorCardSection').innerHTML +=`
							
							<div data-aos="fade-up" class="cardContainer">
							<div class="img-container">
						<img src="../uploads/${da.avatar}" alt="">
					</div>
					
					<div class="cardContent">
					<div class="cardHead">
						<a onclick="getSelectedDoctor(${da.doctorID})" href="doctorProfile.html"><p>${da.FirstName} ${da.LastName}</p></a>
						<span class="speciality">${da.speciality}</span>
					</div>
					<div class="cardData">
						<div class="description">
						<p>${da.description}</p>
						</div>
						
						<div class="rating">
						<div class="stars">
							${stars}
						</div>
						</div>
					</div>
				</div>
			</div>
							
							
							`;						
					});
				})
				.catch(error => console.log('error', error));

			}

			function getSelectedDoctor(id) {
				sessionStorage.setItem('doctorID', id);
					console.log(sessionStorage.getItem('doctorID'));
				return sessionStorage.getItem('doctorID');
			}

  			/*  function reloadPage() {
				setTimeout(function(){
					sessionStorage.clear();
				},1000);
            } */

			function fillSearchInput(id) {
				var value =  document.getElementById("element-"+id).innerHTML;
				console.log(value);
				document.getElementById('search').value = value;
        	}

			function retreveDoctorRecomendationSearch() {

				var inputSearchValue = document.getElementById('search').value;
            if (inputSearchValue == "") {
                document.getElementById('autocompleteList').style.display = "none";
            }else {
				document.getElementById('autocompleteList').style.display = "block";

				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"LastName": document.getElementById('search').value,
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/doctor/retreveDoctorRecomendationSearch", requestOptions)
				.then(response => response.text())
				.then(function(result) {
					var datasearch = JSON.parse(result);
					document.getElementById('autocompleteList').innerHTML = "";
                datasearch.forEach(element => {
                    document.getElementById('autocompleteList').innerHTML += `
                        <li onclick="fillSearchInput(${element.user_id})" id="element-${element.user_id}">${element.LastName}</li>
                    `; 
                });
				})
				.catch(error => console.log('error', error));

				}
			}
			document.getElementById('searchBtn').addEventListener('click',retreveDoctorRecomendationSearchFromInput);
			function retreveDoctorRecomendationSearchFromInput(){

				document.getElementById('autocompleteList').style.display = "none";
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"LastName": document.getElementById('search').value
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/doctor/retreveDoctorRecomendationSearchFromInput", requestOptions)
				.then(response => response.text())
				.then(function(result) {


					console.log(result);
					data = JSON.parse(result);
					console.log(data);
					document.getElementById('doctorCardSection').innerHTML = "";
					data.forEach( da => {
						var stars = "" ;

							for (let index = 0; index < Math.round(da.AVGstars); index++) {
								stars += '<img src="images/star.png" alt="">';
								
							}
							for (let j = 0; j < 5-Math.round(da.AVGstars); j++) {
									
									stars += '<img src="images/emptystar.png" alt="">';
							}
							document.getElementById('doctorCardSection').innerHTML +=`
							
							<div data-aos="fade-up" class="cardContainer">
							<div class="img-container">
						<img src="../uploads/${da.avatar}" alt="">
					</div>
					
					<div class="cardContent">
					<div class="cardHead">
						<a onclick="getSelectedDoctor(${da.doctorID})" href="doctorProfile.html"><p>${da.FirstName} ${da.LastName}</p></a>
						<span class="speciality">${da.speciality}</span>
					</div>
					<div class="cardData">
						<div class="description">
						<p>${da.description}</p>
						</div>
						
						<div class="rating">
						<div class="stars">
							${stars}
						</div>
						</div>
					</div>
				</div>
			</div>
							
							
							`;						
					});
				})
				.catch(error => console.log('error', error));
			}
			document.getElementById('specialities').addEventListener('change',retreveDoctorRecomendationFromFilterInput);
			function retreveDoctorRecomendationFromFilterInput() {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Cookie", "PHPSESSID=583002ve19ikrckojerbe97h52");

				var raw = JSON.stringify({
				"speciality_id": document.getElementById('specialities').value,
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/doctor/retreveDoctorRecomendationFromFilterInput", requestOptions)
				.then(response => response.text())
				.then(function(result) {
					console.log(result);
					data = JSON.parse(result);
					console.log(data);
					document.getElementById('doctorCardSection').innerHTML = "";
					data.forEach( da => {
						var stars = "" ;

							for (let index = 0; index < Math.round(da.AVGstars); index++) {
								stars += '<img src="images/star.png" alt="">';
								
							}
							for (let j = 0; j < 5-Math.round(da.AVGstars); j++) {
									
									stars += '<img src="images/emptystar.png" alt="">';
							}
							document.getElementById('doctorCardSection').innerHTML +=`
							
							<div data-aos="fade-up" class="cardContainer">
							<div class="img-container">
						<img src="../uploads/${da.avatar}" alt="">
					</div>
					
					<div class="cardContent">
					<div class="cardHead">
						<a onclick="getSelectedDoctor(${da.doctorID})" href="doctorProfile.html"><p>${da.FirstName} ${da.LastName}</p></a>
						<span class="speciality">${da.speciality}</span>
					</div>
					<div class="cardData">
						<div class="description">
						<p>${da.description}</p>
						</div>
						
						<div class="rating">
						<div class="stars">
							${stars}
						</div>
						</div>
					</div>
				</div>
			</div>
							
							
							`;						
					});
				})
				.catch(error => console.log('error', error));
			}