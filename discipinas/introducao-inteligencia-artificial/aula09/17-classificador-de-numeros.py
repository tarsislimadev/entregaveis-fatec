# 17. Classificador de números

## Peça 10 números e organize-os em um dicionário com listas de pares, ímpares, positivos e negativos.

numeros = [int(input("Digite um número: ")) for _ in range(10)]

pares = []
impares = []
positivos = []
negativos = []

for numero in numeros:
    if numero % 2 == 0:
        pares.append(numero)
    else:
        impares.append(numero)
    if numero >= 0:
        positivos.append(numero)
    else:
        negativos.append(numero)

print(f"Pares: {', '.join(map(str, pares))}")
print(f"Ímpares: {', '.join(map(str, impares))}")
print(f"Positivos: {', '.join(map(str, positivos))}")
print(f"Negativos: {', '.join(map(str, negativos))}")
