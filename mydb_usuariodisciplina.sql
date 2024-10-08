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
-- Table structure for table `usuariodisciplina`
--

DROP TABLE IF EXISTS `usuariodisciplina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuariodisciplina` (
  `disciplinaId` int(11) NOT NULL,
  `usuarioId` int(11) NOT NULL,
  PRIMARY KEY (`disciplinaId`,`usuarioId`),
  KEY `fk_usuario_administra_disciplina_disciplina1_idx` (`disciplinaId`),
  KEY `fk_usuario_administra_disciplina_usuario1_idx` (`usuarioId`),
  CONSTRAINT `fk_usuario_administra_disciplina_disciplina1` FOREIGN KEY (`disciplinaId`) REFERENCES `disciplina` (`disciplinaId`),
  CONSTRAINT `fk_usuario_administra_disciplina_usuario1` FOREIGN KEY (`usuarioId`) REFERENCES `usuario` (`usuarioId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariodisciplina`
--

LOCK TABLES `usuariodisciplina` WRITE;
/*!40000 ALTER TABLE `usuariodisciplina` DISABLE KEYS */;
INSERT INTO `usuariodisciplina` VALUES (1,3),(2,1),(3,2);
/*!40000 ALTER TABLE `usuariodisciplina` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-22 22:17:55
