# Introducao a Inteligencia Artificial - 2026-03-02

Para ser um agente racional, ele deve ter:
- medida de desempenho
- perceptos disponíveis
- conhecimento prévio do ambiente
- ações possíveis

# executar o [n8n](https://hub.docker.com/r/n8nio/n8n) no [docker](#)

```bash
docker volume create n8n_data

docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```
