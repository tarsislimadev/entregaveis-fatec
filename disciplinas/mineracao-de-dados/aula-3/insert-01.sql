use taxi;

insert into cliente (nome, cpf) values ('Nome 1', '12345678901');
insert into cliente (nome, cpf) values ('Nome 2', '12345678902');
insert into cliente (nome, cpf) values ('Nome 3', '12345678903');
insert into cliente (nome, cpf) values ('Nome 4', '12345678904');
insert into cliente (nome, cpf) values ('Nome 5', '12345678905');
insert into cliente (nome, cpf) values ('Nome 6', '12345678906');
insert into cliente (nome, cpf) values ('Nome 7', '12345678907');
insert into cliente (nome, cpf) values ('Nome 8', '12345678908');
insert into cliente (nome, cpf) values ('Nome 9', '12345678909');

insert into taxi (placa, marca, anofab) values ('ABC1234', 'Toyota', '2020');
insert into taxi (placa, marca, anofab) values ('ABC1235', 'Honda', '2021');
insert into taxi (placa, marca, anofab) values ('ABC1236', 'Fiat', '2022');
insert into taxi (placa, marca, anofab) values ('ABC1237', 'Ford', '2023');
insert into taxi (placa, marca, anofab) values ('ABC1238', 'Chevrolet', '2024');
insert into taxi (placa, marca, anofab) values ('ABC1239', 'Volkswagen', '2025');
insert into taxi (placa, marca, anofab) values ('ABC1240', 'Hyundai', '2026');
insert into taxi (placa, marca, anofab) values ('ABC1241', 'Kia', '2027');
insert into taxi (placa, marca, anofab) values ('ABC1242', 'Renault', '2028');

insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 1, 'ABC1234');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 2, 'ABC1235');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 3, 'ABC1236');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 4, 'ABC1237');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 5, 'ABC1238');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 6, 'ABC1239');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 7, 'ABC1240');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 8, 'ABC1241');
insert into corrida (datapedido, cliid, placa) values ('2022-01-01', 9, 'ABC1242');
