# 14. Gerador de frases aleatórias

## Monte frases aleatórias combinando listas de adjetivos, substantivos e verbos.

import random

adjetivos = ['azul', 'vermelho', 'verde', 'amarelo', 'roxo']
substantivos = ['casa', 'carro', 'árvore', 'livro', 'computador']
verbos = ['correr', 'pular', 'comer', 'dormir', 'voar']
frases = []

for _ in range(10):
    frase = f"{random.choice(adjetivos)} {random.choice(substantivos)} {random.choice(verbos)}"
    frases.append(frase)

print('\n'.join(frases))
