# Introdução à Inteligencia Artificial - 2026/05/04

## Redes Neurais

Redes neurais são modelos computacionais inspirados no funcionamento do cérebro humano. Elas são compostas por neurônios artificiais organizados em camadas, que recebem entradas, processam essas informações com pesos e funções de ativação e produzem uma saída.

Em uma rede neural básica, o fluxo acontece desta forma:

1. **Camada de entrada**: recebe os dados.
2. **Camadas ocultas**: extraem padrões e transformam as informações.
3. **Camada de saída**: entrega a resposta final.

O treinamento da rede consiste em ajustar os pesos para reduzir o erro das previsões. Isso é feito com técnicas como *backpropagation* e algoritmos de otimização, por exemplo o gradiente descendente.

As redes neurais são amplamente usadas em reconhecimento de imagens, classificação de textos, tradução automática, previsão de séries temporais e sistemas de recomendação.

## Perceptron

O Perceptron é o modelo mais simples de rede neural, consistindo em um único neurônio. Ele recebe múltiplas entradas, aplica pesos a cada uma, soma os valores e passa o resultado por uma função de ativação (geralmente uma função degrau).

O Perceptron é usado principalmente para problemas de classificação linear, ou seja, quando os dados podem ser separados por uma linha reta (em 2D) ou um hiperplano (em dimensões maiores). Ele foi um dos primeiros algoritmos de aprendizado supervisionado e serviu como base para o desenvolvimento de redes neurais mais complexas.

O algoritmo de treinamento do Perceptron ajusta os pesos iterativamente para minimizar os erros de classificação. Uma limitação importante é que o Perceptron não pode resolver problemas linearmente inseparáveis, como o problema XOR, o que levou ao desenvolvimento de redes neurais multi-camadas (também chamadas de Multilayer Perceptron ou MLP).

### Entradas

As entradas são os dados que o perceptron recebe como input. Cada entrada representa uma característica ou atributo do problema que se deseja resolver. Por exemplo, em um problema de classificação de imagens, as entradas podem ser os valores dos pixels. Em um problema de classificação de flores, as entradas podem ser medidas como comprimento e largura das pétalas.

### Saidas

A saída é o resultado final produzido pelo perceptron após processar todas as entradas. Geralmente, a saída é um valor discreto, como `0` ou `1`, ou pode ser um valor contínuo dependendo da função de ativação utilizada. A saída representa a classificação ou predição que o perceptron faz com base nos dados de entrada.

### Vies (bias)

O viés (bias) é um parâmetro adicional que é adicionado à soma ponderada das entradas. Ele permite que o perceptron aprenda um deslocamento independente dos pesos, facilitando o ajuste da função de ativação. O viés é essencial porque, sem ele, a reta de decisão seria forçada a passar pela origem, limitando a capacidade do modelo de se adaptar aos dados.

### Pesos

Os pesos são parâmetros que multiplicam cada entrada, determinando a importância ou influência de cada uma delas na decisão final do perceptron. Pesos maiores indicam que a entrada correspondente tem mais impacto na saída. Durante o treinamento, os pesos são ajustados iterativamente para minimizar o erro de classificação. O algoritmo de aprendizado do perceptron modifica os pesos quando ocorrem erros, movendo-os em direção a valores que melhoram a classificação.

### Exemplo

Considere um perceptron com duas entradas, `x1` e `x2`, pesos `w1` e `w2`, e um viés `b`.

O funcionamento acontece em três etapas:

1. Cada entrada é multiplicada pelo seu peso.
2. Os valores obtidos são somados com o viés.
3. O resultado passa por uma função de ativação, que decide a saída final.

Em forma matemática, isso pode ser representado assim:

`s = (x1 * w1) + (x2 * w2) + b`

Depois disso, a função de ativação analisa `s` e produz a resposta. Em um modelo simples, se `s` for maior ou igual ao limiar, a saída pode ser `1`; caso contrário, a saída pode ser `0`.

Esse processo mostra como o perceptron faz uma classificação básica. Durante o treinamento, os pesos são ajustados sempre que a previsão está errada, até que o modelo aprenda a separar melhor os dados.
