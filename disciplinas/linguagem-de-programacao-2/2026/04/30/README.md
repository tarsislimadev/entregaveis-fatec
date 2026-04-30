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
