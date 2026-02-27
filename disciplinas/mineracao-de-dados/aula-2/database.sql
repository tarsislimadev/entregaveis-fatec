drop database taxi;

-- 

create database taxi;

use taxi;

create table cliente(
  cliid int AUTO_INCREMENT PRIMARY KEY,
  nome varchar(40) not null,
  cpf varchar(11) unique not null
);

create table taxi(
  placa varchar(30) PRIMARY KEY,
  marca varchar(20) not null,
  anofab int default '2020'
);

show columns from cliente;

create table corrida(
  idcorrida int AUTO_INCREMENT PRIMARY KEY,
  datapedido date not null,
  cliid int not null references cliente (cliid),
  placa varchar(7) not null references taxi (placa)
  on delete cascade
  on update cascade
);

create index taxista on corrida(placa);

