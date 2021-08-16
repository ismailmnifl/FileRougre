
          /********************function calls*************************/
          window.addEventListener('load',getReviews);
          window.addEventListener('load',retreaveData);
          window.addEventListener('load',reviewPersentage);




            var StarsCount = "";

/************************************************************************************/            

            function changeImg(id) {

                for (let j = 1; j < 6; j++) {
                    var star = document.getElementById('star-'+j);
                star.src = 'images/emptystar.png';
                }
                
                for (let index = 1; index < id+1; index++) {

                var star = document.getElementById('star-'+index);
                star.src = 'images/star.png';
                    
                }
                console.log(id);
                StarsCount = id;
                console.log('stats'+StarsCount);
            }

/************************************************************************************/            
    
            function retreaveData() {

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "doctorID": sessionStorage.getItem('doctorID')
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/doctor/getSingleDoctorProfileData", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    console.log(result);
                    var data = JSON.parse(result);

                    var schedule = JSON.parse(data[0].schedule);

                    console.log(schedule);
                    for (let index = 1; index < schedule.length+1; index++) {

                      document.getElementById('start-'+index).style.backgroundColor="#34495e";
                      document.getElementById('end-'+index).style.backgroundColor="#34495e";

                      document.getElementById('start-'+index).innerHTML = schedule[index-1].startTime;
                      document.getElementById('end-'+index).innerHTML = schedule[index-1].closeTime;

                    }
                    
                    document.getElementById('avatar').src = '../uploads/'+data[0].avatar;
                    document.getElementById('lastname').innerHTML ='Dr. '+ data[0].LastName ;
                    document.getElementById('speciality').innerHTML = data[0].speciality;
                    document.getElementById('addresse').innerHTML = data[0].adresse;
                    document.getElementById('phone').innerHTML = data[0].phone;
                    document.getElementById('email').innerHTML = data[0].email;
                    document.getElementById('nReviews').innerHTML = data[0].nReviews+' customer rating';                    
                    document.getElementById('maps').src = `https://maps.google.com/maps?q=${data[0].adresse}&output=embed`;

                    console.log('AVGstars : '+data[0].AVGstars);
                    var stars = "";

                    for (let index = 0; index < Math.round(data[0].AVGstars); index++) {
								stars += '<img src="images/star.png" alt="">';
								
							}
							for (let j = 0; j < 5-Math.round(data[0].AVGstars); j++) {
									
									stars += '<img src="images/emptystar.png" alt="">';
							}

                     document.getElementById('stars').innerHTML = stars;
 
                })
                .catch(error => console.log('error', error));
            }

/************************************************************************************/            

            function insertReview() {

              var reviewText = document.getElementById('textarea1').value;

              if (reviewText == "") {

                document.getElementById('error').innerHTML ="Enter a valid review";

              }else{

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "user_id": sessionStorage.getItem("user_id"),
                "doctor_id": sessionStorage.getItem('doctorID'),
                "stars": StarsCount,
                "review": document.getElementById('textarea1').value
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/doctor/insertReview", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));

                
                
                setTimeout(function(){
                  location.reload();
                },250);
              }
            }
            
/************************************************************************************/            
            function getReviews() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "doctor_id": sessionStorage.getItem('doctorID')
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/doctor/getReviews", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    var data = JSON.parse(result);
                    
                    data.forEach( da => {
                  
                      var stars = "" ;

                      for (let index = 0; index < da.stars; index++) {
                        stars += '<img src="images/star.png" alt="">';
                        
                      }
                      for (let j = 0; j < 5-da.stars; j++) {  
                          stars += '<img src="images/emptystar.png" alt="">';
                      }
                        document.getElementById('reviews').innerHTML += `
                        
                    <div class="userReview">
                    <div class="userPart">
                        <div class="imageWrapper">
                            <img id="reviewImage" src="../uploads/${da.avatar}" alt="">
                        </div>
                        <div class="contextReview">
                            <h4> ${da.FirstName}  ${da.LastName}</h4>
                            <h5> ${da.role}</h5>
                            <p>Created at : ${da.dateCreated}</p>

                        </div>
                    </div>
                    <hr>
                    <div class="vl"></div>
                    <div class="reviewPart">
                        <div class="stars">
                            ${stars}
                    </div>
                    <div class="reviewBody">${da.review}</div>
                    </div>
                </div>
              `;

					});

                })
                .catch(error => console.log('error', error));
            }
/************************************************************************************/            
            function reviewPersentage() {
              var myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                "doctor_id": sessionStorage.getItem('doctorID')
              });

              var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
              };

              fetch("http://localhost/fileRouge/doctor/fiveStarsPersontage", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                var data = JSON.parse(result);

                  var percent_5 = Number(data.fiveStarsCount);
                  var percent_4 = Number(data.fourStarsCount);
                  var percent_3 = Number(data.threeStarsCount);
                  var percent_2 = Number(data.twoStarsCount);
                  var percent_1 = Number(data.oneStarsCount);
                  
                document.getElementById('persent_5').innerHTML = percent_5.toFixed(0)+'%';
                document.getElementById('fillable5').style.width = percent_5.toFixed(0)+'%';

                document.getElementById('persent_4').innerHTML = percent_4.toFixed(0)+'%';
                document.getElementById('fillable4').style.width = percent_4.toFixed(0)+'%';

                document.getElementById('persent_3').innerHTML = percent_3.toFixed(0)+'%';
                document.getElementById('fillable3').style.width =  percent_3.toFixed(0)+'%';

                document.getElementById('persent_2').innerHTML = percent_2.toFixed(0)+'%';
                document.getElementById('fillable2').style.width = percent_2.toFixed(0)+'%';;

                document.getElementById('persent_1').innerHTML = percent_1.toFixed(0)+'%';
                document.getElementById('fillable1').style.width = percent_1.toFixed(0)+'%';
                
                })
                .catch(error => console.log('error', error));
            }