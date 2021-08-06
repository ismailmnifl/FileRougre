<?php 
  class User {
    // DB stuff
    private $conn;
    private $table = 'user';

    // user Properties
    public $user_id;
    public $location_id;
    public $role;
    public $FirstName;
    public $LastName;
    public $email;
    public $phone;
    public $password;
    public $age;
    public $username;
    public $adresse;
    public $avatar;
    public $latitude;
    public $longitude;

    // doctor Properties
    public $speciality_id;
    public $matricule;
    public $description;
    public $schedule;
    public $doctor_id;
    public $validated;

    //the average star rating for each doctor
    public $AVGstars;
    public $doctorID;
    public $nReviews;
    


    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }
 /***************************************************************************************/

    //authontication from user table
    function auth() {
        // Create query
        $query = 'SELECT * FROM user WHERE username = :username and password = :password';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);

         $this->username = htmlspecialchars(strip_tags($this->username));
        $this->password = htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':password', $this->password);
  
        // Execute query
        $stmt->execute();
  
        return $stmt;
    }
 /***************************************************************************************/

    // get all user data from the database
    public function read() {
        // Create query
        $query = 'SELECT * FROM user';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);
  
        // Execute query
        $stmt->execute();
  
        return $stmt;
    }
 /***************************************************************************************/

        // get single user data from the database
        public function read_single() {
            // Create query
            $query = 'SELECT * FROM user WHERE user_id = ?';
  
            // Prepare statement
            $stmt = $this->conn->prepare($query);
  
            // Bind ID
            $stmt->bindParam(1, $this->user_id);
  
            // Execute query
            $stmt->execute();
  
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
  
            // Set properties
            $this->user_id = $row['user_id'];
            $this->location_id = $row['location_id'];
            $this->role = $row['role'];
            $this->FirstName = $row['FirstName'];
            $this->LastName = $row['LastName'];
            $this->phone = $row['phone'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->age = $row['age'];
            $this->username = $row['username'];
            $this->adresse = $row['adresse'];
            $this->avatar = $row['avatar'];
            $this->latitude = $row['latitude'];
            $this->longitude = $row['longitude'];
      }
 /***************************************************************************************/

      public function create() {
        // Create query
        $query = 'INSERT INTO user SET role = :role, location_id = :location_id, FirstName = :FirstName, LastName = :LastName,
                                       phone = :phone, email = :email, password = :password, age = :age,
                                       username = :username, adresse = :adresse, avatar = :avatar,
                                       latitude = :latitude, longitude = :longitude';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        
        $this->location_id = htmlspecialchars(strip_tags($this->location_id));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->FirstName = htmlspecialchars(strip_tags($this->FirstName));
        $this->LastName = htmlspecialchars(strip_tags($this->LastName));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->age = htmlspecialchars(strip_tags($this->age));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->adresse = htmlspecialchars(strip_tags($this->adresse));
        $this->avatar = htmlspecialchars(strip_tags($this->avatar));
        $this->latitude = htmlspecialchars(strip_tags($this->latitude));
        $this->longitude = htmlspecialchars(strip_tags($this->longitude));
        
        // Bind data
        
        $stmt->bindParam(':location_id', $this->location_id);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':FirstName', $this->FirstName);
        $stmt->bindParam(':LastName', $this->LastName);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':age', $this->age);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':adresse', $this->adresse);
        $stmt->bindParam(':avatar', $this->avatar);
        $stmt->bindParam(':latitude', $this->latitude);
        $stmt->bindParam(':longitude', $this->longitude);
        
        // Execute query
        if($stmt->execute()) {
          return true;
        }
    }

 /***************************************************************************************/

    public function update() {
        // Create query
        $query = 'UPDATE user SET role = :role, location_id = :location_id, FirstName = :FirstName, LastName = :LastName,
                                  phone = :phone, email = :email, password = :password, age = :age,
                                  username = :username, adresse = :adresse, avatar = :avatar,
                                  latitude = :latitude, longitude = :longitude
                                  WHERE user_id = :user_id';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
  
        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->location_id = htmlspecialchars(strip_tags($this->location_id));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->FirstName = htmlspecialchars(strip_tags($this->FirstName));
        $this->LastName = htmlspecialchars(strip_tags($this->LastName));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->age = htmlspecialchars(strip_tags($this->age));
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->adresse = htmlspecialchars(strip_tags($this->adresse));
        $this->avatar = htmlspecialchars(strip_tags($this->avatar));
        $this->latitude = htmlspecialchars(strip_tags($this->latitude));
        $this->longitude = htmlspecialchars(strip_tags($this->longitude));

        

        // Bind data
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':location_id', $this->location_id);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':FirstName', $this->FirstName);
        $stmt->bindParam(':LastName', $this->LastName);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':age', $this->age);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':adresse', $this->adresse);
        $stmt->bindParam(':avatar', $this->avatar);
        $stmt->bindParam(':latitude', $this->latitude);
        $stmt->bindParam(':longitude', $this->longitude);
  
        // Execute query
        if($stmt->execute()) {
          return true;
        }
  
        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
  
        return false;
  }
 /***************************************************************************************/

    public function delete() {
        // Create query
        $query = 'DELETE FROM user WHERE user_id = :user_id';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
    
        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    
        // Bind data
        $stmt->bindParam(':user_id', $this->user_id);
    
        // Execute query
        if($stmt->execute()) {
        return true;
        }
    
        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
    
        return false;
    }
 /***************************************************************************************/

    function getLocation() {
        $query = 'SELECT * FROM location';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);
  
        // Execute query
        $stmt->execute();
  
        return $stmt;
    }
 /***************************************************************************************/

    function lastUserInserted() {

        $query = 'SELECT user_id FROM user ORDER BY user_id DESC LIMIT 1';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);
  
        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
  
        return $row['user_id'];
    }
 /***************************************************************************************/

    function getSpeciality() {
      $query = 'SELECT * FROM speciality';
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
  }
 /***************************************************************************************/

  public function insertDoctor() {
    // Create query
    $query = 'INSERT INTO doctor SET user_id = :user_id, speciality_id = :speciality_id, matricule = :matricule, description = :description,
                                     schedule = :schedule';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    $this->speciality_id = htmlspecialchars(strip_tags($this->speciality_id));
    $this->matricule = htmlspecialchars(strip_tags($this->matricule));
    $this->description = htmlspecialchars(strip_tags($this->description));
    $this->schedule = ($this->schedule);
    
    // Bind data 
    $stmt->bindParam(':user_id', $this->user_id);
    $stmt->bindParam(':speciality_id', $this->speciality_id);
    $stmt->bindParam(':matricule', $this->matricule);
    $stmt->bindParam(':description', $this->description);
    $stmt->bindParam(':schedule', $this->schedule);
    
    // Execute query
    if($stmt->execute()) {
      return true;
    }
  }
 /***************************************************************************************/

  public function ReadAllDoctors() {
     // Create query
     $query = 'SELECT * FROM doctor';
        
     // Prepare statement
     $stmt = $this->conn->prepare($query);

     // Execute query
     $stmt->execute();

     return $stmt;
  }

 /***************************************************************************************/

  public function deleteDoctor() {
    // Create query
    $query = 'DELETE FROM doctor WHERE doctor_id = :doctor_id';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->user_id = htmlspecialchars(strip_tags($this->doctor_id));

    // Bind data
    $stmt->bindParam(':doctor_id', $this->doctor_id);

    // Execute query
    if($stmt->execute()) {
    return true;
    }

    // Print error if something goes wrong
    printf("Error: %s.\n", $stmt->error);

    return false;
  }
 /***************************************************************************************/

      public function getSingleDoctor() {
        // Create query
        $query = 'SELECT * FROM doctor WHERE doctor_id = ?';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->doctor_id);

        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
      
        // Set properties
        $this->doctor_id = $row['doctor_id'];
        $this->user_id = $row['user_id'];
        $this->speciality_id = $row['speciality_id'];
        $this->matricule = $row['matricule'];
        $this->description = $row['description'];
        $this->schedule = $row['schedule'];
        $this->validated = $row['validated'];
      }

 /***************************************************************************************/

      function updateDoctor() {

        // Create query
        $query = 'UPDATE doctor SET matricule = :matricule, description = :description, schedule = :schedule
                                  WHERE doctor_id = :doctor_id';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
        // Clean data
        $this->doctor_id = htmlspecialchars(strip_tags($this->doctor_id));
        $this->matricule = htmlspecialchars(strip_tags($this->matricule));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->schedule = $this->schedule;

        // Bind data
        $stmt->bindParam(':doctor_id', $this->doctor_id);
        $stmt->bindParam(':matricule', $this->matricule);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':schedule', $this->schedule);
  
        // Execute query
        if($stmt->execute()) {
          return true;
        }
  
        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
  
        return false;
  }
