# 8. Lista de sensores

## Peça 5 temperaturas, armazene em uma lista e exiba a média, a maior, a menor e quantas estão acima de 30°C.

temperaturas = [float(input("Digite a temperatura: ")) for _ in range(5)]

media = sum(temperaturas) / len(temperaturas)
maior = max(temperaturas)
menor = min(temperaturas)
acima_de_30 = sum(1 for temperatura in temperaturas if temperatura > 30)

print(f"A média das temperaturas é: {media}")
print(f"A maior temperatura é: {maior}")
print(f"A menor temperatura é: {menor}")
print(f"Quantas temperaturas estão acima de 30°C: {acima_de_30}")
