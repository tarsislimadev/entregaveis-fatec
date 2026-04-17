# Mineração de Dados - 2026-04-17

## Agrupamento de Dados

### hierarquico

Desenvolvido no campo da taxonomia (biologia), em 1963.

Produz uma sequencia de partições aninhadas.

### dendograma de similaridade

Um dendograma é uma representação gráfica em forma de árvore que mostra as relações hierárquicas de similaridade entre objetos ou grupos. Cada ramo representa a união de dois clusters, e a altura do ramo indica o grau de dissimilaridade entre os elementos agrupados. Quanto mais alto o ponto de fusão, maior é a dissimilaridade entre os grupos unidos.

[psd](./dendograma-similaridade.psd)

[png](./dendograma-similaridade.png)

### algoritmo AGNES

AGNES (Agglomerative Nesting) é um algoritmo de agrupamento hierárquico aglomerativo que funciona de forma bottom-up. Começa com cada objeto como um cluster individual e iterativamente une os clusters mais similares até que todos os objetos estejam em um único cluster. A similaridade entre clusters é determinada por uma métrica de ligação (single linkage, complete linkage, average linkage ou Ward's method). O resultado é uma árvore hierárquica (dendograma) que mostra todas as possíveis partições dos dados.

### algorigmo DIANA

DIANA (Divisive Analysis) é um algoritmo de agrupamento hierárquico divisivo que funciona de forma top-down. Começa com todos os objetos em um único cluster e iterativamente divide os clusters menos coesos até que cada objeto esteja em seu próprio cluster. O algoritmo seleciona o cluster com a maior dissimilaridade interna e o divide em dois subgrupos. A divisão continua até que não haja mais divisões significativas. O resultado é uma árvore hierárquica (dendograma) que representa todas as possíveis partições dos dados, começando de uma partição única e terminando em clusters individuais.

### Podemos aplicar engenharia reversa no AGNES para obter o DIANA ?

Sim, é possível aplicar engenharia reversa no AGNES para obter o DIANA. O AGNES trabalha bottom-up (de baixo para cima), começando com cada objeto como cluster individual e unindo os clusters mais similares iterativamente. Para obter o comportamento do DIANA através do AGNES, é necessário inverter o processo:

1. **Reverter a ordem de fusão**: Em vez de unir clusters, revertemos o dendograma do AGNES para simular divisões.
2. **Substituir a métrica de ligação**: Utilizamos a métrica de ligação que maximiza a dissimilaridade interna, em vez de minimizar a distância entre clusters.
3. **Inverter a direção de traversal**: Percorremos o dendograma de cima para baixo, tratando as fusões como divisões.

Dessa forma, o dendograma resultante do AGNES invertido produz as mesmas partições hierárquicas que o DIANA geraria, apenas em ordem contrária. Ambos os algoritmos são complementares e produzem as mesmas relações hierárquicas entre os dados.

---

## Prova

- [ ] Dia 08 de maio de 2026, avaliação dissertativa e pratica. Material: [SIGA](https://siga.cps.sp.gov.br/sigaaluno/app.aspx).
