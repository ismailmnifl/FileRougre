<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

session_start();
// if(!isset($_SESSION['auth']))
//   die(json_encode(array( 'message' => 'Unauthorized access!')));

class doctorController {

        // User Properties
        private $database;
        private $db;
        private $user;
        private $chekToken;
        private $contentType;

    public function __construct()
    {
        $this->database = new Database();
        $this->db = $this->database->connect(); 
        $this->user = new User($this->db);

        $this->data = json_decode(file_get_contents("php://input"));
    }

/***************************************************************************************/

    function insertDoctor() {
        
        $this->user->user_id = $this->user->lastUserInserted();
        $this->user->speciality_id = $this->data->speciality_id;
        $this->user->matricule = $this->data->matricule;
        $this->user->description =  $this->data->description;
        $this->user->schedule =  $this->data->schedule;

        // Create doctor
        if($this->user->insertDoctor()) {
            echo json_encode(
            array('message' => 'doctor Created')
            );
        } else {
            echo json_encode(
            array('message' => 'doctor Not Created')
            );
        }
    }
/***************************************************************************************/

    function ReadAllDoctors() {

        $result = $this->user->ReadAllDoctors();
        // Get row count
        $num = $result->rowCount();


        if($num > 0) {
        // Post array
        $doctors_arr = array();
  
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
    
          $doctor_item = array(
            'doctor_id' => $doctor_id,
            'user_id' => $user_id,
            'speciality_id' => $speciality_id,
            'matricule' => $matricule,
            'description' => $description,
            'schedule' => $schedule,
            'validated' => $validated,
          );
    
          // Push to "data"
          array_push($doctors_arr, $doctor_item);
        }
    
        // Turn to JSON & output
        echo json_encode($doctors_arr);
    
      } else {
        // No user
        echo json_encode(array('message' => 'No doctor Found'));
      }
    }

    /***************************************************************************************/

    function DeleteDoctor() {

        $this->user->doctor_id = $this->data->doctor_id;

        // Delete user
        if($this->user->deleteDoctor()) {
          echo json_encode(
            array('message' => 'Doctor Deleted')
          );
        } else {
          echo json_encode(
            array('message' => 'user Not Deleted')
          );
        }
    }
/***************************************************************************************/

    function readSingleDoctor() {
        $this->user->doctor_id = $this->data->doctor_id;
        // Get user
        $this->user->getSingleDoctor();

        // Create array
        $doctor_arr = array(
          'doctor_id' => $this->user->doctor_id,
          'user_id' => $this->user->user_id,
          'speciality_id' => $this->user->speciality_id,
          'matricule' => $this->user->matricule,
          'description' => $this->user->description,
          'schedule' => $this->user->schedule,
          'validated' => $this->user->validated,
        );
      
        // Make JSON
        print_r(json_encode($doctor_arr));
    }
/***************************************************************************************/

        function updateDoctor() {

          $this->user->doctor_id = $this->data->doctor_id;
          $this->user->matricule = $this->data->matricule;
          $this->user->description = $this->data->description;
          $this->user->schedule = $this->data->schedule;
          
          // Update user
          if($this->user->updateDoctor()) {
            echo json_encode(
              array('message' => 'doctor Updated')
            );
          } else {
            echo json_encode(
              array('message' => 'doctor Not Updated')
            );
          }
        }
