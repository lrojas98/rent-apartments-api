-- MySQL dump 10.13  Distrib 8.0.42, for macos15.2 (arm64)
--
-- Host: 127.0.0.1    Database: apartments_db
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apartments`
--

DROP TABLE IF EXISTS `apartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `apartmentType` enum('CORPORATE','TOURIST') NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
INSERT INTO `apartments` VALUES (2,'Propiedad torrenazas','Calle 33 # 33 - 217','CORPORATE','Madrid','España',40.4211720,-3.6686830,'ACTIVE','2025-07-21 06:10:34','2025-07-21 06:10:34',NULL),(3,'Propiedad vinateros','Calle 33 # 33 - 217','TOURIST','Madrid','España',40.4106740,-3.6546330,'ACTIVE','2025-07-21 06:12:20','2025-07-21 06:12:20',NULL),(4,'Guzman del bueno','Calle 33 # 33 - 217','CORPORATE','Madrid','España',40.4340920,-3.7132270,'ACTIVE','2025-07-21 06:13:14','2025-07-21 06:13:14',NULL),(5,'Balseiro','Calle 33 # 33 - 217','TOURIST','Madrid','España',40.4499050,-3.7101900,'ACTIVE','2025-07-21 06:13:48','2025-07-21 06:13:48',NULL),(6,'Maria del portugal','Calle 33 # 33 - 217','CORPORATE','Madrid','España',40.4953610,-3.6643750,'ACTIVE','2025-07-21 06:14:33','2025-07-21 06:14:33',NULL),(7,'Vallecas','Calle 33 # 33 - 217','CORPORATE','Madrid','España',40.3638140,-3.5876110,'ACTIVE','2025-07-21 06:14:55','2025-07-21 06:14:55',NULL),(8,'Botanic (Valencia)','Calle 33 # 33 - 217','TOURIST','Madrid','España',39.4717480,-0.3857860,'ACTIVE','2025-07-21 06:15:27','2025-07-21 06:15:27',NULL),(9,'San ramon (Barcelona)','Calle 33 # 33 - 217','TOURIST','Madrid','España',41.3858910,2.1268380,'ACTIVE','2025-07-21 06:16:08','2025-07-21 06:16:08',NULL),(10,'Bdalona (Barcelona)','Calle 33 # 33 - 217','CORPORATE','Madrid','España',41.4580800,2.2418860,'ACTIVE','2025-07-21 06:16:58','2025-07-21 06:16:58',NULL),(11,'Miami gardens (Miami)','Calle 33 # 33 - 217','CORPORATE','Madrid','España',25.9410630,-80.2002270,'ACTIVE','2025-07-21 06:17:32','2025-07-21 06:17:32',NULL);
/*!40000 ALTER TABLE `apartments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `corporate_tariffs`
--

DROP TABLE IF EXISTS `corporate_tariffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `corporate_tariffs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apartmentId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `monthlyRate` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `apartmentId` (`apartmentId`),
  CONSTRAINT `corporate_tariffs_ibfk_1` FOREIGN KEY (`apartmentId`) REFERENCES `apartments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `corporate_tariffs`
--

LOCK TABLES `corporate_tariffs` WRITE;
/*!40000 ALTER TABLE `corporate_tariffs` DISABLE KEYS */;
INSERT INTO `corporate_tariffs` VALUES (3,2,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:10:34','2025-07-21 06:10:34',NULL),(4,2,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:10:34','2025-07-21 06:10:34',NULL),(5,3,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:12:20','2025-07-21 06:12:20',NULL),(6,3,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:12:20','2025-07-21 06:12:20',NULL),(7,4,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:13:14','2025-07-21 06:13:14',NULL),(8,4,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:13:14','2025-07-21 06:13:14',NULL),(9,5,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:13:48','2025-07-21 06:13:48',NULL),(10,5,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:13:48','2025-07-21 06:13:48',NULL),(11,6,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:14:33','2025-07-21 06:14:33',NULL),(12,6,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:14:33','2025-07-21 06:14:33',NULL),(13,7,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:14:55','2025-07-21 06:14:55',NULL),(14,7,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:14:55','2025-07-21 06:14:55',NULL),(15,8,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:15:27','2025-07-21 06:15:27',NULL),(16,8,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:15:27','2025-07-21 06:15:27',NULL),(17,9,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:16:08','2025-07-21 06:16:08',NULL),(18,9,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:16:08','2025-07-21 06:16:08',NULL),(19,10,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:16:58','2025-07-21 06:16:58',NULL),(20,10,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:16:58','2025-07-21 06:16:58',NULL),(21,11,'2024-12-31','2025-03-30',3000.00,'2025-07-21 06:17:32','2025-07-21 06:17:32',NULL),(22,11,'2025-03-31','2025-12-30',4000.00,'2025-07-21 06:17:32','2025-07-21 06:17:32',NULL);
/*!40000 ALTER TABLE `corporate_tariffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationId` int NOT NULL,
  `concept` enum('RENTAL','SERVICE_FEE') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservationId` (`reservationId`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`reservationId`) REFERENCES `reservations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reservationCode` varchar(50) NOT NULL,
  `apartmentId` int NOT NULL,
  `clientId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` enum('ACTIVE','CANCELLED') NOT NULL DEFAULT 'ACTIVE',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reservationCode` (`reservationCode`),
  KEY `apartmentId` (`apartmentId`),
  KEY `clientId` (`clientId`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`apartmentId`) REFERENCES `apartments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tourist_tariffs`
--

DROP TABLE IF EXISTS `tourist_tariffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tourist_tariffs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apartmentId` int NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `dailyRate` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `apartmentId` (`apartmentId`),
  CONSTRAINT `tourist_tariffs_ibfk_1` FOREIGN KEY (`apartmentId`) REFERENCES `apartments` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tourist_tariffs`
--

LOCK TABLES `tourist_tariffs` WRITE;
/*!40000 ALTER TABLE `tourist_tariffs` DISABLE KEYS */;
INSERT INTO `tourist_tariffs` VALUES (3,2,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:10:34','2025-07-21 06:10:34',NULL),(4,2,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:10:34','2025-07-21 06:10:34',NULL),(5,3,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:12:20','2025-07-21 06:12:20',NULL),(6,3,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:12:20','2025-07-21 06:12:20',NULL),(7,4,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:13:14','2025-07-21 06:13:14',NULL),(8,4,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:13:14','2025-07-21 06:13:14',NULL),(9,5,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:13:48','2025-07-21 06:13:48',NULL),(10,5,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:13:48','2025-07-21 06:13:48',NULL),(11,6,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:14:33','2025-07-21 06:14:33',NULL),(12,6,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:14:33','2025-07-21 06:14:33',NULL),(13,7,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:14:55','2025-07-21 06:14:55',NULL),(14,7,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:14:55','2025-07-21 06:14:55',NULL),(15,8,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:15:27','2025-07-21 06:15:27',NULL),(16,8,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:15:27','2025-07-21 06:15:27',NULL),(17,9,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:16:08','2025-07-21 06:16:08',NULL),(18,9,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:16:08','2025-07-21 06:16:08',NULL),(19,10,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:16:58','2025-07-21 06:16:58',NULL),(20,10,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:16:58','2025-07-21 06:16:58',NULL),(21,11,'2024-12-31','2025-03-30',50.00,'2025-07-21 06:17:32','2025-07-21 06:17:32',NULL),(22,11,'2025-03-31','2025-12-30',100.00,'2025-07-21 06:17:32','2025-07-21 06:17:32',NULL);
/*!40000 ALTER TABLE `tourist_tariffs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-21  9:22:01
