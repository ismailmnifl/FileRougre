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
        $query = 'SELECT * FROM `reaction` WHERE user_id = :user_id';
  
        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(':user_id', $this->user_id);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}


?>