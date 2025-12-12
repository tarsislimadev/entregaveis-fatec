# 3. Par ou ímpar inteligente

## Peça um número e diga se ele é par ou ímpar. Exiba uma mensagem personalizada, como: 'Eu, IA, detectei um número par!'.

numero = int(input("Digite um número: "))

if numero % 2 == 0:
    print("Eu, IA, detectei um número par!")
else:
    print("Eu, IA, detectei um número ímpar!")
