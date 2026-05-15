# Mineração de Dados - 2026/05/15

## Conceitos iniciais de regras de associação e padrões de sequência

Regras de associação são usadas para identificar relações frequentes entre itens em grandes bases de dados, como em transações de supermercados. Padrões de sequência buscam identificar sequências frequentes de eventos ou itens ao longo do tempo.

## Tipos de regras de associação

As regras podem ser simples (envolvendo apenas dois itens) ou complexas (envolvendo múltiplos itens). Exemplos incluem regras do tipo "se A, então B" ou "se A e B, então C".

## Modelo suporte/confiança

O suporte mede a frequência com que um conjunto de itens aparece no banco de dados. A confiança indica a probabilidade de, dado um item, o outro também ocorrer. Exemplo: suporte(A→B) = frequência de A e B juntos; confiança(A→B) = frequência de A e B juntos dividido pela frequência de A.

## Algoritmo Apriori

O Apriori é um algoritmo clássico para mineração de regras de associação. Ele utiliza a propriedade de que todos os subconjuntos de um conjunto frequente também são frequentes. O algoritmo gera candidatos e filtra por suporte mínimo, repetindo até não haver mais candidatos.

## Algoritmo FP-Growth

O FP-Growth constrói uma estrutura de árvore (FP-tree) para compactar a base de dados e extrair conjuntos frequentes sem gerar candidatos explicitamente, tornando-o mais eficiente que o Apriori em grandes bases.

## Melhoria da Eficiência

Técnicas como redução de candidatos, uso de estruturas de dados compactas (FP-tree), e paralelização podem acelerar a mineração de regras. Ajustar o suporte mínimo também impacta o desempenho.

## Formas de Apresentação de Regras de Associação

As regras podem ser apresentadas em tabelas, gráficos ou visualizações interativas, destacando suporte, confiança e lift. Ferramentas visuais ajudam na interpretação dos resultados.

## Entropia

Entropia mede a incerteza ou aleatoriedade de um conjunto de dados. Em mineração de dados, é usada para avaliar a pureza de partições e auxiliar na construção de árvores de decisão.
