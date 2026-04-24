# Mineração de Dados - 2026/04/24

## Atividade

- Entrega 28/05/2026

- Apresentação 29/05/2026 e 12/06/2026

## Bases Transacionais como Binárias

Em Mineração de Dados, uma **base transacional binária** representa se um item está presente ou ausente em cada transação.

- Cada **linha** representa uma transação (ex.: compra, cesta, registro).
- Cada **coluna** representa um item (ex.: produto, característica, evento).
- O valor **1** indica presença do item na transação.
- O valor **0** indica ausência do item na transação.

### Exemplo

Transações originais:

- T1 = {Pão, Leite}
- T2 = {Pão, Café}
- T3 = {Leite, Manteiga}

Forma binária:

| Transação | Pão | Leite | Café | Manteiga |
|-----------|-----|-------|------|----------|
| T1        | 1   | 1     | 0    | 0        |
| T2        | 1   | 0     | 1    | 0        |
| T3        | 0   | 1     | 0    | 1        |
| T4        | 1   | 1     | 0    | 1        |

### Por que isso é importante?

Esse formato facilita a aplicação de técnicas como:

- **Regras de associação** (ex.: Apriori)
- **Cálculo de suporte, confiança e lift**
- **Identificação de padrões de coocorrência** entre itens

Em resumo, transformar dados transacionais em binários padroniza a base e torna viável a descoberta de relações úteis para análise e tomada de decisão.

## Algoritmo Apriori

O **Apriori** é um algoritmo clássico para descobrir **conjuntos de itens frequentes** e gerar **regras de associação** em bases transacionais.

Ele parte de uma ideia central:

> Se um conjunto de itens é frequente, então todos os seus subconjuntos também são frequentes.

Essa propriedade permite eliminar combinações improváveis cedo, reduzindo o espaço de busca.

### Conceitos principais

- **Itemset**: conjunto de itens (ex.: `{Pão, Leite}`)
- **Suporte**: frequência de ocorrência de um itemset na base
- **Confiança**: probabilidade de `Y` ocorrer quando `X` ocorre, na regra `X → Y`
- **Lift**: mede o quanto `X` e `Y` ocorrem juntos acima (ou abaixo) do esperado por acaso

Fórmulas:

- `suporte(X) = ocorrências de X / total de transações`
- `confiança(X → Y) = suporte(X ∪ Y) / suporte(X)`
- `lift(X → Y) = confiança(X → Y) / suporte(Y)`

### Como o Apriori funciona (passo a passo)

1. **Gera candidatos de 1 item** (C1).
2. **Filtra por suporte mínimo** para obter os frequentes de 1 item (L1).
3. Combina L1 para formar candidatos de 2 itens (C2).
4. Filtra novamente por suporte mínimo para obter L2.
5. Repete o processo para 3 itens, 4 itens, ... até não haver novos frequentes.
6. Com os itemsets frequentes, gera regras `X → Y`.
7. Mantém apenas regras que atendem **confiança mínima** (e, opcionalmente, lift mínimo).

### Exemplo rápido (com a base acima)

Transações:

- T1 = {Pão, Leite}
- T2 = {Pão, Café}
- T3 = {Leite, Manteiga}
- T4 = {Pão, Leite, Manteiga}

Suportes de 1 item:

- suporte(Pão) = 3/4 = 0,75
- suporte(Leite) = 3/4 = 0,75
- suporte(Café) = 1/4 = 0,25
- suporte(Manteiga) = 2/4 = 0,50

Se `suporte mínimo = 0,50`, itens frequentes de 1 item: `{Pão, Leite, Manteiga}`.

Candidatos de 2 itens e suportes:

- `{Pão, Leite}` = 2/4 = 0,50 ✅
- `{Pão, Manteiga}` = 1/4 = 0,25 ❌
- `{Leite, Manteiga}` = 2/4 = 0,50 ✅

Logo, frequentes de 2 itens: `{Pão, Leite}` e `{Leite, Manteiga}`.

Exemplo de regra:

- `Manteiga → Leite`
	- suporte = 2/4 = 0,50
	- confiança = suporte(Manteiga ∪ Leite) / suporte(Manteiga) = (2/4) / (2/4) = 1,00
	- lift = 1,00 / 0,75 = 1,33

Interpretação: quando há **Manteiga**, há **Leite** em 100% dos casos da base; além disso, essa coocorrência é maior do que o esperado ao acaso (lift > 1).

### Vantagens e limitações

**Vantagens**

- Simples de entender e implementar
- Gera regras interpretáveis para negócio
- Muito usado em análise de cesta de compras

**Limitações**

- Pode ficar custoso em bases grandes e densas (muitos candidatos)
- Sensível à escolha de suporte/confiança mínimos
- Pode gerar muitas regras redundantes

### Aplicações comuns

- Recomendação de produtos
- Organização de prateleiras
- Promoções combinadas
- Descoberta de padrões de uso/comportamento

Em resumo, o Apriori transforma uma base binária em conhecimento acionável ao identificar combinações frequentes e regras úteis entre itens.
