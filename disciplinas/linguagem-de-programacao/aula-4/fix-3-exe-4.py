# Caixa Eletrônico: O usuário informa um valor e o programa calcula as notas necessárias (100, 50, 20, 10, 5, 2, 1).

value = int(input("Digite um valor: "))
bills = []

def sum(bs = []):
  x = 0
  for i in bs:
    x += i
  return x

while sum(bills) + 100 <= value:
  bills.append(100)
while sum(bills) + 50 <= value:
  bills.append(50)
while sum(bills) + 20 <= value:
  bills.append(20)
while sum(bills) + 10 <= value:
  bills.append(10)
while sum(bills) + 5 <= value:
  bills.append(5)
while sum(bills) + 2 <= value:
  bills.append(2)
while sum(bills) + 1 <= value:
  bills.append(1)

print(bills)
