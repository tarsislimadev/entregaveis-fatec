# Matematica - 2026/04/24

## Weekday by Date

```python
def getCodeByYear(year) -> int:
  return int(year) - 2023

def getCodeByMonth(month) -> int:
  months = [1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6]
  return months[int(month)]

def getWeekdayByDate(date = ['2026', '04', '24']) -> int:
  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
  weekday = sum([int(date[2]), getCodeByMonth(date[1]), getCodeByYear(date[0])]) % len(weekdays)
  return weekday, weekdays[weekday]

print(getWeekdayByDate(['2026', '01', '01'])) # (1, 'Seg')
```

## Atividade

- Entrega 28/04/2026 às 15 horas

- Individual, em dupla ou em trio.

- [ ] Enviar PDF para joao.eichenberger@cps.sp.gov.br

- [ ] Elaborar os prompts. Copiar o prompt e a resposta.

- [ ] PDF com nomes dos integrantes: nome1_nome2_nome3.docx

- Definição (O que é logaritmo?); Bases mais utilizadas Consequências das definições; Propriedades operatórias; Lista de exercícios com 5 questões fáceis, 5 questões de nivel medio e 5 questões mais desafiadores, de multipla escolha, com gabarito; 

[Exercícios Conjuntos e Conjuntos Numéricos](./exercicios-conjuntos-e-conjuntos-numericos.pdf)
