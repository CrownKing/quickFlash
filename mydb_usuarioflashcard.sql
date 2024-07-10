-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.14-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `usuarioflashcard`
--

DROP TABLE IF EXISTS `usuarioflashcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarioflashcard` (
  `usuarioId` int(11) NOT NULL,
  `cardId` int(11) NOT NULL,
  `dataProximaResposta` varchar(45) DEFAULT NULL,
  `caixaId` int(11) DEFAULT NULL,
  PRIMARY KEY (`usuarioId`,`cardId`),
  KEY `fk_usuario_flashcard_usuario1_idx` (`usuarioId`),
  KEY `fk_usuario_flashcard_flashcard1_idx` (`cardId`),
  CONSTRAINT `fk_usuario_flashcard_flashcard1` FOREIGN KEY (`cardId`) REFERENCES `flashcard` (`cardId`),
  CONSTRAINT `fk_usuario_flashcard_usuario1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarioflashcard`
--

LOCK TABLES `usuarioflashcard` WRITE;
/*!40000 ALTER TABLE `usuarioflashcard` DISABLE KEYS */;
INSERT INTO `usuarioflashcard` VALUES (16,2,'27/03/2024, 23:20:53',1),(16,3,'2024-04-23 15:37:15.024',4),(16,6,NULL,1),(16,7,'27/03/2024, 23:21:34',3),(16,8,'27/03/2024, 23:21:37',4),(16,9,'27/03/2024, 23:26:00',3),(16,10,NULL,1),(16,11,'2024-04-04 14:30:49.368',1),(16,12,NULL,1),(16,13,NULL,1),(16,14,NULL,1),(16,15,NULL,1),(16,16,NULL,1),(16,17,NULL,1),(16,18,NULL,1),(16,30,NULL,1),(16,52,NULL,1),(16,53,NULL,1),(16,55,NULL,1),(16,56,NULL,1),(16,57,NULL,1),(16,58,NULL,1),(16,59,NULL,1),(16,60,NULL,1),(16,61,NULL,1),(16,62,NULL,1),(16,63,NULL,1),(16,64,NULL,1),(16,65,NULL,1),(16,66,NULL,1),(16,67,NULL,1),(16,68,NULL,1);
/*!40000 ALTER TABLE `usuarioflashcard` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-22 22:17:56
