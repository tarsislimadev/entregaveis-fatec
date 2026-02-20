# Mineração de Dados - Aula 1 (2026-02-20)

## Iniciando

Instalar Xampp

Rodar phpMyAdmin

## Instruções SQL

Criar banco de dados

```sql
create database taxi;
```

Usar banco de dados

```sql
use taxi;
```

Criar tabela `cliente`

```sql
create table cliente(
  cliid int AUTO_INCREMENT PRIMARY KEY,
  nome varchar(40) not null,
  cpf varchar(11) unique not null,
);
```

Criar tabela `taxi`

```sql
create table taxi(
  placa varchar(30) PRIMARY KEY,
  marca varchar(20) not null,
  anofab int default '2020',
);
```

Ver a estrutura da tabela

```sql
show columns from cliente;
```

Criar tabela `corrida`

```sql
create table corrida(
  idcorrida int AUTO_INCREMENT,
  datapedido date not null,
  cliid int not null,
  placa varchar(7) not null,
  primary key(idcorrida),
  foreign key (cliid) references cliente (cliid),
  foreign key (placa) references taxi (placa)
  on delete cascade
  on update cascade
);
```
