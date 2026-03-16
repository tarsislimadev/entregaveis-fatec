# Introdução à Inteligência Artificial - Aula 1 (2026/03/16)

## Algoritmos clássicos

...

## Bancos de dados baseados em grafo

Bancos de dados baseados em grafo são sistemas projetados para lidar com dados altamente interconectados, representando entidades como *nós* e suas relações como *arestas*. Eles são especialmente úteis em cenários como redes sociais, detecção de fraudes, recomendações e análise de rotas.  

---

## 🔎 O que são bancos de dados de grafos

- Definição: Um banco de dados de grafos armazena informações em estruturas de grafo, onde cada entidade é um nó e cada relação é uma aresta.  
- Diferença dos relacionais: Enquanto bancos relacionais usam tabelas e chaves estrangeiras, os de grafos focam em conexões diretas, permitindo consultas mais rápidas em dados complexos.  
- Consultas: Utilizam linguagens específicas como Cypher (Neo4j) ou Gremlin (Apache TinkerPop).  

---

## 📌 Principais casos de uso

- Redes sociais: Mapear conexões entre usuários, interesses e interações.  
- Recomendações: Sistemas de e-commerce e streaming que sugerem produtos ou conteúdos com base em relações.  
- Detecção de fraudes: Identificação de padrões suspeitos em transações financeiras.  
- Logística e rotas: Otimização de caminhos em transporte e entregas.  
- Ciência e pesquisa: Representação de redes biológicas, químicas ou acadêmicas.  [Oracle](https://www.oracle.com/br/autonomous-database/what-is-graph-database/)  [DataCamp](https://www.datacamp.com/pt/blog/what-is-a-graph-database)  

---

## ⚙️ Exemplos de bancos de dados de grafos

| Banco de Dados | Características | Pontos Fortes |
|----------------|-----------------|---------------|
| Neo4j | Líder de mercado, usa linguagem Cypher | Comunidade ativa, ótimo para aprendizado e prototipagem |
| Amazon Neptune | Serviço gerenciado na nuvem AWS | Escalabilidade e integração com outros serviços AWS |
| ArangoDB (modo grafo) | Multimodelo (documento, chave-valor e grafo) | Flexibilidade para diferentes tipos de dados |
| OrientDB | Suporta grafo e documento | Boa performance em cenários híbridos |
| TigerGraph | Foco em big data e análises em tempo real | Alta performance em grafos massivos  [bytes.updev.dev.br](https://bytes.updev.dev.br/bancos-de-dados-de-grafos-avaliacao-e-principais-aspectos/) |

---

## 🚧 Desafios e limitações

- Curva de aprendizado: Para quem vem de bancos relacionais, entender nós e arestas exige adaptação.  
- Ferramentas e linguagens: Cypher e Gremlin podem demandar estudo.  
- Escalabilidade: Embora eficientes em consultas complexas, podem ter desafios em cenários de dados extremamente massivos sem otimização adequada.  

---

## ✅ Conclusão

Se você precisa analisar relações complexas (como redes sociais, rotas ou fraudes), bancos de dados de grafos são a escolha ideal. Para aplicações mais simples, um banco relacional ou NoSQL pode ser suficiente.  

## 📚 Referências

- [Oracle](https://www.oracle.com/br/autonomous-database/what-is-graph-database/)
- [DataCamp](https://www.datacamp.com/pt/blog/what-is-a-graph-database)
- [bytes.updev.dev.br](https://bytes.updev.dev.br/bancos-de-dados-de-grafos-avaliacao-e-principais-aspectos/)

---

# Ubuntu no Docker

```bash
docker run --rm -it --net host -w /app ubuntu bash
```
