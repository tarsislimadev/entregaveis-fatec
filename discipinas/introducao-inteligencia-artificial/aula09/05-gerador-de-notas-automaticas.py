# 5. Gerador de notas automáticas

## Peça a nota de três provas, calcule a média e classifique: Aprovado (≥7), Recuperação (≥5 e <7) ou Reprovado (<5).

nota1 = float(input("Digite a nota da primeira prova: "))
nota2 = float(input("Digite a nota da segunda prova: "))
nota3 = float(input("Digite a nota da terceira prova: "))
media = (nota1 + nota2 + nota3) / 3

if media >= 7:
    print("Aprovado!")
elif media >= 5:
    print("Recuperação!")
else:
    print("Reprovado!")
