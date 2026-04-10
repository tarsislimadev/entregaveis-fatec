# Mineração de Dados - 2026-04-10

## Algoritmo K-means

O K-means é um algoritmo de clustering que particiona os dados em k clusters através da minimização da variância intra-cluster.

### Características:
- Algoritmo iterativo baseado em centróides
- Minimiza a soma das distâncias ao quadrado dentro de clusters
- Convergência garantida
- Sensível à inicialização dos centróides

### Passos:
1. Inicializar k centróides aleatoriamente
2. Atribuir cada ponto ao centróide mais próximo
3. Recalcular os centróides como a média dos pontos no cluster
4. Repetir passos 2-3 até convergência

## Algoritmo K-medoides

O K-medoides é uma variação robusta do K-means que usa medoides (pontos reais do dataset) em vez de centróides.

### Características:
- Usa pontos reais como representantes dos clusters
- Mais robusto a outliers que K-means
- Pode usar qualquer métrica de distância
- Computacionalmente mais custoso

### Passos:
1. Inicializar k medoides aleatoriamente
2. Atribuir cada ponto ao medoide mais próximo
3. Para cada cluster, encontrar o medoide ótimo
4. Repetir passos 2-3 até convergência

## Anotações Gerais

- [ ] Baixar Notebook da aula de Mineração de Dados, no Siga.

https://somostera.com/blog/clusterizacao-de-dados

- Em um Jupyter Notebook: importar a função "load_iris" do Scikit-Learn.

- "kmeans.fit(x)" é o aprendizado da máquina.

- [ ] Calcular os "centroids"

- [ ] Plotar o gráfico

- "df.head(5)", para apresentar as 5 primeiras linhas da tabela.

- "Base de dados sintética" contem dados inventados.

- "Mineração é investigação" - Prof. Angela

https://github.com/lizziefg/Mineracao-Pastagens

https://github.com/ArthurAraLeite/mineracao_analise_de_disponibilidade_cultural_de_mangas

https://github.com/MateusJoga/Projeto_Agrupamento
