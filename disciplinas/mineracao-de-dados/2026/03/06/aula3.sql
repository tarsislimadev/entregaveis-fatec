CREATE DATABASE IF NOT EXISTS aula3;

USE aula3;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `Curso` (
  `idCurso` int NOT NULL,
  `Curso` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Curso` (`idCurso`, `Curso`) VALUES
(1, 'SQL'),
(2, 'PHP'),
(3, 'Java'),
(4, 'PFSense');

CREATE TABLE `Curso_Funcionario` (
  `idCursofuncionario` int NOT NULL,
  `idCurso` int NOT NULL,
  `idFuncionario` int NOT NULL,
  `oferta` date DEFAULT NULL,
  `aprovado` char(1) DEFAULT NULL
);

INSERT INTO `Curso_Funcionario` (`idCursofuncionario`, `idCurso`, `idFuncionario`, `oferta`, `aprovado`) VALUES
(1, 3, 123, '2018-05-30', 'S'),
(2, 3, 152, '2018-05-30', 'N'),
(3, 3, 222, '2018-05-30', 'S'),
(4, 1, 123, '2018-10-20', 'S'),
(5, 1, 152, '2018-10-20', 'S'),
(6, 4, 222, '2018-11-27', '');

CREATE TABLE `Departamento` (
  `idDepartamento` int NOT NULL,
  `dNome` varchar(255) NOT NULL,
  `Orcamento` decimal(10,0) NOT NULL
);

INSERT INTO `Departamento` (`idDepartamento`, `dNome`, `Orcamento`) VALUES
(1, 'Financeiro', 15000),
(2, 'TI', 60000),
(3, 'Gestão de Pessoas', 150000),
(4, 'Pesquisa e Desenvolvimento', 7500),
(5, 'Jurídico', 1000);

CREATE TABLE `Funcionario` (
  `idFuncionario` int NOT NULL,
  `Nome` varchar(45) NOT NULL,
  `Sobrenome` varchar(45) NOT NULL,
  `idDepartamento` int NOT NULL
);

INSERT INTO `Funcionario` (`idFuncionario`, `Nome`, `Sobrenome`, `idDepartamento`) VALUES
(123, 'Julio', 'Silva', 1),
(152, 'Arnaldo', 'Coelho', 1),
(222, 'Carol', 'Ferreira', 2),
(326, 'João', 'Silveira', 2),
(331, 'George', 'de la Rocha', 3),
(332, 'José', 'Oliveira', 1),
(546, 'José', 'Pereira', 4),
(631, 'David', 'Luz', 3),
(654, 'Zacarias', 'Ferreira', 4),
(745, 'Eric', 'Estrada', 4),
(845, 'Elizabeth', 'Coelho', 1),
(846, 'Joaquim', 'Goveia', 1);

ALTER TABLE `Curso`
  ADD PRIMARY KEY (`idCurso`);

ALTER TABLE `Curso_Funcionario`
  ADD PRIMARY KEY (`idCursofuncionario`),
  ADD KEY `idFuncionario` (`idFuncionario`),
  ADD KEY `idCurso` (`idCurso`);

ALTER TABLE `Departamento`
  ADD PRIMARY KEY (`idDepartamento`);

ALTER TABLE `Funcionario`
  ADD PRIMARY KEY (`idFuncionario`),
  ADD KEY `fk_Funcionario_Departamento` (`idDepartamento`);


ALTER TABLE `Curso_Funcionario`
  ADD CONSTRAINT `Curso_Funcionario_ibfk_1` FOREIGN KEY (`idFuncionario`) REFERENCES `Funcionario` (`idFuncionario`),
  ADD CONSTRAINT `Curso_Funcionario_ibfk_2` FOREIGN KEY (`idCurso`) REFERENCES `Curso` (`idCurso`);

ALTER TABLE `Funcionario`
  ADD CONSTRAINT `fk_Funcionario_Departamento` FOREIGN KEY (`idDepartamento`) REFERENCES `Departamento` (`idDepartamento`);

COMMIT;
