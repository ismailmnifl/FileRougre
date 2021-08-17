<?php


header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

session_start();
if(!isset($_SESSION['auth']))
die(json_encode(array( 'message' => 'Unauthorized access!')));


class userController {

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

/**************************************************************/
    function insertUser() {

        $this->user->location_id = $this->data->location_id;
        $this->user->role = $this->data->role;
        $this->user->FirstName = $this->data->FirstName;
        $this->user->LastName =  $this->data->LastName;
        $this->user->phone =  $this->data->phone;
        $this->user->email = $this->data->email;
        $this->user->password = $this->data->password;
        $this->user->age = $this->data->age;
        $this->user->username = $this->data->username;
        $this->user->adresse =  $this->data->adresse;
        $this->user->avatar = $this->data->avatar;
        

        // Create user
        if($this->user->create()) {
            echo json_encode(
            array('message' => 'user Created')
            );
        } else {
            echo json_encode(
            array('message' => 'user Not Created')
            );
        }
    }
//*********************************************************** */
    function DeleteUser() {
        $this->user->user_id = $this->data->user_id;

        // Delete user
        if($this->user->delete()) {
          echo json_encode(
            array('message' => 'user Deleted')
          );
        } else {
          echo json_encode(
            array('message' => 'user Not Deleted')
          );
        }
    }
/***************************************************************************************/
    function getAllUsers() {

        $result = $this->user->read();
        // Get row count
        $num = $result->rowCount();


        if($num > 0) {
        // Post array
        $users_arr = array();
    
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
            'longitude' => $longitude
          );
    
          // Push to "data"
          array_push($users_arr, $user_item);
        }
    
        // Turn to JSON & output
        echo json_encode($users_arr);
    
      } else {
        // No user
        echo json_encode(array('message' => 'No user Found'));
      }
    }
/***************************************************************************************/

    function getAllLocation() {
        
    $result = $this->user->getLocation();
    // Get row count
    $num = $result->rowCount();


    if($num > 0) {
        // users array
        $users_arr = array();
    
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
    
          $user_item = array(
            'location_id' => $location_id,
            'location' => $location
          );
    
          // Push to "data"
          array_push($users_arr, $user_item);
        }
    
        // Turn to JSON & output
        echo json_encode($users_arr);
    
      } else {
        // No user
        echo json_encode(
          array('message' => 'No location Found')
        );
      }
    }
/***************************************************************************************/

    function getAllSpecialites() {
        
    $result = $this->user->getSpeciality();
    // Get row count
    $num = $result->rowCount();


    if($num > 0) {
        // Post array
        $users_arr = array();
    
        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
    
          $user_item = array(
            'speciality_id' => $speciality_id,
            'speciality' => $speciality
          );
    
          // Push to "data"
          array_push($users_arr, $user_item);
        }
    
        // Turn to JSON & output
        echo json_encode($users_arr);
    
      } else {
        // No speciality
        echo json_encode(
          array('message' => 'No speciality Found')
        );
      }
    }
