# Linguagem de Programção - 2026/04/30

## FastAPI

FastAPI é um framework moderno para criar APIs com Python de forma rápida, organizada e com alta performance.

### Principais vantagens

- "Alta performance": utiliza Starlette e Pydantic, com desempenho próximo ao de frameworks em Node.js e Go.
- "Produtividade": permite criar endpoints com pouco código e tipagem clara.
- "Validação automática": os dados de entrada e saída são validados com base em tipos Python.
- "Documentação automática": gera interfaces em `/docs` (Swagger UI) e `/redoc` sem configuração extra.

### Exemplo básico

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
return {"message": "Olá, FastAPI!"}
```

### Como executar

1. Instale as dependências:
```bash
pip install fastapi uvicorn
```
2. Execute o servidor:
```bash
uvicorn main:app --reload
```
3. Acesse:
- API: `http://127.0.0.1:8000`
- Documentação: `http://127.0.0.1:8000/docs`

### Conceitos importantes

- "Path Parameters": valores na rota, como `/users/{id}`.
- "Query Parameters": filtros na URL, como `?limit=10`.
- "Body (JSON)": envio de dados estruturados em requisições POST/PUT.
- "Models com Pydantic": definem e validam o formato dos dados.

FastAPI é ideal para projetos acadêmicos e profissionais que exigem APIs bem estruturadas, documentação clara e desenvolvimento ágil.

## Como dois processos (PIDs) trocam mensagens?

Dois processos podem trocar mensagens através de diferentes mecanismos de comunicação entre processos (IPC - Inter-Process Communication):

### 1. Pipes (Tubos)
- Comunicação unidirecional entre processos relacionados (parent-child).
- Um processo escreve dados, outro lê.
- Exemplo: `cat file.txt | grep palavra`

### 2. Named Pipes (FIFOs)
- Pipes nomeados que permitem comunicação entre processos não relacionados.
- Criados no sistema de arquivos com `mkfifo`.
- Um processo escreve, outro lê pelo nome da pipe.

### 3. Sockets
- Bidirecionais, permitem comunicação entre processos locais ou remotos.
- Unix sockets: comunicação local eficiente.
- TCP/IP sockets: comunicação em rede.

### 4. Message Queues
- Fila de mensagens onde processos enviam e recebem estruturas de dados.
- Cada mensagem tem tipo e conteúdo.
- Sistema gerencia a fila automaticamente.

### 5. Shared Memory (Memória Compartilhada)
- Ambos os processos acessam a mesma região de memória.
- Muito rápido, mas requer sincronização (mutexes, semáforos).
- Alto risco se não sincronizado corretamente.

### 6. Signals (Sinais)
- Notificações assíncronas entre processos.
- Limitadas a sinais predefinidos (SIGTERM, SIGUSR1, etc.).
- Não carregam dados complexos.

### Exemplo prático com Pipes:
```python
import os
import subprocess

# Criando dois processos que se comunicam via pipe
p1 = subprocess.Popen(['echo', 'mensagem'], stdout=subprocess.PIPE)
p2 = subprocess.Popen(['cat'], stdin=p1.stdout)
p1.stdout.close()
p2.wait()
```

A escolha do mecanismo depende de requisitos como performance, complexidade dos dados e se a comunicação é local ou remota.

## Modelo OSI

O Modelo OSI (Open Systems Interconnection) é um framework que descreve como os dados são transmitidos através de redes. Ele divide a comunicação em 7 camadas, cada uma com funções específicas.

### As 7 Camadas do Modelo OSI

1. Camada Física (Layer 1)
- Transmissão de bits brutos pelo meio físico (cabos, fibra óptica, ondas de rádio).
- Inclui conectores, voltagem, frequência, sincronização.

2. Camada de Enlace de Dados (Layer 2)
- Estabelece comunicação entre dispositivos na mesma rede local.
- MAC addresses, switches, frames de dados.
- Exemplos: Ethernet, Wi-Fi.

