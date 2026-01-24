

nota = int(input("Digite a nota do aluno (1-100): "))

print()
if nota < 50:
  print("Reprovado")
else:
  if nota < 70:
    print("Recuperação")
  else:
    if nota < 90:
      print("Aprovado")
    else:
      print("Aprovado com Excelência")
