# faça um programa que mostre a data no formato por extenso. O programa deve receber três números, representando dia, mês e ano, respectivamente.

dia = int(input("dia: "))
mes = int(input("mês: "))
ano = int(input("ano: "))

meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

print(f"{dia} de {meses[mes - 1]} de {ano}")