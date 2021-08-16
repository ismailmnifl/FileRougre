<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

session_start();
// if(!isset($_SESSION['auth']))
// die(json_encode(array( 'message' => 'Unauthorized access!')));


class postController {

        // post Properties
        private $database;
        private $db;
        private $post;
        private $chekToken;
        private $contentType;

    public function __construct()
    {
        $this->database = new Database();
        $this->db = $this->database->connect(); 
        $this->post = new Post($this->db);

        $this->data = json_decode(file_get_contents("php://input"));
    }
/***************************************************************************************/
    function insertPost() {
            
        $this->post->doctor_id = $this->data->doctor_id;
        $this->post->category_id = $this->data->category_id;
        $this->post->title = $this->data->title;
        $this->post->body =  $this->data->body;
        $this->post->image =  $this->data->image;
        $this->post->resources =  $this->data->resources;
        $this->post->dislikeControle = $this->data->dislikeControle;
        $this->post->commentControle =  $this->data->commentControle;

        // Create Post
        if($this->post->insertPost()) {
            echo json_encode(
            array('message' => 'Post Created')
            );
        } else {
            echo json_encode(
            array('message' => 'Post Not Created')
            );
        }
    }
/***************************************************************************************/
    function addComment() {
            
      $this->post->user_id = $this->data->user_id;
      $this->post->comment = $this->data->comment;
      $this->post->post_id = $this->data->post_id;
      
      // Create Post
      if($this->post->addComment()) {
          echo json_encode(
          array('message' => 'comment Created')
          );
      } else {
          echo json_encode(
          array('message' => 'comment Not Created')
          );
      }
  }
  /***************************************************************************************/
  function addReaction() {
            
    $this->post->user_id = $this->data->user_id;
    $this->post->post_id = $this->data->post_id;
    $this->post->postLike = $this->data->postLike;
    $this->post->postDislike = $this->data->postDislike;
    
    
    // Create Post
    if($this->post->addReaction()) {
        echo json_encode(
        array('message' => 'reaction added')
        );
    } else {
        echo json_encode(
        array('message' => 'reaction Not added')
        );
    }
}
/***************************************************************************************/
    function checkReaction() {

      $this->post->user_id = $this->data->user_id;
      $this->post->post_id = $this->data->post_id;
      

      $result = $this->post->checkReaction();
        // Get row count
        $num = $result->rowCount();
    
        if($num > 0) {
          $reaction_arr = array();
        
          while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
      
            $reaction_item = array(
              'user_id' => $user_id,
              'post_id' => $post_id,
              'postLike' => $postLike,
              'postDislike' => $postDislike,
            );
      
            // Push to "data"
            array_push($reaction_arr, $reaction_item);
          }

          // Turn to JSON & output
          echo json_encode(array('message' => 'true','data' => $reaction_arr));
          } else {
            // No user found
            echo json_encode(
              array('message' => 'false')
            );
          }

    }
/***************************************************************************************/

    function getAllCategories() {
        
        $result = $this->post->getCategory();
        // Get row count
        $num = $result->rowCount();
    
    
        if($num > 0) {
            // users array
            $category_arr = array();
        
            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
              extract($row);
        
              $category_item = array(
                'category_id' => $category_id,
                'category' => $category,
                'description' => $description,
              );
        
              // Push to "data"
              array_push($category_arr, $category_item);
            }
        
            // Turn to JSON & output
            echo json_encode($category_arr);
        
          } else {
            // No user
            echo json_encode(
              array('message' => 'No Category Found')
            );
          }
        }
   /***************************************************************************************/

   function getAllPosts() {

    $result = $this->post->getAllPosts();
        // Get row count
        $num = $result->rowCount();
    
    
        if($num > 0) {
            // users array
            $posts_arr = array();
        
            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
              extract($row);
        
              $post_item = array(
                'post_id' => $post_id,
                'doctor_id' => $doctor_id,
                'category_id' => $category_id,
                'title' => $title,
                'body' => $body,
                'image' => $image,
                'resources' => $resources,
                'dislikeControle' => $dislikeControle,
                'commentControle' => $commentControle,
                'dateCreated' => $dateCreated,
              );
        
              // Push to "data"
              array_push($posts_arr, $post_item);
            }
        
            // Turn to JSON & output
            echo json_encode($posts_arr);
        
          } else {
            // No user
            echo json_encode(
              array('message' => 'No post Found')
            );
          }
}

