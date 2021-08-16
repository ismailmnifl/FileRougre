<?php
class Post {
    private $table = 'post';

    public $post_id;
    public $doctor_id;
    public $category_id;
    public $title;
    public $body;
    public $image;
    public $likes;
    public $dislikes;
    public $resources;
    public $dislikeControle;
    public $commentControle;
    

    public function __construct($db) {
        $this->conn = $db;
    }
/******************************************************************************************/
    public function insertPost() {
        // Create query
        $query = 'insert INTO post (doctor_id,category_id,title,body,image,resources,dislikeControle,commentControle) VALUES(:doctor_id,:category_id,:title,:body,:image,:resources,:dislikeControle,:commentControle)';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
 
        // Clean data
        $this->doctor_id = htmlspecialchars(strip_tags($this->doctor_id));
        $this->category_id = htmlspecialchars(strip_tags($this->category_id));
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->body = $this->body;
        $this->image = htmlspecialchars(strip_tags($this->image));
        $this->resources = htmlspecialchars(strip_tags($this->resources));
        $this->dislikeControle = htmlspecialchars(strip_tags($this->dislikeControle));
        $this->commentControle = htmlspecialchars(strip_tags($this->commentControle));
        
        // Bind data 
        $stmt->bindParam(':doctor_id', $this->doctor_id);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':body', $this->body);
        $stmt->bindParam(':image', $this->image);
        $stmt->bindParam(':resources', $this->resources);
        $stmt->bindParam(':dislikeControle', $this->dislikeControle);
        $stmt->bindParam(':commentControle', $this->commentControle);
        
        // Execute query
        if($stmt->execute()) {
          return true;
        }
    }
/******************************************************************************************/

        function getCategory() {
            $query = 'SELECT * FROM category';
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);
            
            // Execute query
            $stmt->execute();

            return $stmt;
        }

/******************************************************************************************/

    function getAllPosts() {
        $query = 'SELECT * FROM post';
            
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
    function search($q) {
        
        $query = "SELECT *
        FROM post
        WHERE post.title LIKE '%$q%'";
        
            
        // Prepare statement
        $stmt = $this->conn->prepare($query);


        // Execute query
        $stmt->execute();

        return $stmt;
    }

/******************************************************************************************/

    function addComment() {
        
        $query = 'insert INTO comment (user_id,comment,post_id) VALUES(:user_id,:comment,:post_id)';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
 
        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->comment = htmlspecialchars(strip_tags($this->comment));
        $this->post_id = htmlspecialchars(strip_tags($this->post_id));
        
        
        // Bind data 
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':comment', $this->comment);
        $stmt->bindParam(':post_id', $this->post_id);
        
        
        // Execute query
        if($stmt->execute()) {
          return true;
        }
    }

/******************************************************************************************/

    function getSinglePost() {
        // Create query
        $query = 'SELECT * FROM post 
        INNER JOIN doctor 
        ON post.doctor_id = doctor.doctor_id
        INNER JOIN user 
        ON user.user_id = doctor.user_id
        INNER JOIN speciality 
        ON speciality.speciality_id = doctor.speciality_id
        WHERE post.post_id = :post_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':post_id', $this->post_id);

        // Execute query
        $stmt->execute();

        return $stmt;

    }

