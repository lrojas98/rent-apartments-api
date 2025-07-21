-- MySQL dump 10.13  Distrib 8.0.42, for macos15.2 (arm64)
--
-- Host: 127.0.0.1    Database: apartments_content_db
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
-- Table structure for table `property_content`
--

DROP TABLE IF EXISTS `property_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apartmentCode` int NOT NULL,
  `description` text,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `apartmentCode` (`apartmentCode`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_content`
--

LOCK TABLES `property_content` WRITE;
/*!40000 ALTER TABLE `property_content` DISABLE KEYS */;
INSERT INTO `property_content` VALUES (2,2,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:10:34','2025-07-21 06:10:34',NULL),(3,3,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:12:20','2025-07-21 06:12:20',NULL),(4,4,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:13:14','2025-07-21 06:13:14',NULL),(5,5,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:13:48','2025-07-21 06:13:48',NULL),(6,6,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:14:33','2025-07-21 06:14:33',NULL),(7,7,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:14:55','2025-07-21 06:14:55',NULL),(8,8,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:15:27','2025-07-21 06:15:27',NULL),(9,9,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:16:08','2025-07-21 06:16:08',NULL),(10,10,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:16:58','2025-07-21 06:16:58',NULL),(11,11,'En resumen, un hotel es un lugar donde las personas pueden hospedarse y disfrutar de diversos servicios durante sus viajes, ya sean de placer o negocios.','https://www.homeclub.com/assets/img/hc-interiorismo-375-400.jpg','2025-07-21 06:17:32','2025-07-21 06:17:32',NULL);
/*!40000 ALTER TABLE `property_content` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-21  9:24:12
