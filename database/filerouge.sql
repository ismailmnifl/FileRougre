-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2021 at 12:10 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `filerouge`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `dateCreated` datetime NOT NULL,
  `deleted` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `subject` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `message` text NOT NULL,
  `dateCreated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor`
--

CREATE TABLE `doctor` (
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `speciality_id` int(11) NOT NULL,
  `matricule` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `schedule` text NOT NULL,
  `validated` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor`
--

INSERT INTO `doctor` (`doctor_id`, `user_id`, `speciality_id`, `matricule`, `description`, `schedule`, `validated`) VALUES
(13, 47, 6, 'HGJGIK790897', 'hello averyone you ain good hands', '[{\"day\":\"Monday\",\"startTime\":\"03:47\",\"closeTime\":\"04:47\"},{\"day\":\"Tuesday\",\"startTime\":\"03:47\",\"closeTime\":\"04:47\"},{\"day\":\"Wednesday\",\"startTime\":\"03:47\",\"closeTime\":\"04:47\"},{\"day\":\"Thursday\",\"startTime\":\"03:47\",\"closeTime\":\"04:47\"},{\"day\":\"Friday\",\"startTime\":\"03:47\",\"closeTime\":\"04:47\"}]', 'Valited'),
(14, 48, 5, 'JFK56CKD', 'Lorem Ipsu', '[{\"day\":\"Monday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Tuesday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Wednesday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Thursday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Friday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Saturday \",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"}]', 'Valited'),
(15, 52, 6, 'HKHJ7899HJ', 'Hello from', '[{\"day\":\"Monday\",\"startTime\":\"04:49\",\"closeTime\":\"08:49\"},{\"day\":\"Tuesday\",\"startTime\":\"04:49\",\"closeTime\":\"08:49\"},{\"day\":\"Wednesday\",\"startTime\":\"04:49\",\"closeTime\":\"08:49\"},{\"day\":\"Thursday\",\"startTime\":\"04:49\",\"closeTime\":\"08:49\"},{\"day\":\"Friday\",\"startTime\":\"04:49\",\"closeTime\":\"08:49\"}]', 'Valited'),
(16, 53, 5, 'HHI79799JI9', 'hello iam ', '[{\"day\":\"Thursday\",\"startTime\":\"20:16\",\"closeTime\":\"12:58\"},{\"day\":\"Monday\",\"startTime\":\"20:16\",\"closeTime\":\"12:58\"},{\"day\":\"Tuesday\",\"startTime\":\"20:16\",\"closeTime\":\"12:58\"}]', 'Valited'),
(17, 54, 9, 'HJHG7890987', 'Bonjour to', '[{\"day\":\"Wednesday\",\"startTime\":\"07:02\",\"closeTime\":\"09:07\"},{\"day\":\"Monday\",\"startTime\":\"07:02\",\"closeTime\":\"09:07\"},{\"day\":\"Tuesday\",\"startTime\":\"07:02\",\"closeTime\":\"09:07\"},{\"day\":\"Thursday\",\"startTime\":\"07:02\",\"closeTime\":\"09:07\"},{\"day\":\"Friday\",\"startTime\":\"07:02\",\"closeTime\":\"09:07\"}]', 'Valited'),
(20, 58, 10, 'HKHJ7899HJ', 'li mred bl9lb yji', '[{\"day\":\"Monday\",\"startTime\":\"19:29\",\"closeTime\":\"20:29\"},{\"day\":\"Tuesday\",\"startTime\":\"19:29\",\"closeTime\":\"20:29\"},{\"day\":\"Wednesday\",\"startTime\":\"19:29\",\"closeTime\":\"20:29\"},{\"day\":\"Thursday\",\"startTime\":\"19:29\",\"closeTime\":\"20:29\"}]', 'Valited');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location`) VALUES
(1, 'Safi'),
(2, 'Marrakech'),
(3, 'casablanca'),
(4, 'Agadir'),
(5, 'essaouira');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL,
  `dateModified` datetime NOT NULL,
  `deleted` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `stars` int(11) NOT NULL,
  `review` text NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `user_id`, `doctor_id`, `stars`, `review`, `dateCreated`) VALUES
