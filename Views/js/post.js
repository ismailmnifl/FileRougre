
            document.getElementById('submitComment').addEventListener('click',insertComment);
            window.addEventListener('load',getSinglePost);
            window.addEventListener('load',getComments);
            
/* ************************************************************************************* */
            function insertComment() {
                var validation = document.getElementById('comment').value;
                if (validation == "") {
                    document.getElementById('error').innerHTML = "you need to add a comment";
                }else {
                    document.getElementById('error').style.color = "green";
                    document.getElementById('error').innerHTML="comment added succesfully";
                    
                    var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "user_id": sessionStorage.getItem("user_id"),
                "comment":  document.getElementById('comment').value,
                "post_id":  sessionStorage.getItem('postID'),
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/addComment", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
                
                setTimeout(function(){
                  location.reload();
                },250);
                }

                
            }

/* ************************************************************************************* */

            function getSinglePost() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "post_id": sessionStorage.getItem('postID'),
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/getSinglePost", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    var data = JSON.parse(result);
                    console.log(data);

                    if (data[0].dislikeControle == "Disable") {
                        document.getElementById('postReactions').style.display= "none";
                    }
                    if (data[0].commentControle == "Disable") {
                        document.getElementById('comments').style.display= "none";
                        document.getElementById('commentPart').style.display= "none";
                        document.getElementById('headering').style.display= "none";
                        
                    }  
                     
                    /* autor infomations */
                    document.getElementById('avatar').src = `../uploads/${data[0].avatar}`;
                    document.getElementById('name').innerHTML = `${data[0].FirstName} ${data[0].LastName}`;
                    document.getElementById('speciality').innerHTML = `${data[0].speciality}`;
                    /* post infomations */
                    document.getElementById('postImage').src = `../uploads/${data[0].image}`;
                    document.getElementById('title').innerHTML = `${data[0].title}`;
                    document.getElementById('body').innerHTML = `${data[0].body}`;
                    document.getElementById('dateCreated').innerHTML = `${data[0].dateCreated}`;
                })
                .catch(error => console.log('error', error));
            }
/***************************************************************************************/
            function getComments() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "post_id": sessionStorage.getItem('postID'),
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/getAllcommentsForPost", requestOptions)
                .then(response => response.text())
                .then(function(result) {

                    var comments = JSON.parse(result);
                    console.log(comments);

                    if (comments.message =="No comment Found") {
                        return;
                    }

                    comments.forEach(comment => {
                        document.getElementById('commentsWrapper').innerHTML += `
                        <div class="box">
                            <p>
                                ${comment.comment}
                            </p>
                                <h5>${comment.FirstName} ${comment.LastName}</h5>
                                <span>${comment.dateCreated}</span>
                                <img src="../uploads/${comment.avatar}" alt="" />
                        </div>
                        
                        `;
                        
                    });
                })
                .catch(error => console.log('error', error));
            }
            var message,reaction;

            function addReaction(like,dislike) {

                if (message === "true") {
                    console.log('reaction existe');
                    return;
                }
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "user_id": sessionStorage.getItem("user_id"),
                "post_id": sessionStorage.getItem('postID'),
                "postLike": like,
                "postDislike": dislike
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/addReaction", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    console.log(result);
                    checkReaction();
                    likesCount();
                    dislikesCount();                   
                })
                .catch(error => console.log('error', error));
            }
            window.addEventListener('load',checkReaction);

            function checkReaction() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "user_id": sessionStorage.getItem("user_id"),
                "post_id": sessionStorage.getItem('postID')
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/checkReaction", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    console.log(result);
                    var res = JSON.parse(result);

                        message = res.message;
                    if (message == "true") {
                        reaction = res.data[0].postLike;                 
                    }
                    
                })
                .catch(error => console.log('error', error));
            }
            window.addEventListener('load',likesCount);
            function likesCount() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "post_id": sessionStorage.getItem('postID')
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/countLikes", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    var likes = JSON.parse(result);
                    document.getElementById('likes').innerHTML = likes[0].likes;
                    persentageSlider();

                })
                .catch(error => console.log('error', error));
            }
            window.addEventListener('load',dislikesCount);

            function dislikesCount() {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "post_id": sessionStorage.getItem('postID')
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost/fileRouge/post/countdislikes", requestOptions)
                .then(response => response.text())
                .then(function(result) {
                    var dislikes = JSON.parse(result);
                    document.getElementById('dislikes').innerHTML = dislikes[0].dislikes;
                    persentageSlider();

                })
                .catch(error => console.log('error', error));
            }
            setTimeout(function(){
            persentageSlider();
            },800);
            function persentageSlider() {
                
               var a = parseFloat(document.getElementById('likes').innerHTML);
            
               var b = parseFloat(document.getElementById('dislikes').innerHTML);
               console.log(a);
              console.log(b);
              var persentage = a/(a + b )*100;
              console.log('persentage : ' + persentage);
              document.getElementById('filler').style.width = persentage+'%';
            }