//*********************************************************** */

  function validateDoctor() {

    // Create query
    $query = 'UPDATE doctor SET validated = :validated WHERE doctor_id = :doctor_id';

    // Prepare statement
    $stmt = $this->conn->prepare($query);
    // Clean data
    $this->doctor_id = htmlspecialchars(strip_tags($this->doctor_id));
    $this->validated = htmlspecialchars(strip_tags($this->validated));

    // Bind data
    $stmt->bindParam(':doctor_id', $this->doctor_id);
    $stmt->bindParam(':validated', $this->validated);


    // Execute query
    if($stmt->execute()) {
      return true;
    }

    // Print error if something goes wrong
    printf("Error: %s.\n", $stmt->error);

    return false;
  }
  //*********************************************************** */

  function deleteLocation() {
    $query = 'DELETE FROM location WHERE location_id = :location_id';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
    
        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->location_id));
    
        // Bind data
        $stmt->bindParam(':location_id', $this->location_id);
    
        // Execute query
        if($stmt->execute()) {
        return true;
        }
    
        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
    
        return false;
  }
  //*********************************************************** */

  function deleteSpeciality() {
    $query = 'DELETE FROM speciality WHERE speciality_id = :speciality_id';
    
        // Prepare statement
        $stmt = $this->conn->prepare($query);
    
        // Clean data
        $this->speciality_id = htmlspecialchars(strip_tags($this->speciality_id));
    
        // Bind data
        $stmt->bindParam(':speciality_id', $this->speciality_id);
    
        // Execute query
        if($stmt->execute()) {
        return true;
        }
    
        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);
    
        return false;
  }
