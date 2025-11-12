# 7. Função de saudação inteligente

## Crie uma função saudar(nome, hora) que diga 'Bom dia', 'Boa tarde' ou 'Boa noite' conforme o horário informado.

hora = int(input("Digite a hora: "))
nome = input("Digite o nome: ")

if hora < 12:
  print(f"Bom dia, {nome}!")
elif hora < 18:
  print(f"Boa tarde, {nome}!")
else:
  print(f"Boa noite, {nome}!")
