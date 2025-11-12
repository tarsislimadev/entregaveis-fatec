# 2. Calculadora simples

## Peça dois números e mostre a soma, o produto e o maior dos dois números.

numero1 = float(input("Digite o primeiro número: "))
numero2 = float(input("Digite o segundo número: "))
soma = numero1 + numero2
produto = numero1 * numero2
maior = max(numero1, numero2)

print(f"A soma dos dois números é: {soma}")
print(f"O produto dos dois números é: {produto}")
print(f"O maior dos dois números é: {maior}")