/***************************************************************************************/

    function readSingleUser() {
        $this->user->user_id = $this->data->user_id;
        // Get user
        $this->user->read_single();
      
        // Create array
        $users_arr = array(
          'user_id' => $this->user->user_id,
          'location_id' => $this->user->location_id,
          'role' => $this->user->role,
          'FirstName' => $this->user->FirstName,
          'LastName' => $this->user->LastName,
          'phone' => $this->user->phone,
          'email' => $this->user->email,
          'password' => $this->user->password,
          'age' => $this->user->age,
          'username' => $this->user->username,
          'adresse' => $this->user->adresse,
          'avatar' =>$this->user->avatar,
          'latitude' => $this->user->latitude,
          'longitude' => $this->user->longitude
        );
      
        // Make JSON
        print_r(json_encode($users_arr));
    }

 /***************************************************************************************/

            function updateUser() {

                $this->user->user_id = $this->data->user_id;
                $this->user->location_id = $this->data->location_id;
                $this->user->FirstName = $this->data->FirstName;
                $this->user->LastName =  $this->data->LastName;
                $this->user->phone = $this->data->phone;
                $this->user->email = $this->data->email;
                $this->user->password = $this->data->password;
                $this->user->age = $this->data->age;
                $this->user->username = $this->data->username;
                $this->user->adresse =  $this->data->adresse;
                $this->user->avatar = $this->data->avatar;
              

                // Update user
                if($this->user->update()) {
                  echo json_encode(
                    array('message' => 'user Updated')
                  );
                } else {
                  echo json_encode(
                    array('message' => 'user Not Updated')
                  );
                }
              }
          //*****************************foreign key prevent the deletion of location****************************** */
              function DeleteLocation() {
                $this->user->location_id = $this->data->location_id;

                // Delete user
                if($this->user->deleteLocation()) {
                  echo json_encode(
                    array('message' => 'Location Deleted')
                  );
                } else {
                  echo json_encode(
                    array('message' => 'Location Not Deleted')
                  );
                }
              }
          //*********************************************************** */
              function DeleteSpeciality() {
                $this->user->speciality_id = $this->data->speciality_id;

                // Delete user
                if($this->user->deleteSpeciality()) {
                  echo json_encode(
                    array('message' => 'speciality Deleted')
                  );
                } else {
                  echo json_encode(
                    array('message' => 'speciality Not Deleted')
                  );
                }
              }
          //*********************************************************** */

              function addLocation() {

                $this->user->location = $this->data->location;    

                  // Create user
                  if($this->user->addLocation()) {
                      echo json_encode(
                      array('message' => 'location Created')
                      );
                  } else {
                      echo json_encode(
                      array('message' => 'location Not Created')
                      );
                  }
              }
          //*********************************************************** */

              function addSpeciality() {

                $this->user->speciality = $this->data->speciality;    

                  // Create user
                  if($this->user->addSpeciality()) {
                      echo json_encode(
                      array('message' => 'speciality Created')
                      );
                  } else {
                      echo json_encode(
                      array('message' => 'speciality Not Created')
                      );
                  }
              }

          //*********************************************************** */
          function getuserReview() {

            $this->user->user_id = $this->data->user_id;
              // Get user
              $result = $this->user->getuserReview();

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
                      
                    );
              // Make JSON
              array_push($reviews_arr, $review_item);
            }
            echo json_encode($reviews_arr);
            }else {
              echo json_encode(array('message' => 'No review Found'));
            }

          }

          //*********************************************************** */
          function getuserComments() {

            $this->user->user_id = $this->data->user_id;
              // Get user
              $result = $this->user->getuserComments();

              $num = $result->rowCount();

            if($num > 0) {
                      $comments_arr = array();

                while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
            
              // Create array
              $comment_item = array(
                      'comment_id' => $comment_id,
                      'user_id' => $user_id,
                      'post_id' => $post_id,
                      'comment' => $comment,
                      'dateCreated' => $dateCreated,
                      
                    );
              // Make JSON
              array_push($comments_arr, $comment_item);
            }
            echo json_encode($comments_arr);
            }else {
              echo json_encode(array('message' => 'No review Found'));
            }

          }
          //*********************************************************** */
          function getSingleuserReview() {

            $this->user->user_id = $this->data->user_id;
            $this->user->review_id = $this->data->review_id;
            
              // Get user
              $result = $this->user->getSingleuserReview();

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
                      
                    );
              // Make JSON
              array_push($reviews_arr, $review_item);
            }
            echo json_encode($reviews_arr);
            }else {
              echo json_encode(array('message' => 'No review Found'));
            }

          }

