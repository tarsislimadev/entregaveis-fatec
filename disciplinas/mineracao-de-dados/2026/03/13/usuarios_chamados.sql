-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Mar 13, 2026 at 01:20 PM
-- Server version: 8.0.34
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usuarios_chamados`
--

-- --------------------------------------------------------

--
-- Table structure for table `Chamados`
--

CREATE TABLE `Chamados` (
  `IDchamado` int NOT NULL,
  `Datahora` date DEFAULT NULL,
  `IDusr` int DEFAULT NULL,
  `Prioridade` char(1) DEFAULT NULL,
  `Problema` varchar(200) DEFAULT NULL,
  `Solucao` varchar(200) DEFAULT NULL,
  `Avaliacao` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Chamados`
--

INSERT INTO `Chamados` (`IDchamado`, `Datahora`, `IDusr`, `Prioridade`, `Problema`, `Solucao`, `Avaliacao`) VALUES
(1, '2026-03-12', 1, '1', 'Esqueci a senha do portal corporativo.', 'Realizado o reset de senha e enviado link de ativação por e-mail.', 4),
(2, '2026-03-13', 1, '2', 'Impressora do setor financeiro não imprime em cores.', 'Reinstalado o driver da impressora e calibrados os cartuchos de toner.', 4),
(3, '2026-03-13', 2, '3', 'Planilha de fechamento mensal corrompida.', 'Recuperado backup da versão anterior através do servidor de arquivos.', 3),
(4, '2026-03-13', 2, '4', 'Monitor piscando intermitentemente.', 'Substituído o cabo HDMI e testado em outra entrada de vídeo.', 3),
(5, '2026-03-13', 3, '5', 'Internet lenta e oscilando no departamento de vendas.', 'Identificado loop na rede local causado por um switch secundário.', 3),
(6, '2026-03-13', 3, '6', 'Erro crítico no software de CRM ao gerar relatórios.', 'O problema persiste; encaminhado para análise da equipe de desenvolvimento.', 2),
(7, '2026-03-13', 4, '7', 'Solicitação de novo mouse ergonômico.', 'Pedido aprovado e equipamento entregue ao colaborador.', 4),
(8, '2026-03-13', 4, '8', 'VPN não conecta via Wi-Fi doméstico.', 'Configurado novo protocolo de segurança no cliente VPN do notebook.', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Usuario`
--

CREATE TABLE `Usuario` (
  `IDusr` int NOT NULL,
  `Nome` varchar(40) DEFAULT NULL,
  `Setor` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Usuario`
--

INSERT INTO `Usuario` (`IDusr`, `Nome`, `Setor`) VALUES
(1, 'Nome 1', 'Setor 1'),
(2, 'Nome 2', 'Setor 2'),
(3, 'Nome 3', 'Setor 3'),
(4, 'Nome 4', 'Setor 4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Chamados`
--
ALTER TABLE `Chamados`
  ADD PRIMARY KEY (`IDchamado`);

--
-- Indexes for table `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`IDusr`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Chamados`
--
ALTER TABLE `Chamados`
  MODIFY `IDchamado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `IDusr` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
