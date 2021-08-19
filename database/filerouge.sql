-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 19, 2021 at 06:11 PM
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

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `user_id`) VALUES
(1, 47);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category`, `description`) VALUES
(1, 'Fitness', 'The ability to undertake sustained physical exertion without undue breathlessness. Fitness is associated with a sense of physical and mental well being.'),
(2, 'Medical advice', 'Medical advice is the provision of a formal professional opinion regarding what a specific individual should or should not do to restore or preserve health. Typically, medical advice involves giving a diagnosis and/or prescribing a treatment for medical condition.'),
(3, 'Diet', 'In nutrition, diet is the sum of food consumed by a person or other organism. The word diet often implies the use of specific intake of nutrition for health or weight-management reasons ');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`comment_id`, `user_id`, `post_id`, `comment`, `dateCreated`) VALUES
(21, 47, 2, 'merci pour l\'information docteur', '2021-08-13 14:53:43'),
(23, 47, 19, 'c vraiment un problème ', '2021-08-13 14:54:38'),
(25, 47, 13, 'merci je vais faire plus d\'éffore ', '2021-08-13 14:55:34'),
(33, 50, 13, 'ismail', '2021-08-14 20:25:13'),
(39, 54, 19, 'fzekjzofh&quot;zio', '2021-08-14 20:57:49'),
(44, 54, 15, 'ismail', '2021-08-16 20:27:48'),
(46, 47, 19, 'MERCI', '2021-08-17 03:27:21'),
(47, 54, 15, 'test', '2021-08-17 03:40:28'),
(48, 54, 33, 'merci', '2021-08-17 09:28:34');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `contact_id` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`contact_id`, `userName`, `subject`, `email`, `phone`, `message`, `dateCreated`) VALUES
(7, 'Illiana', 'Aut anim nulla cupid', 'gucotaqah@mailinator.com', '+1 (501) 165-4306', 'Sit temporibus ipsa', '2021-08-15 18:28:56'),
(8, 'Caesar', 'Cupidatat minus occa', 'hakol@mailinator.com', '+1 (911) 184-6709', 'In nobis adipisicing', '2021-08-15 18:29:01'),
(9, 'Vaughan', 'Sint rerum et quibu', 'kesutitiv@mailinator.com', '+1 (611) 873-9197', 'Voluptatibus atque i', '2021-08-16 11:27:28'),
(10, 'Lana', 'Id consequatur molli', 'lusityxut@mailinator.com', '+1 (744) 383-2173', 'Et saepe suscipit to', '2021-08-16 11:28:35');

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
(13, 47, 6, 'HGJGIK790897', 'Hello from the other side', '[{\"day\":\"Monday\",\"startTime\":\"17:34\",\"closeTime\":\"19:32\"},{\"day\":\"Tuesday\",\"startTime\":\"17:34\",\"closeTime\":\"19:32\"},{\"day\":\"Wednesday\",\"startTime\":\"17:34\",\"closeTime\":\"19:32\"}]', 'Valited'),
(14, 48, 5, 'JFK56CKD', 'Lorem Ipsu', '[{\"day\":\"Monday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Tuesday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Wednesday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Thursday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Friday\",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"},{\"day\":\"Saturday \",\"startTime\":\"09:08\",\"closeTime\":\"16:00\"}]', 'Valited'),
(16, 53, 5, 'HHI79799JI9', 'hello iam ', '[{\"day\":\"Thursday\",\"startTime\":\"20:16\",\"closeTime\":\"12:58\"},{\"day\":\"Monday\",\"startTime\":\"20:16\",\"closeTime\":\"12:58\"},{\"day\":\"Tuesday\",\"startTime\":\"20:16\",\"closeTime\":\"12:58\"}]', 'Valited'),
(17, 54, 9, 'HJHG7890987', 'Bonjour to LE monde', '[]', 'Valited'),
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
(5, 'essaouira'),
(7, 'tanger');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `resources` text NOT NULL,
  `dislikeControle` varchar(255) NOT NULL,
  `commentControle` varchar(255) NOT NULL,
  `dateCreated` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `doctor_id`, `category_id`, `title`, `body`, `image`, `resources`, `dislikeControle`, `commentControle`, `dateCreated`) VALUES
(2, 17, 2, 'when to sleep', 'In general, though, people should aim to fall asleep a few hours after dark and wake up within the first hours of sunlight in the morning, where possible. General guidelines indicate that the average adult needs about 7&amp;ndash;9 hours of sleep each night.\n', '2359817852.jpg', 'www.who.int', 'Anable', 'Anable', '2021-08-02 18:05:30'),
(13, 14, 1, 'be more active', '<p>Fitness is the condition of being physically fit and healthy and involves attributes that include, but are not limited to mental acuity, cardiorespiratory endurance, muscular strength, muscular endurance, body composition, and flexibility.</p>\n', '8549763964.jpg', 'www.who.int', 'Disable', 'Anable', '2021-08-12 01:06:30'),
(15, 20, 1, 'traditional medicine', '<p>t is the sum total of the knowledge, skill, and practices based on the theories, beliefs, and experiences indigenous to different cultures, whether explicable or not, used in the maintenance of health as well as in the prevention, diagnosis, improvement or treatment of physical and mental illness.</p>\n', '5633428903.jpg', 'www.who.int', 'Anable', 'Anable', '2021-08-12 01:11:31'),
(19, 17, 2, 'hospitals are in troble', '<p>Morocco acted decisively to contain the pandemic in the spring, putting the entire country in lockdown and cutting off tourism and other travel.&nbsp;<strong>But like many nations, Morocco is now facing a second, tidal wave of infections</strong>. The country was recording around 5 000 cases a day in mid-November, with around 80 deaths. Over 320 000 people in the country of 37 million have contracted the virus, and around 5 000 have died. The health system is creaking under the weight.</p>\n\n<p>CHU only takes patients with severe cases of COVID-19 &ndash; those requiring intensive care or resuscitation &ndash; and its own employees who&rsquo;ve been infected with the virus. One of the biggest problems the hospital has right now, Dr. Marhoum says, is managing the increasing number of hospital workers who have fallen ill or been exposed to the virus and need to self-isolate for up to 14 days. &ldquo;We&rsquo;re already short-staffed,&rdquo; he says. &ldquo;It&rsquo;s an enormous organisational problem.&rdquo;</p>\n\n<h3>Staring down a pandemic</h3>\n\n<p>When Morocco locked down in the spring, the country had only recorded 77 coronavirus cases. The Moroccan government, however, had watched the virus decimate parts of Spain, and&nbsp;<strong>officials knew that the country&rsquo;s&nbsp;</strong><strong>health system lacked the resources to fend off a similar onslaught</strong>. &ldquo;If we had reached the same level as Europe, we would have been overwhelmed,&rdquo; Dr. Marhoum says.</p>\n\n<p><strong>The drastic measures enabled Morocco to keep the number of deaths low</strong>. The fatality rate&mdash;the number of deaths to total infections&mdash;in the first wave was one of the lowest in the world. As in other parts of Africa, the low death rate is attributed to Morocco&rsquo;s young population.</p>\n\n<p>Lockdowns also bought the government precious time to set up testing facilities and websites and hotlines to communicate with the public. The government worked with global bodies like the World Health Organization to hone its pandemic response and raised urgently needed funds from international lenders, including&nbsp;<strong>the European Investment Bank, which is providing a &euro;200 million loan for medical supplies, training and other measures to reinforce the health system.</strong>&nbsp;These efforts spared the country&rsquo;s fragile health system and its 9 200 public-sector doctors from severe stress.</p>\n', '2063048149.jpg', 'www.who.int', 'Anable', 'Anable', '2021-08-13 13:16:56'),
(33, 17, 2, 'hello', '<p>hello from the other side&nbsp;</p>\n', '2607125718.jpg', '', 'Anable', 'Anable', '2021-08-17 10:28:14');

-- --------------------------------------------------------

--
-- Table structure for table `reaction`
--

CREATE TABLE `reaction` (
  `reation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `postLike` varchar(255) NOT NULL,
  `postDislike` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reaction`
--

INSERT INTO `reaction` (`reation_id`, `user_id`, `post_id`, `postLike`, `postDislike`) VALUES
(33, 57, 19, 'true', 'false'),
(34, 50, 19, 'false', 'true'),
(36, 50, 2, 'false', 'true'),
(37, 57, 2, 'false', 'true'),
(39, 57, 15, 'true', 'false'),
(46, 57, 13, 'true', 'false'),
(47, 50, 13, 'false', 'true'),
(49, 54, 13, 'true', 'false'),
(50, 54, 19, 'true', 'false'),
(51, 54, 15, 'false', 'true'),
(54, 47, 19, 'false', 'true'),
(56, 54, 2, 'false', 'true'),
(57, 54, 33, 'true', 'false');

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
(9, 47, 16, 4, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(11, 53, 16, 3, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(12, 53, 17, 5, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore', '2021-07-28 19:21:27'),
(14, 54, 14, 5, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(15, 47, 17, 4, 'Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit. Vel, A Eaque Laboriosam Ducimus Consequuntur Voluptas Commodi? Nesciunt Cumque Tempore\r\n\r\n', '2021-07-28 19:21:27'),
(33, 47, 13, 3, 'Tres Bon Travail Doctor Merci Pour Votre Service', '2021-08-01 00:57:06'),
(35, 47, 20, 5, 'bonne travaill merci pour votre service doctor monsif', '2021-08-01 13:54:07'),
(37, 48, 20, 3, 'il faut etre un peut plus patient avec les homme agé monsieur.', '2021-08-01 13:56:11'),
(39, 48, 13, 5, 'wow', '2021-08-01 15:23:44'),
(42, 48, 17, 5, 'BRAVO madame layla', '2021-08-01 22:56:22'),
(45, 48, 17, 5, 'fin cv', '2021-08-02 13:46:35'),
(49, 48, 16, 5, 'great worlk man', '2021-08-05 23:44:33'),
(55, 50, 20, 5, 'wow c bizzare', '2021-08-14 00:56:08'),
(58, 57, 13, 3, 'thala', '2021-08-14 17:42:17'),
(59, 57, 14, 4, 'merci doctor', '2021-08-14 17:46:01'),
(60, 54, 14, 4, 'mrci', '2021-08-14 21:58:14'),
(61, 57, 14, 4, 'merci', '2021-08-16 20:38:43'),
(66, 54, 13, 3, 'merci', '2021-08-17 10:25:53');

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
(10, 'Cardiologist'),
(11, 'Emergency medicine');

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
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT 1,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `location_id`, `role`, `FirstName`, `LastName`, `phone`, `email`, `password`, `age`, `username`, `adresse`, `avatar`, `enabled`, `latitude`, `longitude`) VALUES
(47, 1, 'admin', 'Ismail', 'Mnifil', '+212 6 37 27 36 55', 'ismailmnifilpro@gmail.com', 'pass', 23, 'ismailmnifil', '4, Av. Kenedy, Rue De Seville, Ville Nouvelle, Doukkala-Abda, Sa, Safi 46000', '1898013787.JPG', 0, '', ''),
(48, 1, 'Shoose your position', 'Ismail', 'mafid', '21256987655', 'dywa@mailinator.com', 'password', 6, 'youssef.dev', '4, Av. Kenedy, Rue De Seville, Ville Nouvelle, Doukkala-Abda, Sa, Safi 46000', '710767065.JPG', 1, '', ''),
(50, 1, 'Client', 'rafik', 'anfida', '54747484648464', 'xyma@mailinator.com', 'pass', 28, 'rafik', '4, Av. Kenedy, Rue De Seville, Ville Nouvelle, Doukkala-Abda, Sa, Safi 46000', '2028818695.JPG', 1, '', ''),
(53, 1, 'Doctor', 'Ismail', 'bachko', '21256987655', 'AyoubiMISBAHI@mailinator.com', 'password', 20, 'ahmadi', '4, Av. Kenedy, Rue De Seville, Ville Nouvelle, Doukkala-Abda, Sa, Safi 46000', '4989405907.JPG', 1, '', ''),
(54, 1, 'Doctor', 'Layla', 'salami', '21256987655', 'vaves@mailinator.com', 'password', 83, 'Layla.salami', 'Bd sidi abderrahman imm 62 apt 6, Casablanca 20200', '2419594231.JPG', 1, '', ''),
(57, 1, 'Client', 'Ayoube', 'said', '21256987655', 'readOne@gmail.com', 'ayoubireal2020', 23, 'ayoubthegreat', 'Avenue Ibn Batouta, Safi', '9231842253.JPG', 1, '', ''),
(58, 3, 'Doctor', 'Moncef', 'EL ATLASSY', '21256987655', 'ciggy@gmail.com', 'ciggy', 19, 'ciggy', '14 Rue Ibn Rochd, Safi 46000', '2527208628.JPG', 1, '0', ''),
(103, 2, 'Client', 'Nolan', 'Glass', '685754657', 'cetyneqelu@mailinator.com', 'password', 50, 'wapasudyb', 'Veniam obcaecati do', 'defaultAvatar.png', 1, '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `comment_ibfk_1` (`user_id`),
  ADD KEY `comment_ibfk_2` (`post_id`);

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
  ADD KEY `doctor_ibfk_1` (`user_id`),
  ADD KEY `doctor_ibfk_2` (`speciality_id`);

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
  ADD KEY `post_ibfk_1` (`doctor_id`),
  ADD KEY `post_ibfk_2` (`category_id`);

--
-- Indexes for table `reaction`
--
ALTER TABLE `reaction`
  ADD PRIMARY KEY (`reation_id`),
  ADD KEY `reaction_ibfk_1` (`user_id`),
  ADD KEY `reaction_ibfk_2` (`post_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `review_ibfk_1` (`doctor_id`),
  ADD KEY `review_ibfk_2` (`user_id`);

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
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `doctor`
--
ALTER TABLE `doctor`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `reaction`
--
ALTER TABLE `reaction`
  MODIFY `reation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `speciality`
--
ALTER TABLE `speciality`
  MODIFY `speciality_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_ibfk_2` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`speciality_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reaction`
--
ALTER TABLE `reaction`
  ADD CONSTRAINT `reaction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reaction_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
