# Estrutura de Dados - 2026-04-09

## Estrutura de Arvores

Uma árvore é uma estrutura de dados não-linear que consiste em um conjunto de nós conectados por arestas, formando uma hierarquia.

### Nó

Um nó é a unidade básica de uma árvore que contém um valor ou dados. Cada nó pode ter zero ou mais nós filhos.

### Aresta

Uma aresta é a conexão entre dois nós. Ela representa a relação parent-child (pai-filho) em uma árvore.

### Caminho

Um caminho é uma sequência de nós e arestas que conecta um nó a outro. A distância é determinada pelo número de arestas no caminho.

## Arvores Binarias

Uma árvore binária é uma árvore onde cada nó tem no máximo dois filhos, denominados filho esquerdo e filho direito.

### Propriedades
- Altura: número máximo de arestas de um nó até uma folha
- Profundidade: número de arestas de um nó até a raiz
- Nível: conjunto de nós com a mesma profundidade
- Grau: número de filhos de um nó

## Arvores Binarias Perfeitas

Uma árvore binária perfeita é uma árvore binária em que todos os nós internos têm exatamente dois filhos e todas as folhas estão no mesmo nível.

### Características
- Número de nós: 2^h - 1 (onde h é a altura)
- Todas as folhas estão no último nível
- Número máximo de nós em cada nível é 2^(n-1)

## Protocolo de Manchester

O protocolo de Manchester é um método de codificação de dados que garante sincronização entre o transmissor e o receptor, alternando entre dois níveis de voltagem durante cada período de bit.

### Aplicações em Estruturas de Dados
- Sincronização em transmissão de dados em árvores distribuídas
- Codificação em sistemas de armazenamento em árvore

## Percursos

Percursos em árvores são formas de visitar todos os nós de uma árvore em uma ordem específica. Existem três tipos principais de percursos em profundidade (DFS).

### Tipos de Percurso
1. Pré-ordem (Preorder): Processo - Esquerda - Direita
2. Ordem (Inorder): Esquerda - Processo - Direita
3. Pós-ordem (Postorder): Esquerda - Direita - Processo

## Percurso de pré-ordem

Definição: Visita a raiz, depois a subárvore esquerda e em seguida a subárvore direita.

Ordem: Raiz → Esquerda → Direita

Pseudocódigo:
```
preOrdem(nó)
  se nó ≠ nulo
    processa(nó)
    preOrdem(nó.esquerda)
    preOrdem(nó.direita)
```

Exemplo:
```
Árvore:       1
             / \
            2   3

Resultado: 1, 2, 3
```

## Percurso de ordem

Definição: Visita a subárvore esquerda, depois a raiz e em seguida a subárvore direita.

Ordem: Esquerda → Raiz → Direita

Pseudocódigo:
```
emOrdem(nó)
  se nó ≠ nulo
    emOrdem(nó.esquerda)
    processa(nó)
    emOrdem(nó.direita)
```

Exemplo:
```
Árvore:       2
             / \
            1   3

Resultado: 1, 2, 3
```

Nota: Em uma árvore binária de busca, o percurso em ordem retorna os elementos em ordem crescente.

## Percurso de pós-ordem

Definição: Visita a subárvore esquerda, depois a subárvore direita e por fim a raiz.

Ordem: Esquerda → Direita → Raiz

Pseudocódigo:
```
posOrdem(nó)
  se nó ≠ nulo
    posOrdem(nó.esquerda)
    posOrdem(nó.direita)
    processa(nó)
```

Exemplo:
```
Árvore:       3
             / \
            1   2

Resultado: 1, 2, 3
```

Aplicação: Útil para deletar a árvore, pois precisa deletar os filhos antes de deletar o pai.