//*********************************************************** */

  function addLocation() {

    $query = 'INSERT INTO location SET location = :location';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->location = htmlspecialchars(strip_tags($this->location));

    // Bind data 
    $stmt->bindParam(':location', $this->location);

    // Execute query
    if($stmt->execute()) {
    return true;
    }
  }
//*********************************************************** */

  function addSpeciality() {

    $query = 'INSERT INTO speciality SET speciality = :speciality';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Clean data
    $this->speciality = htmlspecialchars(strip_tags($this->speciality));

    // Bind data 
    $stmt->bindParam(':speciality', $this->speciality);

    // Execute query
    if($stmt->execute()) {
    return true;
    }
  }
/**************************************************************************/
  function retreveDoctorRecomendation() {

      // Create query
      $query = 'SELECT *,doctor.doctor_id as "doctorID", SUM(review.stars) / COUNT(review.review_id) AS "AVGstars"
      FROM doctor 
        inner JOIN user on doctor.user_id = user.user_id
        
        inner JOIN speciality ON speciality.speciality_id = doctor.speciality_id 
        
        LEFT JOIN review ON review.doctor_id = doctor.doctor_id
        
        where doctor.validated = "Valited"
        
        GROUP BY doctor.doctor_id';

     // Prepare statement
     $stmt = $this->conn->prepare($query);
  
     // Execute query
     $stmt->execute();

     return $stmt;
  }

