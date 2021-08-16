 /* eventListeners binded with dom */
 window.addEventListener('load',getAllPosts);
 document.getElementById('search').addEventListener('keyup',search);
 document.getElementById('searchBtn').addEventListener('click',getSearchedPost);
/* *********************************************************************************** */

 function getAllPosts() {
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");

     var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     redirect: 'follow'
     };

     fetch("http://localhost/fileRouge/post/getAllPosts", requestOptions)
     .then(response => response.text())
     .then(function(result) {
         console.log(result);
         var data = JSON.parse(result);
         data.forEach(element => {
            var preview = element.body.slice(0, 60)+'...';

             document.getElementById('postWrapper').innerHTML +=`
             <div class="box" data-aos="fade-right">
                 <img src="../uploads/${element.image}" alt="">
                 <div class="content">
                     <span>${element.dateCreated}</span>
                     <h4>${element.title}</h4>
                     <p>
                         ${preview}
                     </p>
                     <a onclick="getSelectedPost(${element.post_id})" href="Post.html"
                         ><button  class="button">learn more</button></a
                     >
                 </div>
             </div>
             `;
         });
     })
     .catch(error => console.log('error', error));
 }
/* *********************************************************************************** */
 function fillSearchInput(id) {
    var value =  document.getElementById("element-"+id).innerHTML;
    console.log(value);
     document.getElementById('search').value = value;
 }
/* *********************************************************************************** */

 function search() {
    var inputSearchValue = document.getElementById('search').value;
     if (inputSearchValue == "") {
         document.getElementById('autocompleteList').style.display = "none";
     }else {
         document.getElementById('autocompleteList').style.display = "block";
         
         var myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");

         var raw = JSON.stringify({
         "title": document.getElementById('search').value,
         });

         var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
         };

         fetch("http://localhost/fileRouge/post/search", requestOptions)
         .then(response => response.text())
         .then(function(result) {
             console.log("*****************************************")
         console.log(result);
         var data = JSON.parse(result);
         console.log(data);
         document.getElementById('autocompleteList').innerHTML = "";
         data.forEach(element => {
             document.getElementById('autocompleteList').innerHTML += `
                 <li onclick="fillSearchInput(${element.post_id})" id="element-${element.post_id}">${element.title}</li>
             `; 
         });
     })
     .catch(error => console.log('error', error));
     }
     
 }
 function getSelectedPost(id) {

         sessionStorage.setItem('postID', id);
             console.log(sessionStorage.getItem('postID'));
         return sessionStorage.getItem('postID');
     }

     function getSearchedPost() {

         document.getElementById('autocompleteList').style.display = "none";

         var myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");

         var raw = JSON.stringify({
         "title": document.getElementById('search').value
         });

         var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
         };

         fetch("http://localhost/fileRouge/post/getSearchedPost", requestOptions)
         .then(response => response.text())
         .then(function(result) {
             console.log(result);
         var datasearched = JSON.parse(result);
         datasearched.forEach(da => {
            var preview = da.body.slice(0, 60)+'...';

             document.getElementById('postWrapper').innerHTML =`
             <div class="box" data-aos="fade-right">
                 <img src="../uploads/${da.image}" alt="">
                 <div class="content">
                     <span>${da.dateCreated}</span>
                     <h4>${da.title}</h4>
                     <p>
                         ${preview}
                     </p>
                     <a onclick="getSelectedPost(${da.post_id})" href="Post.html"
                         ><button  class="button">learn more</button></a
                     >
                 </div>
             </div>
             `;
         });
         })
         .catch(error => console.log('error', error));
     }


     window.addEventListener('load',loadCategories);
     function loadCategories() {
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
             catego = JSON.parse(result);

             catego.forEach(cat => {

                 document.getElementById('categories').innerHTML += `
                 <option value="${cat.category_id}">${cat.category}</option>
                 `;
             });
         })
         .catch(error => console.log('error', error));
     }

     document.getElementById('categories').addEventListener('change',getSearchedPostByCategories);

     function getSearchedPostByCategories() {
         var myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");

         var raw = JSON.stringify({
         "category_id": document.getElementById('categories').value,
         });

         var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
         };

         fetch("http://localhost/fileRouge/post/getSearchedPostByCategories", requestOptions)
         .then(response => response.text())
         .then(function(result) {
             
             var datasearched = JSON.parse(result);
             console.log(datasearched);
             document.getElementById('postWrapper').innerHTML = "";

         datasearched.forEach(da => {
            var preview = da.body.slice(0, 60)+'...';
             document.getElementById('postWrapper').innerHTML +=`
             <div class="box" data-aos="fade-right">
                 <img src="../uploads/${da.image}" alt="">
                 <div class="content">
                     <span>${da.dateCreated}</span>
                     <h4>${da.title}</h4>
                     <p>
                         ${preview}
                     </p>
                     <a onclick="getSelectedPost(${da.post_id})" href="Post.html"
                         ><button  class="button">learn more</button></a
                     >
                 </div>
             </div>
             `;
         });

         })
         .catch(error => console.log('error', error));
     }