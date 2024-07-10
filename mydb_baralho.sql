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
-- Table structure for table `baralho`
--

DROP TABLE IF EXISTS `baralho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `baralho` (
  `baralhoId` int(11) NOT NULL AUTO_INCREMENT,
  `baralhoNome` varchar(100) DEFAULT NULL,
  `criadorId` int(11) DEFAULT NULL,
  `baralhoBom` int(11) DEFAULT NULL,
  PRIMARY KEY (`baralhoId`),
  KEY `criadorId` (`criadorId`),
  CONSTRAINT `baralho_ibfk_1` FOREIGN KEY (`criadorId`) REFERENCES `usuario` (`usuarioId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `baralho`
--

LOCK TABLES `baralho` WRITE;
/*!40000 ALTER TABLE `baralho` DISABLE KEYS */;
INSERT INTO `baralho` VALUES (1,'Compiladores P1',1,1),(2,'Compiladores P2',1,1),(3,'Compiladores P3',1,1),(4,'P1 redes',2,1),(5,'P1 BD',3,1),(7,'baralhoteste',11,NULL),(8,'POC',15,0),(9,'Teste aplicado a LOL',16,0),(10,'Poc acaba se deus quiser',16,0);
/*!40000 ALTER TABLE `baralho` ENABLE KEYS */;
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
