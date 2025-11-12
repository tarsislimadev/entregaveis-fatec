# 11. Contador de letras inteligentes

## Peça uma palavra e mostre quantas letras, vogais e consoantes ela tem.

palavra = input("Digite uma palavra: ")

letras = len(palavra)
vogais = sum(1 for letra in palavra if letra in 'aeiou')
consoantes = letras - vogais

print(f"A palavra tem {letras} letras.")
print(f"A palavra tem {vogais} vogais.")
print(f"A palavra tem {consoantes} consoantes.")
