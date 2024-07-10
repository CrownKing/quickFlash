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
-- Table structure for table `flashcard`
--

DROP TABLE IF EXISTS `flashcard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcard` (
  `cardId` int(11) NOT NULL AUTO_INCREMENT,
  `pergunta` varchar(200) NOT NULL,
  `resposta` varchar(1000) DEFAULT NULL,
  `cardBom` int(11) DEFAULT NULL,
  `disciplinaId` int(11) NOT NULL,
  `baralhoId` int(11) NOT NULL,
  PRIMARY KEY (`cardId`,`disciplinaId`,`baralhoId`),
  KEY `fk_flashcard_disciplina1_idx` (`disciplinaId`),
  KEY `fk_flashcard_baralho1_idx` (`baralhoId`),
  CONSTRAINT `fk_flashcard_baralho1` FOREIGN KEY (`baralhoId`) REFERENCES `baralho` (`baralhoId`),
  CONSTRAINT `fk_flashcard_disciplina1` FOREIGN KEY (`disciplinaId`) REFERENCES `disciplina` (`disciplinaId`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcard`
--

LOCK TABLES `flashcard` WRITE;
/*!40000 ALTER TABLE `flashcard` DISABLE KEYS */;
INSERT INTO `flashcard` VALUES (2,'O que é um compilador?','É um programa que traduz codigo escrito em linguagem de maquina',0,4,1),(3,'O que é paginação?','É uma forma de cuidar da memoria disponivel, sem sobrescrever dados e sem perder dados escritos',0,4,1),(4,'O que é a Internet?','É uma rede de redes de computador, criada em uma faculdade do Estados Unidos',0,4,4),(5,'O que é um SGBD?','Sigla para \'\'Sistema gerenciador de banco de dados\'\' é utilizado para acessar de forma ordenada os dados do banco',0,4,5),(6,'O que é um HD','é Hard Disk, um sistema de armazenamento',0,4,1),(7,'O que é um SSD','Solid State Disk um sistema de armazenamento, mas, mais rapido que um HD',0,4,1),(8,'quantas seções tem um disco...','8',0,4,1),(9,'quantos bits tem um Byte','8',0,4,1),(10,'Qual é a diferença entre um compilador e um interpretador?','A principal diferença é que um compilador traduz o código-fonte inteiro em um único arquivo de código de máquina antes da execução, enquanto um interpretador traduz e executa o código linha a linha, sem criar um arquivo de código de máquina separado.',0,4,1),(11,'Quais são as fases típicas em um processo de compilação?',' O processo de compilação é geralmente dividido em fases, que incluem análise léxica, análise sintática, análise semântica, geração de código intermediário, otimização e geração de código de máquina.',0,4,1),(12,'O que é a análise léxica?','A análise léxica é a fase do compilador responsável por dividir o código-fonte em tokens, identificando palavras-chave, identificadores, números, operadores e símbolos.',0,4,1),(13,'O que é a análise sintática?','A análise sintática verifica a estrutura do código-fonte e cria uma árvore de análise (geralmente uma árvore sintática) para representar a estrutura hierárquica do programa.',0,4,1),(14,'O que é a otimização de código?',' A otimização de código é uma fase do compilador que tenta melhorar o desempenho do código gerado, reduzindo o tempo de execução e/ou o consumo de recursos.',0,4,1),(15,'O que é a geração de código de máquina?',' A geração de código de máquina é a fase final do compilador, onde o código intermediário é traduzido em instruções de linguagem de máquina específicas para o hardware de destino, de modo que o programa possa ser executado na máquina-alvo.',0,4,1),(16,'O que é a tabela de símbolos em um compilador?',' A tabela de símbolos é uma estrutura de dados usada pelo compilador para armazenar informações sobre os identificadores (nomes de variáveis, funções, etc.) encontrados no código-fonte. Ela ajuda o compilador a gerenciar escopo, tipos de dados e outras informações importantes.',0,4,1),(17,'O que é a passagem de parâmetros em um compilador?','A passagem de parâmetros refere-se ao mecanismo que um compilador usa para transmitir os valores dos argumentos de uma função ou procedimento para o código que a chama. Isso pode ser feito por valor, por referência ou por outros métodos, dependendo da linguagem de programação.',0,4,1),(18,'O que são erros de compilação, erros de tempo de execução e erros de lógica?','Erros de compilação ocorrem quando o compilador encontra problemas no código-fonte, como sintaxe incorreta. Erros de tempo de execução ocorrem durante a execução do programa devido a condições inesperadas, como divisão por zero. Erros de lógica são problemas que não resultam em erros de compilação ou tempo de execução, mas causam um comportamento indesejado no programa devido a um erro na lógica do código.',0,4,1),(25,'Como os compiladores lidam com o conceito de paginação de código-fonte e quais são os desafios envolvidos nesse processo?','A paginação de código-fonte é um processo no qual os compiladores dividem o código-fonte em unidades menores, geralmente chamadas de páginas ou blocos, para facilitar a compilação e a organização do código. Essa abordagem é especialmente útil ao lidar com programas grandes ou sistemas de software complexos. ',NULL,4,2),(26,'que dia é hj','sexta',NULL,4,2),(27,'quantos pokemons existem?','um montao',NULL,4,2),(28,'qual meu pokemon favorito?','altaria',NULL,4,2),(29,'e qual pokemon eu n gosto?','digglet',NULL,4,2),(30,'teste','teste',NULL,1,1),(31,'teste2','teste2',NULL,1,3),(32,'teste2','teste2',NULL,1,3),(33,'teste2','teste2',NULL,2,3),(34,'teste2','teste2',NULL,2,3),(35,'teste2','teste2',NULL,2,3),(36,'teste2','teste2',NULL,2,3),(37,'teste3','teste3',NULL,2,3),(38,'teste3','teste3',NULL,2,3),(39,'teste4','teste4',NULL,2,3),(40,'teste4','teste4',NULL,2,3),(41,'teste4','teste4',NULL,2,3),(42,'teste4','teste4',NULL,2,3),(43,'teste4','teste4',NULL,2,3),(44,'teste4','teste4',NULL,2,3),(45,'teste4','teste4',NULL,2,3),(46,'teste4','teste4',NULL,2,3),(47,'teste4','teste4',NULL,2,3),(48,'test5','teste5',NULL,2,3),(49,'test5','teste5',NULL,2,3),(50,'test5','teste5',NULL,2,3),(51,'test5','teste5',NULL,2,3),(52,'cartaozinho','2',NULL,2,1),(53,'Essa é uma pergunta bem bem grande apenas pra testar?','Sim realmente é uma pergunta bem grande, nao sei nem pq ela é tao grande assim, mas temos que testar as coisas',1,2,1),(54,'Poc vai ate que dia?','Ate quando eu quiser, mas se deus quiser acaba em junho',1,2,8),(55,'Quantos champs tem no game?','Bastante....',NULL,4,9),(56,'Quantos champs tem no game?','Bastante....',NULL,4,9),(57,'Quantos champs tem no game?','Bastante....',NULL,4,9),(58,'Quantos champs tem no game?','Bastante....',NULL,4,9),(59,'Quantos champs tem no game?','Bastante....',NULL,4,9),(60,'Quantos champs tem no game?','Bastante....',NULL,4,9),(61,'Quantos champs tem no game?','Bastante....',NULL,4,9),(62,'Quantos champs tem no game?','Bastante....',NULL,4,9),(63,'Quantos champs tem no game?','Bastante....',NULL,4,9),(64,'Quantos champs tem no game?','Bastante....',NULL,4,9),(65,'Quantos champs tem no game?','Bastante....',NULL,4,9),(66,'Quantos champs tem no game?','Bastante....',NULL,4,9),(67,'Ta terminado?','Ainda nao mas ta funcional',NULL,1,10),(68,'enviar pra av','manda la',NULL,2,10);
/*!40000 ALTER TABLE `flashcard` ENABLE KEYS */;
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
