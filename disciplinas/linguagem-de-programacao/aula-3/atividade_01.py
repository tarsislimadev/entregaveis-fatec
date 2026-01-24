

idade = int(input('Digite sua idade:'))
salario = int(input('Digite sua salario:'))

if idade < 18:
  print('Por ter idade menor que 18 anos, você não tem direito ao benefício.')
else:
  if idade < 60:
    if salario <= 2000:
      print('Por ter idade maior que 18 anos e salário menor ou igual a 2000, você tem direito ao benefício')
    else:
      print('Por ter idade maior que 18 anos e salário maior que 2000, você não tem direito ao benefício')
  else:
    print('Por ter idade maior que 60 anos, você tem direito ao benefício')