//*********************************************************** */

  function retreveSingleDoctorProfileData() {

    // Create query
        $query = 'SELECT *,COUNT(review.review_id) as "nReviews", doctor.doctor_id as "doctorID", SUM(review.stars) / COUNT(review.review_id) AS "AVGstars"
        FROM doctor 
          inner JOIN user on doctor.user_id = user.user_id
          
          inner JOIN speciality ON speciality.speciality_id = doctor.speciality_id 
          
          LEFT JOIN review ON review.doctor_id = doctor.doctor_id
          
          where doctor.validated = "Valited"

          and doctor.doctor_id = :doctorID
          
          GROUP BY doctor.doctor_id';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      $stmt->bindParam(':doctorID', $this->doctorID);

      // Execute query
      $stmt->execute();

      return $stmt;

  }

  function insertReview() {
    // Create query
    $query = 'INSERT INTO review (user_id, doctor_id, stars, review) VALUES (:user_id, :doctor_id, :stars, :review)';

    // Prepare statement
    $stmt = $this->conn->prepare($query);

    // Clean data

    $this->user_id = htmlspecialchars(strip_tags($this->user_id));
    $this->doctor_id = htmlspecialchars(strip_tags($this->doctor_id));
    $this->stars = htmlspecialchars(strip_tags($this->stars));
    $this->review = htmlspecialchars(strip_tags($this->review));

    // Bind data

    $stmt->bindParam(':user_id', $this->user_id);
    $stmt->bindParam(':doctor_id', $this->doctor_id);
    $stmt->bindParam(':stars', $this->stars);
    $stmt->bindParam(':review', $this->review);

    // Execute query
    if($stmt->execute()) {
    return true;
    }
  }
  function getReviews() {

    $query = 'SELECT * FROM review INNER JOIN user ON review.user_id = user.user_id
              WHERE review.doctor_id = :doctor_id';
        
        // Prepare statement
        $stmt = $this->conn->prepare($query);
  
        $stmt->bindParam(':doctor_id', $this->doctor_id);
        // Execute query
        $stmt->execute();
  
        return $stmt;
  }
  /*************************review persentage***************************/
  function fiveStarsPersontage() {
    $query = 'SELECT ((SELECT COUNT(review.review_id) FROM review
              WHERE review.stars = 5 and review.doctor_id = :doctor_id)*100)
              / COUNT(review.review_id) as "fiveStarsCount" 
              FROM review WHERE review.doctor_id = :doctor_id';


    // Prepare statement
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':doctor_id', $this->doctor_id);
    // Execute query
    $stmt->execute();

    return $stmt;
  }
  function fourStarsPersontage() {
    $query = 'SELECT ((SELECT COUNT(review.review_id) FROM review
              WHERE review.stars = 4 and review.doctor_id = :doctor_id)*100)
              / COUNT(review.review_id) as "fourStarsCount" 
              FROM review WHERE review.doctor_id = :doctor_id';


    // Prepare statement
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':doctor_id', $this->doctor_id);
    // Execute query
    $stmt->execute();

    return $stmt;
  }
  function threeStarsPersontage() {
    $query = 'SELECT ((SELECT COUNT(review.review_id) FROM review
              WHERE review.stars = 3 and review.doctor_id = :doctor_id)*100)
              / COUNT(review.review_id) as "threeStarsCount" 
              FROM review WHERE review.doctor_id = :doctor_id';


    // Prepare statement
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':doctor_id', $this->doctor_id);
    // Execute query
    $stmt->execute();

    return $stmt;
  }
  function twoStarsPersontage() {
    $query = 'SELECT ((SELECT COUNT(review.review_id) FROM review
              WHERE review.stars = 2 and review.doctor_id = :doctor_id)*100)
              / COUNT(review.review_id) as "twoStarsCount" 
              FROM review WHERE review.doctor_id = :doctor_id';


    // Prepare statement
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':doctor_id', $this->doctor_id);
    // Execute query
    $stmt->execute();

    return $stmt;
  }
  function oneStarsPersontage() {
    $query = 'SELECT ((SELECT COUNT(review.review_id) FROM review
              WHERE review.stars = 1 and review.doctor_id = :doctor_id)*100)
              / COUNT(review.review_id) as "oneStarsCount" 
              FROM review WHERE review.doctor_id = :doctor_id';


    // Prepare statement
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':doctor_id', $this->doctor_id);
    // Execute query
    $stmt->execute();

    return $stmt;
  }
}