/***************************************************************************************/
function search() {

  $this->post->title = $this->data->title;

  $result = $this->post->search($this->data->title);
      // Get row count
      $num = $result->rowCount();

      if($num > 0) {
          // users array
          $posts_arr = array();
      
          while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
      
            $post_item = array(
              'post_id' => $post_id,
              'doctor_id' => $doctor_id,
              'category_id' => $category_id,
              'title' => $title,
              'body' => $body,
              'image' => $image,
              'resources' => $resources,
              'dislikeControle' => $dislikeControle,
              'commentControle' => $commentControle,
              'dateCreated' => $dateCreated,
            );
      
            // Push to "data"
            array_push($posts_arr, $post_item);
          }
      
          // Turn to JSON & output
          echo json_encode($posts_arr);
      
        } else {
          // No user
          echo json_encode(
            array('message' => 'No post Found')
          );
        }
      }

/***************************************************************************************/

    function getSinglePost() {

      $this->post->post_id = $this->data->post_id;

       // Get user
       $result = $this->post->getSinglePost();

       $num = $result->rowCount();

     if($num > 0) {
               $posts_arr = array();

         while($row = $result->fetch(PDO::FETCH_ASSOC)) {
             extract($row);
     
       // Create array
       $post_item = array(
               'user_id' => $user_id,
               'location_id' => $location_id,
               'role' => $role,
               'FirstName' => $FirstName,
               'LastName' => $LastName,
               'phone' => $phone,
               'email' => $email,
               'password' => $password,
               'age' => $age,
               'username' => $username,
               'adresse' => $adresse,
               'avatar' => $avatar,
               'latitude' => $latitude,
               'longitude' => $longitude,
               'doctor_id' => $doctor_id,
               'speciality_id' => $speciality_id,
               'matricule' => $matricule,
               'description' => $description,
               'schedule' => $schedule,
               'validated' => $validated,
               'speciality' => $speciality,
               'post_id' =>$post_id,
               'category_id' => $category_id,
               'title' => $title,
               'body' => $body,
               'image' => $image,
               'resources' => $resources,
               'dateCreated' => $dateCreated,
               'dislikeControle' => $dislikeControle,
               'commentControle' => $commentControle,
               'schedule' => $schedule,
               'validated' => $validated,
               'speciality' => $speciality,
             );
       // Make JSON
       array_push($posts_arr, $post_item);
     }
            echo json_encode($posts_arr);
        }else {
          echo json_encode(array('message' => 'No post Found'));
        }
    }
