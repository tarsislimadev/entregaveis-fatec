peso = int(input("Digite seu peso (kg): "))
altura = float(input("Digite seu altura (m): "))

imc = peso / (altura * altura)

if imc < 18.5:
  print('Abaixo do peso')
else:
  if imc < 25:
    print('Peso normal')
  else:
    if imc < 30:
      print('Sobrepeso')
    else:
      if imc < 35:
        print('Obesidade Grau 1')
      else:
        if imc < 40:
          print('Obesidade Grau 2')
        else:
          print('Obesidade Grau 3')