/***************************************************************************************/
      function validateDoctor() {

        $this->user->doctor_id = $this->data->doctor_id;
        $this->user->validated = "Valited";
        
        // Update user
        if($this->user->validateDoctor()) {
          echo json_encode(
            array('message' => 'doctor validated')
          );
        } else {
          echo json_encode(
            array('message' => 'doctor invaled')
          );
        }

      }
      function retreveDoctorRecomendation() {
        // Get user
        $result =  $this->user->retreveDoctorRecomendation();
        $num = $result->rowCount();

        if($num > 0) {
                  $doctors_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
          
                $user_item = array(
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
                  'review_id' => $review_id,
                  'stars' => $stars,
                  'review' => $review,
                  'dateCreated' => $dateCreated,
                  'AVGstars' => $AVGstars,
                  'doctorID' => $doctorID,
                );

          
                // Push to "data"
                array_push($doctors_arr, $user_item);
            }
            echo json_encode($doctors_arr);

        } else {
          echo json_encode(array('message' => 'No doctor Found'));
        }
      }

      function retreveDoctorRecomendationSearch() {

        $this->user->LastName = $this->data->LastName;

        // Get user
        $result =  $this->user->retreveDoctorRecomendationSearch($this->data->LastName);
        $num = $result->rowCount();

        if($num > 0) {
                  $doctors_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
          
                $user_item = array(
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
                  'review_id' => $review_id,
                  'stars' => $stars,
                  'review' => $review,
                  'dateCreated' => $dateCreated,
                  'AVGstars' => $AVGstars,
                  'doctorID' => $doctorID,
                );

          
                // Push to "data"
                array_push($doctors_arr, $user_item);
            }
            echo json_encode($doctors_arr);

        } else {
          echo json_encode(array('message' => 'No doctor Found'));
        }
      }


      function retreveDoctorRecomendationSearchFromInput() {

        $this->user->LastName = $this->data->LastName;

        // Get user
        $result =  $this->user->retreveDoctorRecomendationSearchFromInput();
        $num = $result->rowCount();

        if($num > 0) {
                  $doctors_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
          
                $user_item = array(
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
                  'review_id' => $review_id,
                  'stars' => $stars,
                  'review' => $review,
                  'dateCreated' => $dateCreated,
                  'AVGstars' => $AVGstars,
                  'doctorID' => $doctorID,
                );

          
                // Push to "data"
                array_push($doctors_arr, $user_item);
            }
            echo json_encode($doctors_arr);

        } else {
          echo json_encode(array('message' => 'No doctor Found'));
        }
      }

      function retreveDoctorRecomendationFromFilterInput() {

        $this->user->speciality_id = $this->data->speciality_id;

        // Get user
        $result =  $this->user->retreveDoctorRecomendationFromFilterInput();
        $num = $result->rowCount();

        if($num > 0) {
                  $doctors_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
          
                $user_item = array(
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
                  'review_id' => $review_id,
                  'stars' => $stars,
                  'review' => $review,
                  'dateCreated' => $dateCreated,
                  'AVGstars' => $AVGstars,
                  'doctorID' => $doctorID,
                );

          
                // Push to "data"
                array_push($doctors_arr, $user_item);
            }
            echo json_encode($doctors_arr);

        } else {
          echo json_encode(array('message' => 'No doctor Found'));
        }
      }

      function getSingleDoctorProfileData() {

          $this->user->doctorID = $this->data->doctorID;
          // Get user
          $result = $this->user->retreveSingleDoctorProfileData();

          $num = $result->rowCount();

        if($num > 0) {
                  $doctors_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
        
          // Create array
          $user_item = array(
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
                  'review_id' => $review_id,
                  'stars' => $stars,
                  'review' => $review,
                  'dateCreated' => $dateCreated,
                  'AVGstars' => $AVGstars,
                  'doctorID' => $doctorID,
                  'nReviews' => $nReviews
                );
          // Make JSON
          array_push($doctors_arr, $user_item);
        }
        echo json_encode($doctors_arr);
    }else {
      echo json_encode(array('message' => 'No doctor Found'));
    }
}

    function insertReview() {

        $this->user->user_id = $this->data->user_id;
        $this->user->doctor_id = $this->data->doctor_id;
        $this->user->stars = $this->data->stars;
        $this->user->review =  $this->data->review;

        // Create doctor
        if($this->user->insertReview()) {
            echo json_encode(
            array('message' => 'doctor Created')
            );
        } else {
            echo json_encode(
            array('message' => 'doctor Not Created')
            );
        }
    }
    function getReviews() {

      $this->user->doctor_id = $this->data->doctor_id;
          // Get user
          $result = $this->user->getReviews();

          $num = $result->rowCount();

        if($num > 0) {
                  $reviews_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
        
          // Create array
          $review_item = array(
                  'review_id' => $review_id,
                  'user_id' => $user_id,
                  'doctor_id' => $doctor_id,
                  'stars' => $stars,
                  'review' => $review,
                  'dateCreated' => $dateCreated,
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
                );
          // Make JSON
          array_push($reviews_arr, $review_item);
        }
        echo json_encode($reviews_arr);
        }else {
          echo json_encode(array('message' => 'No review Found'));
        }
      }
      function fiveStarsPersontage() {

        $this->user->doctor_id = $this->data->doctor_id;

        $five = $this->user->fiveStarsPersontage();
        $fiveRow = $five->fetch(PDO::FETCH_ASSOC);
          extract($fiveRow);

        $four = $this->user->fourStarsPersontage();
        $fourRow = $four->fetch(PDO::FETCH_ASSOC);
          extract($fourRow);

          $three = $this->user->threeStarsPersontage();
        $threeRow = $three->fetch(PDO::FETCH_ASSOC);
          extract($threeRow);

        $two = $this->user->twoStarsPersontage();
        $twoRow = $two->fetch(PDO::FETCH_ASSOC);
          extract($twoRow);

        $one = $this->user->oneStarsPersontage();
        $oneRow = $one->fetch(PDO::FETCH_ASSOC);
          extract($oneRow);

          $review_item = array(
            'fiveStarsCount' => $fiveStarsCount,
            'fourStarsCount' => $fourStarsCount,
            'threeStarsCount' => $threeStarsCount,
            'twoStarsCount' => $twoStarsCount,
            'oneStarsCount' => $oneStarsCount,
            
          );
        // Make JSON
        print_r(json_encode($review_item));
      }

      function getDoctorPosts() {
        $this->user->doctor_id = $this->data->doctor_id;
          // Get user
          $result = $this->user->getDoctorPosts();

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



