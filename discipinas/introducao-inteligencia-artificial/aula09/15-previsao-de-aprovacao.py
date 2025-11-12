# 15. Previsão de aprovação

## Crie uma função que receba três notas, calcule a média e diga se o aluno será aprovado, em recuperação ou reprovado.

def previsao_de_aprovacao(nota1, nota2, nota3):
    media = (nota1 + nota2 + nota3) / 3
    if media >= 7:
        return 'Aprovado'
    elif media >= 5:
        return 'Recuperação'
    else:
        return 'Reprovado'

nota1 = float(input("Digite a nota da primeira prova: "))
nota2 = float(input("Digite a nota da segunda prova: "))
nota3 = float(input("Digite a nota da terceira prova: "))
print(previsao_de_aprovacao(nota1, nota2, nota3))
