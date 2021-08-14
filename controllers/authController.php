<?php



header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

session_start();

class authController {

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

function logedIn() {
    if (isset($_SESSION['auth'])) {
      # code...
      echo json_encode(array('message' => true));
    }else {
      # code...
      echo json_encode(array('message' => false));
    }


  }

 /***************************************************************************************/
  function logout() {

      unset($_SESSION['auth']);
      echo json_encode(array('message' => 'logged out'));

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

      if (isset($_SESSION['auth'])) {
        # code...
/*           session_destroy();
*/          unset($_SESSION['auth']);
      }

      } else {
        $_SESSION['auth'] = true;
      echo json_encode(array('message' => 'welcome' , 'data' => $userData));
      
      } 
  }
  
}