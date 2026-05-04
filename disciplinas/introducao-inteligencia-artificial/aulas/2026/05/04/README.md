# Introdução à Inteligencia Artificial - 2026/05/04

"A partir da quarta dimensão não é possivel desenhar o plano, pois este é abstrato", por Professor.

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

## Vetores (aplicados à inteligencia artificial)

Vetores são estruturas matemáticas fundamentais em inteligência artificial. Na IA, vetores representam dados e características de forma numérica, permitindo que algoritmos de aprendizado processem informações de forma eficiente.

### O que é um Vetor?

Um vetor é uma sequência ordenada de números. Por exemplo, um vetor pode ter a forma `[2, 3, 5]` (vetor em 3 dimensões) ou `[1.5, -0.2, 0.8, 3.1]` (vetor em 4 dimensões). Cada número no vetor é chamado de componente ou elemento.

### Vetores de Características (Feature Vectors)

Em IA, dados são frequentemente representados como vetores de características. Por exemplo:

- Uma imagem pode ser representada como um vetor de valores de pixels.
- Uma pessoa pode ser representada como um vetor contendo `[idade, altura, peso, salário]`.
- Um texto pode ser convertido em um vetor de frequências de palavras.

Essa representação permite que algoritmos de machine learning processem diferentes tipos de dados de forma uniforme.

### Operações com Vetores

As operações básicas com vetores incluem:

- **Adição**: `[1, 2] + [3, 4] = [4, 6]`
- **Multiplicação por escalar**: `2 * [1, 2] = [2, 4]`
- **Produto escalar (dot product)**: `[1, 2] · [3, 4] = 1*3 + 2*4 = 11`
- **Norma (magnitude)**: A magnitude do vetor `[3, 4]` é `√(3² + 4²) = 5`

### Aplicações em IA

- **Embedding**: Palavras, imagens e outros dados são convertidos em vetores para processamento em redes neurais.
- **Similaridade**: A distância entre vetores é usada para medir quanto dois dados são parecidos.
- **Transformação de dados**: Vetores são operados em camadas de redes neurais para aprender padrões.
- **Busca semântica**: Vetores permitem encontrar dados similares comparando suas representações.

## Algebra linear

A álgebra linear é a área da matemática que estuda vetores, matrizes, espaços vetoriais e transformações lineares. Ela é uma das bases da inteligência artificial porque quase todos os dados e cálculos de modelos de aprendizado de máquina podem ser representados por números organizados em vetores e matrizes.

Em IA, a álgebra linear é usada para:

- representar entradas, pesos e saídas de modelos;
- calcular operações como produto escalar e multiplicação de matrizes;
- organizar dados em alta dimensão;
- aplicar transformações em redes neurais;
- medir semelhança entre vetores e otimizar algoritmos.

### Vetores

Um vetor é uma lista ordenada de valores. Ele pode representar uma amostra de dados, uma característica de um objeto ou até a posição de algo em um espaço.

Exemplo: `[2, 4, 6]`

### Matrizes

Uma matriz é uma tabela de números organizada em linhas e colunas. Em IA, matrizes são usadas para armazenar conjuntos de dados, pesos de redes neurais e resultados de cálculos.

Exemplo:

`[[1, 2], [3, 4]]`

### Relação com redes neurais

Em uma rede neural, as entradas podem ser representadas como vetores, os pesos como matrizes e os cálculos entre eles são feitos com operações de álgebra linear. Isso permite que o modelo processe grandes volumes de dados de forma eficiente.

### Importância

Sem álgebra linear, seria muito difícil descrever matematicamente como os algoritmos de IA aprendem, transformam dados e fazem previsões. Por isso, ela é essencial para o estudo de aprendizado de máquina, redes neurais e ciência de dados.

## Modelos Estatisticos

Modelos estatísticos são métodos matemáticos que usam dados para descrever padrões, estimar probabilidades e fazer previsões. Em inteligência artificial, eles ajudam a identificar relações entre variáveis e a tomar decisões com base em exemplos anteriores.

Esses modelos podem ser usados para prever resultados, classificar informações, medir incerteza e apoiar decisões automatizadas.

Alguns exemplos são regressão linear, regressão logística, Naive Bayes e modelos de séries temporais. Eles servem de base para diversas técnicas de aprendizado de máquina.

Em geral, o processo envolve coleta de dados, análise, ajuste do modelo, validação e uso do modelo para novas previsões.

## Função de Ativação

Funções de ativação são funções matemáticas aplicadas à saída de um neurônio (a soma ponderada das entradas mais o viés) para introduzir não linearidade no modelo. Sem elas, uma rede neural composta apenas por combinações lineares seria equivalente a uma única transformação linear, limitando severamente sua capacidade de representar relações complexas.

Exemplos comuns:

- Degrau (step): saída 0 ou 1 dependendo se a entrada ultrapassa um limiar — usada em perceptrons simples.
- Sigmóide (σ): mapeia valores para (0,1), útil em saídas probabilísticas, mas pode sofrer com gradientes pequenos (vanishing gradient).
- Tanh: similar à sigmóide, mapeia para (-1,1), centralizada em zero.
- ReLU (Rectified Linear Unit): f(x)=max(0,x). Simples e eficiente, reduz o problema do gradiente saturado e é muito usada em redes profundas.
- Leaky ReLU / Parametric ReLU: variantes que permitem um pequeno gradiente para x<0, mitigando neurônios mortos.

A escolha da função de ativação impacta treinamento, velocidade de convergência e desempenho final, sendo comum usar ReLU nas camadas ocultas e sigmóide/softmax na camada de saída conforme a tarefa.

### Função de Ativação Linear ou Identidade

A função de ativação linear, também chamada de função identidade, retorna a própria entrada sem aplicar transformação não linear. Em termos matemáticos, pode ser representada por `f(x) = x`.

Isso significa que, se o neurônio receber um valor `x`, a saída será exatamente esse mesmo valor. Diferente de funções como degrau, sigmóide ou ReLU, a função linear não restringe a saída a um intervalo específico nem cria curvatura no modelo.

Na prática, ela é mais usada na camada de saída de problemas de regressão, em que o objetivo é prever valores contínuos, como preço, temperatura ou quantidade. Nesse contexto, permitir que a saída assuma qualquer valor real é importante para representar corretamente o resultado esperado.

Por outro lado, usar apenas funções lineares em todas as camadas de uma rede neural não aumenta a capacidade de aprendizado, porque a composição de funções lineares continua sendo uma função linear. Por isso, ela não é indicada nas camadas ocultas quando se quer que a rede aprenda padrões complexos.

Resumo:

- **Fórmula**: `f(x) = x`
- **Tipo de saída**: valor contínuo
- **Uso mais comum**: regressão
- **Limitação**: não adiciona não linearidade ao modelo

### Função de Ativação Sigmoid

A sigmóide é uma função de ativação muito conhecida por produzir saídas entre 0 e 1. Sua fórmula é `f(x) = 1 / (1 + e^-x)`. Isso faz com que ela seja útil para representar probabilidades, já que valores próximos de 0 indicam baixa ativação e valores próximos de 1 indicam alta ativação.

Quando a entrada é muito negativa, a saída fica próxima de 0; quando a entrada é muito positiva, a saída se aproxima de 1. No entanto, nas regiões extremas a curva “satura”, ou seja, pequenas mudanças na entrada geram variações muito pequenas na saída. Isso pode dificultar o aprendizado em redes mais profundas, pois o gradiente tende a diminuir bastante durante o treinamento.

Por esse motivo, a sigmóide foi muito usada em redes mais antigas e ainda aparece bastante na camada de saída de problemas de classificação binária. Nesses casos, ela é combinada com funções de custo como Binary Cross-Entropy, permitindo interpretar o resultado como a probabilidade de uma classe.

Resumo:

- **Fórmula**: `f(x) = 1 / (1 + e^-x)`
- **Intervalo de saída**: entre 0 e 1
- **Uso mais comum**: saída em classificação binária
- **Limitação**: sofre com saturação do gradiente e pode tornar o treinamento mais lento

### Função de Ativação ReLU

A ReLU (Rectified Linear Unit) é uma das funções de ativação mais populares em redes neurais modernas. Sua fórmula é simples: `f(x) = max(0, x)`, o que significa que ela retorna o valor x se ele for positivo, caso contrário retorna zero.

A principal vantagem da ReLU é sua eficiência computacional e sua capacidade de mitigar o problema do gradiente saturado que afeta a sigmóide. Além disso, ela permite que a rede aprenda padrões complexos através da não linearidade introduzida.

Características principais:

- **Fórmula**: `f(x) = max(0, x)`
- **Tipo de saída**: valor não negativo
- **Uso mais comum**: camadas ocultas em redes profundas
- **Vantagem**: simples, computacionalmente eficiente e evita saturação do gradiente
- **Desvantagem**: problema dos neurônios mortos (neurônios que ficam inertes com entrada negativa)

Variantes como Leaky ReLU `f(x) = max(αx, x)` (com α pequeno) e Parametric ReLU resolvem o problema dos neurônios mortos permitindo um pequeno gradiente negativo.

## Função de Custo

A função de custo (ou função de perda) quantifica o quão ruim é a previsão do modelo em comparação com os valores reais. Durante o treinamento, o objetivo é minimizar essa função ajustando os pesos da rede usando algoritmos de otimização (por exemplo, gradiente descendente).

Exemplos comuns:

- Erro quadrático médio (MSE): (1/n) * Σ(y_true - y_pred)^2. Muito usado em regressão.
- Entropia cruzada (Cross-Entropy): usada em classificação; penaliza fortemente previsões confiantes e erradas.
- Binary Cross-Entropy (Log Loss): para classificação binária.
- Categorical Cross-Entropy com Softmax: para classificação multiclasse.

Além da função de custo, frequentemente se adicionam termos de regularização (L1, L2) para evitar overfitting, penalizando pesos grandes.

O gradiente da função de custo em relação aos pesos é calculado via backpropagation e usado pelo otimizador para atualizar os pesos em direção a um mínimo (local ou global) da função de custo.

## Gradiente Descendente

Gradiente descendente é um método iterativo de otimização usado para minimizar a função de custo ajustando os parâmetros (pesos) do modelo. A ideia básica é seguir o negativo do gradiente da função de custo em relação aos parâmetros, pois o gradiente aponta na direção do aumento mais rápido; então mover-se na direção oposta reduz o valor da função.

Passos fundamentais:

1. Inicializar os pesos (aleatoriamente ou com heurísticas).
2. Calcular o gradiente da função de custo em relação aos pesos: ∇J(w).
3. Atualizar os pesos: w := w - η * ∇J(w), onde η é a taxa de aprendizado (learning rate).
4. Repetir até convergência (número de iterações, tolerância do gradiente ou validação).

Variedades importantes:

- Batch Gradient Descent: calcula o gradiente usando todo o conjunto de treino em cada passo. Converge de forma estável, mas pode ser lento e custoso em memória para grandes conjuntos.
- Stochastic Gradient Descent (SGD): atualiza os pesos a cada exemplo de treino. Mais ruidoso, mas pode escapar de mínimos locais e permite treino online.
- Mini-batch Gradient Descent: compromisso entre batch e SGD; usa pequenos lotes (batches) por atualização. Muito usado na prática.

Melhorias e técnicas relacionadas:

- Momentium: acumula uma média móvel dos gradientes para acelerar convergência e reduzir oscilações.
- RMSProp / AdaGrad / Adam: algoritmos adaptativos que ajustam a taxa de aprendizado por parâmetro com base em históricos de gradientes; Adam é amplamente usado por combinar momentum e escalamento adaptativo.
- Decaimento da taxa de aprendizado e schedules: reduzir η ao longo do tempo para refinamento fino.

Cuidados:

- Escolha de uma taxa de aprendizado apropriada é crítica: muito grande causa divergência; muito pequena torna o treino lento.
- Funções de custo não convexas (redes profundas) têm muitos mínimos locais ou platôs; otimização prática depende de inicialização, regularização e algoritmo usado.

## Algoritmo Genetico

Algoritmos genéticos (AG) são métodos de otimização inspirados na evolução natural. Eles mantêm uma população de soluções candidatas (indivíduos), e iterativamente aplicam operadores inspirados em seleção natural para evoluir soluções melhores.

Componentes principais:

- Representação (cromossomo): codificação da solução (vetor binário, real, permutação etc.).
- Função de aptidão (fitness): avalia quão boa é cada solução segundo o objetivo a ser otimizado.
- Seleção: escolhe indivíduos para reprodução com base na aptidão (roleta, torneio, rank).
- Cruzamento (crossover): combina partes de dois (ou mais) pais para gerar novos filhos, promovendo recombinação de características.
- Mutação: altera aleatoriamente partes do indivíduo para introduzir diversidade e evitar convergência prematura.
- Substituição/Elitismo: decide como a nova população é formada (preservando os melhores indivíduos para a próxima geração).

Fluxo básico:

1. Inicializar população aleatória.
2. Avaliar a aptidão de cada indivíduo.
3. Repetir: selecionar pais → aplicar crossover → aplicar mutação → avaliar filhos → formar nova população.
4. Parar quando atingir critério (n.º de gerações, aptidão satisfatória, tempo).

Aplicações e vantagens:

- Úteis para problemas de otimização complexos, não lineares e multimodais onde gradientes não estão disponíveis ou são difíceis de computar.
- Podem explorar amplamente o espaço de busca e escapar de mínimos locais.

Limitações:

- Podem ser computacionalmente caros (avaliações de aptidão custosas e necessidade de manter população).
- Requerem ajuste de parâmetros (tamanho da população, taxas de crossover e mutação).

Freqüentemente, algoritmos genéticos são usados em combinação com outras técnicas (hibridização) ou como etapa de busca global seguida de refinamento local (por exemplo, gradiente descendente) para obter soluções de alta qualidade.

## Atividade

Entrega dia 11/05/2026

https://github.com/daviduarte/introducao_a_inteligencia_artificial_fatec_2026/blob/main/AUla11/Lista_de_Exerc%C3%ADcios_Fate.pdf