(7, 49, 13, 4, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:19:37'),
(8, 50, 13, 3, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(9, 47, 16, 4, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(10, 52, 16, 5, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(11, 53, 16, 3, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(12, 53, 17, 5, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore', '2021-07-28 19:21:27'),
(13, 50, 14, 3, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(14, 54, 14, 5, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(15, 47, 17, 4, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(19, 50, 17, 5, 'hello', '2021-07-29 16:31:57'),
(21, 47, 15, 4, 'GREAT JOB', '2021-07-29 16:32:53'),
(22, 54, 15, 3, 'TRAVAIL MEDIOCRE', '2021-07-29 16:38:26'),
(25, 50, 15, 3, 'TRAVAIL MEDIOCRE', '2021-07-29 16:43:14'),
(26, 52, 14, 5, 'bonne travail', '2021-07-29 16:45:01'),
(27, 50, 17, 5, 'Tres bonne travail merci beacoup pour votre service Dr hicham', '2021-07-29 16:48:23'),
(33, 47, 13, 3, 'Tres Bon Travail Doctor Merci Pour Votre Service', '2021-08-01 00:57:06'),
(35, 47, 20, 5, 'bonne travaill merci pour votre service doctor monsif', '2021-08-01 13:54:07'),
(37, 48, 20, 3, 'il faut etre un peut plus patient avec les homme agé monsieur.', '2021-08-01 13:56:11'),
(39, 48, 13, 5, 'wow', '2021-08-01 15:23:44'),
(40, 48, 20, 3, 'sir t9awad', '2021-08-01 21:56:48'),
(42, 48, 17, 5, 'BRAVO madame layla', '2021-08-01 22:56:22'),
(43, 48, 15, 4, 'bravo', '2021-08-02 11:09:35');

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `day` varchar(255) NOT NULL,
  `startTime` time NOT NULL,
  `closeTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `speciality`
--

CREATE TABLE `speciality` (
  `speciality_id` int(11) NOT NULL,
  `speciality` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `speciality`
--

INSERT INTO `speciality` (`speciality_id`, `speciality`) VALUES
(3, 'dermatologist'),
(5, 'epidemiologist'),
(6, 'surgent'),
(8, 'General surgent'),
(9, 'Infectious disease doctor'),
(10, 'Cardiologist');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `phone` bigint(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `latitude` int(11) NOT NULL,
  `longitude` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `location_id`, `role`, `FirstName`, `LastName`, `phone`, `email`, `password`, `age`, `username`, `adresse`, `avatar`, `latitude`, `longitude`) VALUES
(47, 1, 'doctor', 'Ismail', 'Ismail', 21237273655, 'ismailmnifilpro@gmail.com', 'pass', 23, 'ismailmnifil', '6, Rue Khadir Ghailane, Doukkala-Abda, 46000, Safi, 46000', '2832374713.JPG', 0, 0),
(48, 2, 'Shoose your position', 'youssef', 'youssef', 21256987655, 'dywa@mailinator.com', 'password', 6, 'youssef.dev', '1°étage, Bd Sidi Mohamed Ben Abdallah, imm. Bleu de Safi, Safi', '7990973258.JPG', 0, 0),
(49, 1, 'Shoose your position', 'said', 'adim', 21256987655, 'zehicu@mailinator.com', 'password', 73, 'said', '14 Rue Ibn Rochd, Safi 46000', '9944036163.JPG', 0, 0),
(50, 3, 'Client', 'rafik', 'anfida', 21256987655, 'anfidaTazi@mailinator.com', 'password', 51, 'anfidaTazi', '22 Boulevard Yacoub El Mansour, Espace El Mansour &amp;amp;quot;éme étage numéo 28, Casablanca 20000', '8469651856.JPG', 0, 0),
(52, 1, 'Doctor', 'hicham', 'hicham', 21256987655, 'hicham@gmail.com', 'hicham123', 24, 'hichaaam', '9 qu l\'hôpital, Av. Moulay Abdellah, Safi', '9413847791.JPG', 0, 0),
(53, 3, 'Doctor', 'Ayoub', 'misbahi', 21256987655, 'AyoubiMISBAHI@mailinator.com', 'password', 20, 'ahmadi', 'Avenue Ibn Batouta, Safi', '4989405907.JPG', 0, 0),
(54, 5, 'Doctor', 'Layla', 'salami', 21256987655, 'vaves@mailinator.com', 'password', 83, 'Layla.salami', 'Bd sidi abderrahman imm 62 apt 6, Casablanca 20200', '9620172241.JPG', 0, 0),
(57, 1, 'Client', 'redone', 'redone', 21256987655, 'readOne@gmail.com', 'hicham123', 23, 'redOne', 'Avenue Ibn Batouta, Safi', '9231842253.JPG', 0, 0),
(58, 3, 'Doctor', 'Mohamed Moncef', 'EL ATLASSY', 21256987655, 'ciggy@gmail.com', 'ciggy', 19, 'ciggy', '14 Rue Ibn Rochd, Safi 46000', '2527208628.JPG', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `speciality_id` (`speciality_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `speciality`
--
ALTER TABLE `speciality`
  ADD PRIMARY KEY (`speciality_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `location_id` (`location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speciality`
--
ALTER TABLE `speciality`
  MODIFY `speciality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`speciality_id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `schedule`
--
ALTER TABLE `schedule`
  ADD CONSTRAINT `schedule_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
