<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


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
                'category_id ' => $category_id,
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
}