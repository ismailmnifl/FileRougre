
      // function calls 
      window.addEventListener('load', getSpecialities);
      window.addEventListener('load', reset);
  
      document.getElementById('scheduleBtn').addEventListener('click',test);
      document.getElementById('resetBtn').addEventListener('click',reset);
      document.getElementById('sendDataBtn').addEventListener('click',insertDoctorData);
      
      
      //array of object 
      var arraySchedule = [];
  
                function reset() {
                  arraySchedule = [];
                  document.getElementById('displaySchedule').innerHTML = "";
                  console.log(arraySchedule);
                  
                  document.getElementById('days').innerHTML = `
                  <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday ">Saturday </option>
                    <option value="Sunday">Sunday</option>`;
  
                }
      function test() {
        var daysList = document.getElementById('days');
        var startTime = document.getElementById('startTime');
        var closeTime = document.getElementById('closeTime');
        var displaySchedule = document.getElementById('displaySchedule');
          if (daysList.options[daysList.selectedIndex] != undefined) {
  
              console.log(daysList.options[daysList.selectedIndex].value+' from '+startTime.value+' to '+closeTime.value);
          
              displaySchedule.innerHTML+= daysList.options[daysList.selectedIndex].value+' from '+startTime.value+' to '+closeTime.value+' / ';
  
              console.log('length : '+daysList.length);
  
                    var object = {
                      day : daysList.options[daysList.selectedIndex].value,
                      startTime : startTime.value,
                      closeTime : closeTime.value
                    };
  
                    arraySchedule.push(object);
                    
              daysList.options[daysList.selectedIndex].remove();
              console.log(arraySchedule);
          }
      }
      //load dotor specialities from database 
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
  
      //insert doctor to databse
        function insertDoctorData() {

            if (!validateForm(regexObj)) {
                return;
            }

          var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            var raw = JSON.stringify({
  
              "speciality_id": document.getElementById('speciality').value,
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
  
            fetch("http://localhost/fileRouge/doctor/insertDoctor", requestOptions)
              .then(response => response.text())
              .then(result => console.log(result))
              .catch(error => console.log('error', error));

              document.getElementById('messageerror').style.display = "block";
              document.getElementById('messageerror').innerHTML = "registration complete";
              document.getElementById('messageerror').style.display ="block";
              document.getElementById('messageerror').classList.remove("alert-danger");
              document.getElementById('messageerror').classList.add("alert-success");

              setTimeout(function(){
                window.location.href = "login.html";
              },2000);
        }


                
        var regexObj = {
            'matricule' : {
                regex: /^.{3,}$/,
                error: ' Please enter your valide matricule'
            },
            'description' : {
                regex: /^.{3,}$/,
                error: 'your description need to be at least one word'
            },
            'displaySchedule' : {
                regex: /^.{3,}$/,
                error: 'You need to register al least one day of work'
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
