<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');


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

    function authontication() {

        $this->user->username = $this->data->username;
        $this->user->password = $this->data->password;

        $result = $this->user->auth();

       $num = $result->rowCount();

       if($num > 0) {
        $users_arr = array();
    
        $row = $result->fetch(PDO::FETCH_ASSOC);
          extract($row);
    
          $userData = array(
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
       }

        if (empty($userData)) {
        // No user
        echo json_encode(array('message' => 'wrong data'));

        } else {
        echo json_encode(array('message' => 'welcome' , 'data' => $userData));
        } 
    }
    
 /***************************************************************************************/

    function updateUser() {

      $this->user->user_id = $this->data->user_id;
      $this->user->location_id = $this->data->location_id;
      $this->user->FirstName = $this->data->FirstName;
      $this->user->role = $this->data->role;
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

}

?>