<?php
class Post {
    private $table = 'post';

    public $doctor_id;
    public $category_id;
    public $title;
    public $body;
    public $image;
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

}


?>