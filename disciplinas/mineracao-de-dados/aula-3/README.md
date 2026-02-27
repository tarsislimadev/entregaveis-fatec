# Mineração de Dados - Aula 1 (2026-02-20)

## docker

```bash
docker run -d --name m1 -e MYSQL_ROOT_PASSWORD=m1m1 -p 3306:3306 mariadb:latest
```

## acessar o MariaDB

```bash
docker exec -it m1 mariadb -u root -p  
```
