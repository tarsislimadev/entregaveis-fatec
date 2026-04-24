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
