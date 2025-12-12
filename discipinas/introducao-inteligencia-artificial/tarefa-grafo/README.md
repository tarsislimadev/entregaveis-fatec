# Tarefa Grafo

```mermaid
graph TD;
    A-->B;
    A-->D;
    B-->A;
    B-->C;
    C-->B;
    D-->A;
    D-->E;
    E-->D;
```

Vamos utilizar o algoritmo `Busca em Largura` para encontrar possiveis andamentos entre pontos no grafo.
