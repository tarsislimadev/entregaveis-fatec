# Linguagem de Programação 2 - 2026/04/23

## Python Decorator

Um "decorator" em Python é uma função que recebe outra função e retorna uma nova função com comportamento adicional, sem alterar o código original.

Ele é aplicado com `@nome_do_decorator` acima da função.

Exemplo:

```python
def log_execucao(func):
	def wrapper(*args, **kwargs):
		print(f"Executando: {func.__name__}")
		return func(*args, **kwargs)
	return wrapper

@log_execucao
def somar(a, b):
	return a + b

print(somar(2, 3))
```

Nesse exemplo, o decorator adiciona um log antes de executar a função `somar`.

## Python sqlalchemy

SQLAlchemy é uma biblioteca ORM (Object-Relational Mapper) para Python, usada para mapear classes Python em tabelas de banco de dados.

Ela permite:

- Definir modelos com classes;
- Criar consultas SQL usando Python;
- Manipular dados sem escrever SQL bruto o tempo todo.

Exemplo simples:

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()

class Usuario(Base):
	__tablename__ = "usuarios"
	id = Column(Integer, primary_key=True)
	nome = Column(String)

engine = create_engine("sqlite:///banco.db")
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

novo_usuario = Usuario(nome="Ana")
session.add(novo_usuario)
session.commit()
```

Nesse exemplo, a classe `Usuario` representa a tabela `usuarios`, e os dados são salvos no banco SQLite.

## The Twelve-Factor App

O "The Twelve-Factor App" é uma metodologia para construir aplicações SaaS modernas, portáveis, escaláveis e fáceis de manter.

Ela define 12 princípios:

1. "Codebase": uma base de código versionada, com múltiplos deploys.

2. "Dependencies": declarar e isolar dependências explicitamente.

3. "Config": armazenar configurações no ambiente, não no código.

4. "Backing Services": tratar serviços externos (banco, cache, fila) como recursos anexados.

5. "Build, Release, Run": separar as etapas de build, release e execução.

6. "Processes": executar a aplicação como processos stateless (sem estado).

7. "Port Binding": expor serviços via bind de portas.

8. "Concurrency": escalar por meio de múltiplos processos.

9. "Disposability": inicialização rápida e encerramento gracioso.

10. "Dev/Prod Parity": manter desenvolvimento e produção o mais parecidos possível.

11. "Logs": tratar logs como fluxo de eventos.

12. "Admin Processes": executar tarefas administrativas como processos pontuais.

Seguir esses fatores ajuda a criar aplicações mais consistentes entre ambientes e mais preparadas para cloud.
