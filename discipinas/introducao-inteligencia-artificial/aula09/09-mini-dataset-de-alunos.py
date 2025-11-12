# 9. Mini dataset de alunos

## Crie um dicionário com nomes e notas, e mostre os alunos com nota acima de 7.

alunos = {
    "João": [8, 7, 9],
    "Maria": [9, 8, 7],
    "Pedro": [7, 6, 5],
    "Ana": [6, 5, 4],
}

acima_de_7 = []

for nome, notas in alunos.items():
    media = sum(notas) / len(notas)
    if media >= 7:
        acima_de_7.append(nome)

print(f"Alunos com nota acima de 7: {', '.join(acima_de_7)}")