/***************************************************************************************/
    function getAllcommentsForPost() {
      $this->post->post_id = $this->data->post_id;

      // Get user
      $result = $this->post->getAllcommentsForPost();

      $num = $result->rowCount();

    if($num > 0) {
              $commnets_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $comment_item = array(
              'user_id' => $user_id,
              'location_id' => $location_id,
              'role' => $role,
              'FirstName' => $FirstName,
              'LastName' => $LastName,
              'phone' => $phone,
              'email' => $email,
              'password' => $password,
              'age' => $age,
              'username' => $username,
              'adresse' => $adresse,
              'avatar' => $avatar,
              'latitude' => $latitude,
              'longitude' => $longitude,
              'comment_id' => $comment_id,
              'user_id' => $user_id,
              'post_id' => $post_id,
              'comment' => $comment,
              'dateCreated' => $dateCreated,
            );
      // Make JSON
      array_push($commnets_arr, $comment_item);
    }
           echo json_encode($commnets_arr);
       }else {
         echo json_encode(array('message' => 'No comment Found'));
       }
    }
    function countLikes() {
      $this->post->post_id = $this->data->post_id;

      // Get user
      $result = $this->post->countLikes();

      $num = $result->rowCount();

    if($num > 0) {
              $likes_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $likes_item = array(
              'likes' => $likes,
              
            );
      // Make JSON
      array_push($likes_arr, $likes_item);
    }
           echo json_encode($likes_arr);
       }else {
         echo json_encode(array('message' => 'no likes'));
       }
    }

    function countdislikes() {
      $this->post->post_id = $this->data->post_id;

      // Get user
      $result = $this->post->countdislikes();

      $num = $result->rowCount();

    if($num > 0) {
              $likes_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $likes_item = array(
              'dislikes' => $dislikes,
              
            );
      // Make JSON
      array_push($likes_arr, $likes_item);
    }
           echo json_encode($likes_arr);
       }else {
         echo json_encode(array('message' => 'no dislikes'));
       }
    }
    function deletePost(){
      $this->post->post_id = $this->data->post_id;

      // Delete user
      if($this->post->deletePost()) {
        echo json_encode(
          array('message' => 'post Deleted')
        );
      } else {
        echo json_encode(
          array('message' => 'post Not Deleted')
        );
      }
    }

    function selectSingpost(){
      $this->post->post_id = $this->data->post_id;
      // Get user
      $result = $this->post->selectSingpost();

      $num = $result->rowCount();

    if($num > 0) {
              $posts_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $post_item = array(
              'post_id' => $post_id,
              'doctor_id' => $doctor_id,
              'category_id' => $category_id,
              'title' => $title,
              'body' => $body,
              'image' => $image,
              'resources' => $resources,
              'dislikeControle' => $dislikeControle,
              'commentControle' => $commentControle,
              'dateCreated' => $dateCreated,
            );
      // Make JSON
      array_push($posts_arr, $post_item);
    }
    echo json_encode($posts_arr);
    }else {
      echo json_encode(array('message' => 'No post Found'));
    }
    }
    function getSearchedPost(){
      $this->post->title = $this->data->title;
      // Get user
      $result = $this->post->getSearchedPost();

      $num = $result->rowCount();

    if($num > 0) {
              $posts_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $post_item = array(
              'post_id' => $post_id,
              'doctor_id' => $doctor_id,
              'category_id' => $category_id,
              'title' => $title,
              'body' => $body,
              'image' => $image,
              'resources' => $resources,
              'dislikeControle' => $dislikeControle,
              'commentControle' => $commentControle,
              'dateCreated' => $dateCreated,
            );
      // Make JSON
      array_push($posts_arr, $post_item);
    }
    echo json_encode($posts_arr);
    }else {
      echo json_encode(array('message' => 'No post Found'));
    }
    }
    function getSearchedPostByCategories(){
      $this->post->category_id = $this->data->category_id;
      // Get user
      $result = $this->post->getSearchedPostByCategories();

      $num = $result->rowCount();

    if($num > 0) {
              $posts_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $post_item = array(
              'post_id' => $post_id,
              'doctor_id' => $doctor_id,
              'category_id' => $category_id,
              'title' => $title,
              'body' => $body,
              'image' => $image,
              'resources' => $resources,
              'dislikeControle' => $dislikeControle,
              'commentControle' => $commentControle,
              'dateCreated' => $dateCreated,
            );
      // Make JSON
      array_push($posts_arr, $post_item);
    }
    echo json_encode($posts_arr);
    }else {
      echo json_encode(array('message' => 'No post Found'));
    }
    }

    function updateSingePost() {
      $this->post->post_id = $this->data->post_id;
      $this->post->title = $this->data->title;
      $this->post->image = $this->data->image;
      $this->post->resources = $this->data->resources;
      $this->post->dislikeControle = $this->data->dislikeControle;
      $this->post->commentControle = $this->data->commentControle;
      $this->post->body = $this->data->body;
      
      // Update user
      if($this->post->updateSingePost()) {
        echo json_encode(
          array('message' => 'doctor Updated')
        );
      } else {
        echo json_encode(
          array('message' => 'doctor Not Updated')
        );
      }
    }
    function getAllpostAdmin() {
      $result = $this->post->getAllpostAdmin();

      $num = $result->rowCount();

    if($num > 0) {
              $posts_arr = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
    
      // Create array
      $post_item = array(
              'post_id' => $post_id,
              'doctor_id' => $doctor_id,
              'category_id' => $category_id,
              'title' => $title,
              'body' => $body,
              'image' => $image,
              'resources' => $resources,
              'dislikeControle' => $dislikeControle,
              'commentControle' => $commentControle,
              'dateCreated' => $dateCreated,
            );
      // Make JSON
      array_push($posts_arr, $post_item);
    }
    echo json_encode($posts_arr);
    }else {
      echo json_encode(array('message' => 'No post Found'));
    }
    }
}