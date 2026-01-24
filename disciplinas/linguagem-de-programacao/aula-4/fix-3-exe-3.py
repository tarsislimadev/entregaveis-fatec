## Peça um número e some apenas os números pares de 1 até ele

num = int(input("Digite um número: "))

sum = 0

for x in range(1, num + 1):
  if x % 2 == 0:
    sum += num

print(sum)
