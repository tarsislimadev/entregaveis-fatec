# Introdução à Inteligencia Artificial - 2026/04/27

## Recozimento Simulado

O **Recozimento Simulado** (*Simulated Annealing*) é uma meta-heurística inspirada no processo físico de resfriamento de metais.

Ideia central:
- Começamos com uma solução inicial.
- Geramos pequenas variações (soluções vizinhas).
- Se a nova solução for melhor, aceitamos.
- Se for pior, ainda podemos aceitar com certa probabilidade, para escapar de ótimos locais.
- Essa probabilidade diminui com o tempo por meio de uma **temperatura** que vai sendo reduzida.

Componentes principais:
- **Função objetivo**: mede a qualidade da solução.
- **Vizinhança**: forma de gerar novas soluções próximas.
- **Temperatura inicial (T0)**: controla o nível de exploração no início.
- **Taxa de resfriamento**: define como a temperatura diminui (ex.: `T = alpha * T`, com `0 < alpha < 1`).
- **Critério de parada**: número de iterações, temperatura mínima ou ausência de melhora.

Vantagens:
- Simples de implementar.
- Consegue sair de mínimos locais.
- Útil para problemas de otimização combinatória.

Limitações:
- Sensível à escolha dos parâmetros.
- Pode ser mais lento que métodos guloso-locais quando mal calibrado.

## Descida da Colina

A **Descida da Colina** (*Hill Climbing*) é um método de busca local que melhora a solução passo a passo, sempre escolhendo um vizinho melhor.

Funcionamento básico:
- Inicia com uma solução qualquer.
- Avalia soluções vizinhas.
- Move para a melhor vizinha que melhora o valor atual.
- Repete.
- Para quando não encontrar vizinho melhor.

Características:
- Estratégia **gulosa**: considera apenas melhora imediata.
- Rápida e fácil de aplicar.
- Pode parar em **ótimos locais**, **platôs** e **cristas**.

Variações comuns:
- "Steepest-ascent": escolhe o melhor vizinho entre todos.
- "First-choice": escolhe o primeiro vizinho que melhora.
- "Random-restart": reinicia de vários pontos aleatórios para aumentar a chance de achar soluções melhores.

Comparação com Recozimento Simulado:
- Descida da Colina: mais simples e rápida, porém mais propensa a ficar presa.
- Recozimento Simulado: aceita piores movimentos no início, aumentando exploração e chance de escapar de ótimos locais.

## Avaliação

- [ ] Prova Teorica, dia 18/05/2026
