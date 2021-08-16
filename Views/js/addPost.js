
			document.getElementById('sendDataBtn').addEventListener('click',insertPost);
			function get() {
				var title = document.getElementById('title').value;
				var data = CKEDITOR.instances.content.getData();
				console.log(data);
				console.log(title);
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
			function insertPost(){

                if (!validateForm(regexObj)) {
                    return;
                }

				var postImage = uploadImage();

				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var raw = JSON.stringify({
				"doctor_id": sessionStorage.getItem('doctorIndex'),
				"category_id": document.getElementById('categories').value,
				"title": document.getElementById('title').value,
				"body": CKEDITOR.instances.content.getData(),
				"image": postImage,
				"resources": document.getElementById('source').value,
				"dislikeControle": document.getElementById('likeControle').value,
				"commentControle": document.getElementById('comControle').value,
				});

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				};

				fetch("http://localhost/fileRouge/post/insertPost", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.catch(error => console.log('error', error));

                document.getElementById('alertSuccess').innerHTML = "Post added";
                document.getElementById('alertSuccess').style.display ="block";
                document.getElementById('alertSuccess').classList.remove("alert-danger");
                document.getElementById('alertSuccess').classList.add("alert-success");
			}
			window.addEventListener('load',getCategories);

		
			function getCategories() {

				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				redirect: 'follow'
				};

				fetch("http://localhost/fileRouge/post/getAllCategories", requestOptions)
				.then(response => response.text())
				.then(function(result) {
					console.log(result);
					var data = JSON.parse(result);
					console.log(data);

					data.forEach(da => {
						document.getElementById('categories').innerHTML += `<option value="${da.category_id }">${da.category}</option>`;
					});
					
				})
				.catch(error => console.log('error', error));
			}





            
   var regexObj = {
    'title' : {
        regex: /^.{3,}$/,
        error: 'please inter a good title'
    },

};

function validateForm(regexObj) {

     for(var id in regexObj) {
         // console.log(regexObj[id], typeof regexObj[id]);
         var value = document.getElementById(id).value;
         var regex = regexObj[id].regex;
         var error = regexObj[id].error;

         if( !regex.test(value)) {

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