3. Camada de Rede (Layer 3)
- Roteamento de pacotes entre redes diferentes.
- IP addresses (IPv4, IPv6), routers.
- Determina o melhor caminho para os dados.

4. Camada de Transporte (Layer 4)
- Controla a entrega fim-a-fim dos dados.
- TCP (confiável) e UDP (rápido).
- Gerencia portas, fluxo de dados e confiabilidade.

5. Camada de Sessão (Layer 5)
- Estabelece, mantém e encerra conexões (sessões).
- Sincronização e gerenciamento de diálogos entre aplicações.

6. Camada de Apresentação (Layer 6)
- Traduz, criptografa e comprime dados.
- Conversão entre diferentes formatos (ASCII, Unicode, JPEG, etc.).
- SSL/TLS para criptografia.

7. Camada de Aplicação (Layer 7)
- Interface direta com o usuário e aplicações.
- Protocolos: HTTP, HTTPS, FTP, SMTP, DNS, SSH.
- FastAPI funciona nesta camada.

### Exemplo de fluxo de comunicação

Quando você acessa `http://127.0.0.1:8000/docs`:
1. Camada 7: Navegador envia requisição HTTP.
2. Camada 6: Dados são formatados e criptografados (se HTTPS).
3. Camada 5: Sessão é estabelecida.
4. Camada 4: TCP garante entrega confiável na porta 8000.
5. Camada 3: IP roteia para o endereço local.
6. Camada 2: Ethernet entrega o frame para a interface de rede.
7. Camada 1: Bits são transmitidos pelo cabo ou Wi-Fi.

### Mnemônico

Uma forma comum de lembrar as 7 camadas de cima para baixo: "All People Seem To Need Data Processing" (Todas as Pessoas Parecem Precisar de Processamento de Dados).

## uvicorn main:app --reload

Este comando inicia um servidor de desenvolvimento usando o Uvicorn, um servidor ASGI (Asynchronous Server Gateway Interface) de alta performance.

### Breakdown do comando

- uvicorn: Servidor ASGI que executa aplicações FastAPI.
- main: Nome do arquivo Python (main.py) que contém a aplicação.
- app: Nome da instância da aplicação FastAPI criada no arquivo.
- --reload: Flag que ativa o "hot reload", recarregando o servidor automaticamente quando há mudanças no código.

### Uso prático

```bash
uvicorn main:app --reload
```

Saída esperada:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started server process [12345]
INFO:     Waiting for application startup.
```

### Opções adicionais úteis

- `--host 0.0.0.0`: Permite acessar o servidor de outros computadores na rede.
- `--port 8080`: Muda a porta padrão (8000) para outra.
- `--workers 4`: Executa múltiplos processos workers para maior concorrência.
- `--log-level debug`: Define o nível de logging (debug, info, warning, error).

### Exemplo com opções

```bash
uvicorn main:app --reload \
  --host 0.0.0.0 --port 8080
```

O `--reload` é ideal para desenvolvimento, mas deve ser desativado em produção por questões de segurança e performance.

## Path Parameters

Path parameters são partes da rota que representam valores variáveis, usados para identificar recursos.

Exemplo em FastAPI:

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int):
  return {"user_id": user_id}
```

Notas:

- No exemplo, `{user_id}` no caminho vira parâmetro `user_id` na função.
- Tipagem (como `int`) faz validação automática e conversão.
- Path parameters são obrigatórios por padrão.

## Query Parameters

Query parameters são pares chave-valor anexados à URL após `?`, usados para filtros, paginação e opções opcionais.

Exemplo em FastAPI:

```python
from typing import Optional
from fastapi import FastAPI

app = FastAPI()

@app.get("/items/")
def list_items(limit: int = 10, q: Optional[str] = None):
  return {"limit": limit, "q": q}
```

Uso na URL: `/items/?limit=5&q=texto`.

Notas:
- Parâmetros de query são opcionais se tiverem valor default.
- Tipagem também valida e converte valores.
- São ideais para filtros, ordenação e paginação.