/******************************************************************************************/
    function getAllcommentsForPost() {

        $query = 'SELECT * FROM comment 
        INNER JOIN user 
        on comment.user_id = user.user_id
        WHERE comment.post_id = :post_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':post_id', $this->post_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }


    function addReaction() {
        
        $query = 'INSERT INTO reaction (user_id,post_id,postLike,postDislike) VALUES (:user_id,:post_id,:postLike,:postDislike)';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
 
        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->post_id = htmlspecialchars(strip_tags($this->post_id));  
        $this->postLike = htmlspecialchars(strip_tags($this->postLike));
        $this->postDislike = htmlspecialchars(strip_tags($this->postDislike));  
        
        // Bind data 
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->bindParam(':postLike', $this->postLike);
        $stmt->bindParam(':postDislike', $this->postDislike); 
        
        // Execute query
        if($stmt->execute()) {
          return true;
        }
    }
    function checkReaction() {
        $query = 'SELECT * FROM `reaction` WHERE post_id = :post_id and user_id = :user_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':post_id', $this->post_id);
        

        // Execute query
        $stmt->execute();

        return $stmt;
    }
    function countLikes() {
        $query = 'SELECT COUNT(reaction.reation_id) as "likes" from reaction WHERE reaction.postLike = "true" AND reaction.post_id = :post_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':post_id', $this->post_id);
        
        // Execute query
        $stmt->execute();

        return $stmt;
    }
    function countdislikes() {
        $query = 'SELECT COUNT(reaction.reation_id) as "dislikes" from reaction WHERE reaction.`postDislike` = "true" AND reaction.post_id = :post_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':post_id', $this->post_id);
        
        // Execute query
        $stmt->execute();

        return $stmt;
    }

    function deletePost() {
        $query = 'delete FROM post where post.post_id = :post_id';
            
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':post_id', $this->post_id);
        // Execute query
        $stmt->execute();

        return $stmt;
      }
      function selectSingpost() {
        $query = 'SELECT * FROM post WHERE post_id = :post_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':post_id', $this->post_id);
        $stmt->bindParam(':post_id', $this->post_id);
        

        // Execute query
        $stmt->execute();

        return $stmt;
      }
      function getSearchedPost(){

        $query = 'SELECT * FROM post WHERE post.title = :title';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':title', $this->title);        

        // Execute query
        $stmt->execute();

        return $stmt;
      }
      function getAllCategories() {
        $query = 'SELECT * FROM category';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
      }
      function getSearchedPostByCategories(){

        $query = 'SELECT * FROM post WHERE post.category_id = :category_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':category_id', $this->category_id);        

        // Execute query
        $stmt->execute();

        return $stmt;
      }
      function updateSingePost() {
             // Create query
        if (isset($this->image)) {
            $query = 'UPDATE post SET title = :title, body = :body, image = :image,
                        resources = :resources, dislikeControle = :dislikeControle, commentControle = :commentControle
                        WHERE post_id = :post_id';
  
          }else {
            $query = 'UPDATE post SET title = :title, body = :body,
                        resources = :resources, dislikeControle = :dislikeControle, commentControle = :commentControle
                        WHERE post_id = :post_id';
          }
          
      
          // Prepare statement
          $stmt = $this->conn->prepare($query);
    
          // Clean data
          $this->title = htmlspecialchars(strip_tags($this->title));
          $this->body = htmlspecialchars(strip_tags($this->body));
          $this->resources = htmlspecialchars(strip_tags($this->resources));
          $this->commentControle = htmlspecialchars(strip_tags($this->commentControle));
          $this->dislikeControle = htmlspecialchars(strip_tags($this->dislikeControle));
          $this->post_id = htmlspecialchars(strip_tags($this->post_id));
         
          if (isset($this->image))
            $this->image = htmlspecialchars(strip_tags($this->image));

          // Bind data
          $stmt->bindParam(':title', $this->title);
          $stmt->bindParam(':body', $this->body);
          $stmt->bindParam(':resources', $this->resources);
          $stmt->bindParam(':commentControle', $this->commentControle);
          $stmt->bindParam(':dislikeControle', $this->dislikeControle);
          $stmt->bindParam(':post_id', $this->post_id);
          if (isset($this->image))
            $stmt->bindParam(':image', $this->image);

    
          // Execute query
          if($stmt->execute()) {
            return true;
          }
    
          // Print error if something goes wrong
          printf("Error: %s.\n", $stmt->error);
    
          return false;
      }
      function getAllpostAdmin() {
        $query = 'SELECT * FROM post';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
      }

}


?>