//*********************************************************** */
        function getSingleuserComments() {

          $this->user->user_id = $this->data->user_id;
          $this->user->comment_id = $this->data->comment_id;

          // Get user
            $result = $this->user->getSingleuserComments();

            $num = $result->rowCount();

          if($num > 0) {
                    $comments_arr = array();

              while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                  extract($row);
          
            // Create array
            $comment_item = array(
                    'comment_id' => $comment_id,
                    'user_id' => $user_id,
                    'post_id' => $post_id,
                    'comment' => $comment,
                    'dateCreated' => $dateCreated,
                    
                  );
            // Make JSON
            array_push($comments_arr, $comment_item);
          }
          echo json_encode($comments_arr);
          }else {
            echo json_encode(array('message' => 'No review Found'));
          }

        }
        //*********************************************************** */

        function DeleteSingleuserReview() {
          $this->user->review_id = $this->data->review_id;

          // Delete user
          if($this->user->DeleteSingleuserReview()) {
            echo json_encode(
              array('message' => 'review Deleted')
            );
          } else {
            echo json_encode(
              array('message' => 'review Not Deleted')
            );
          }
        }
        //*********************************************************** */

        function DeleteSingleuserComments() {
          $this->user->comment_id = $this->data->comment_id;

          // Delete user
          if($this->user->DeleteSingleuserComments()) {
            echo json_encode(
              array('message' => 'comment Deleted')
            );
          } else {
            echo json_encode(
              array('message' => 'comment Not Deleted')
            );
          }
        }
        function updateUserComment() {
          $this->user->comment_id = $this->data->comment_id;
          $this->user->comment = $this->data->comment;

          // Delete user
          if($this->user->updateUserComment()) {
            echo json_encode(
              array('message' => 'comment updated')
            );
          } else {
            echo json_encode(
              array('message' => 'comment Not updated')
            );
          }
        }
        function updateUserReview() {
          $this->user->review_id = $this->data->review_id;
          $this->user->stars = $this->data->stars;
          $this->user->review = $this->data->review;

          // Delete user
          if($this->user->updateUserReview()) {
            echo json_encode(
              array('message' => 'review updated')
            );
          } else {
            echo json_encode(
              array('message' => 'review Not updated')
            );
          }
        }
        function insertContactMessage() {
          $this->user->userName = $this->data->userName;
          $this->user->subject = $this->data->subject;
          $this->user->email = $this->data->email;
          $this->user->phone =  $this->data->phone;
          $this->user->message =  $this->data->message;
          
  
          // Create user
          if($this->user->insertContactMessage()) {
              echo json_encode(
              array('message' => 'contact message Created')
              );
          } else {
              echo json_encode(
              array('message' => 'contact message Not Created')
              );
          }
        }
        function getContactMessage() {
         

          // Get user
            $result = $this->user->getContactMessage();

            $num = $result->rowCount();

          if($num > 0) {
                    $message_arr = array();

              while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                  extract($row);
          
            // Create array
            $message_item = array(
                    'contact_id' => $contact_id,
                    'userName' => $userName,
                    'subject' => $subject,
                    'email' => $email,
                    'phone' => $phone,
                    'message' => $message,
                    'dateCreated' => $dateCreated,
                    
                  );
            // Make JSON
            array_push($message_arr, $message_item);
          }
          echo json_encode($message_arr);
          }else {
            echo json_encode(array('message' => 'No message Found'));
          }
        }
        function isUserDoctor() {

          $this->user->user_id = $this->data->user_id;


          $result = $this->user->isUserDoctor();

          $num = $result->rowCount();

        if($num > 0) {
                  $doctor_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
        
          // Create array
          $doctor_item = array(

                  'doctor_id' => $doctor_id,
                  'speciality_id' => $speciality_id,
                  'matricule' => $matricule,
                  'description' => $description,
                  'schedule' => $schedule,
                  'validated' => $validated,
                  'user_id' => $user_id,
                  
                );
          // Make JSON
          array_push($doctor_arr, $doctor_item);
        }
        echo json_encode($doctor_arr);
        }else {
          echo json_encode(array('message' => 'No doctor Found'));
        }
        }
        function deleteContactMessage() {
          $this->user->contact_id = $this->data->contact_id;

          // Delete user
          if($this->user->deleteContactMessage()) {
            echo json_encode(
              array('message' => 'message Deleted')
            );
          } else {
            echo json_encode(
              array('message' => 'message Not Deleted')
            );
          }
        }


        function stats() {
          $result = $this->user->stats();

          $num = $result->rowCount();

        if($num > 0) {
                  $stats_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
        
          // Create array
          $stats_item = array(
                  'starcount' => $starcount,
                  'LastName' => $LastName      
                );
          // Make JSON
          array_push($stats_arr, $stats_item);
        }
        echo json_encode($stats_arr);
        }else {
          echo json_encode(array('message' => 'no stats found'));
        }
        }


        function dashstats() {

  
          $five1 = $this->user->statsCountusers();
          $fiveRow1 = $five1->fetch(PDO::FETCH_ASSOC);
            extract($fiveRow1);
  
          $four1 = $this->user->statsCountDoctors();
          $fourRow1 = $four1->fetch(PDO::FETCH_ASSOC);
            extract($fourRow1);
  
            $three1 = $this->user->statsCountPosts();
          $threeRow1 = $three1->fetch(PDO::FETCH_ASSOC);
            extract($threeRow1);
  
          $two1 = $this->user->statsCountMessage();
          $twoRow1 = $two1->fetch(PDO::FETCH_ASSOC);
            extract($twoRow1);
  
            $review_item = array(
              'userCount' => $userCount,
              'doctorCount' => $doctorCount,
              'postCount' => $postCount,
              'messageCount' => $messageCount,
              
            );
          // Make JSON
          print_r(json_encode($review_item));
        }
}

?>