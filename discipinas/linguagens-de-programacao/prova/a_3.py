# desenvolva um programa que:
# solicite a quantidade de alunos
# para cada aluno, leia duas notas e calcule a media
# no final, exiba quantos foram aprovados e quantos foram reprovados

alunos = [0, 0]

for _ in range(int(input("quantidade de alunos: "))):
  nota1 = float(input("primeira nota: "))
  nota2 = float(input("segunda nota: "))
  if ((nota1 + nota2) / 2) >= 7:
    alunos[0] += 1
  else:
    alunos[1] += 1

print(f"aprovados: {alunos[0]}")
print(f"reprovados: {alunos[1]}")
