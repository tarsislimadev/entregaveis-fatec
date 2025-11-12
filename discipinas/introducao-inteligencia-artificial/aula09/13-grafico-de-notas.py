# 13. Gráfico das notas

## Use matplotlib para plotar um gráfico simples com as notas de alunos.

# pip install matplotlib --break-system-packages

import matplotlib.pyplot as plt

notas = [8, 7, 9, 6, 5, 4, 3, 2, 1, 0]

plt.bar(range(len(notas)), notas)
plt.xlabel("Aluno")
plt.ylabel("Nota")
plt.title("Notas dos Alunos")
plt.show() # plt.savefig("notas_alunos.png")
