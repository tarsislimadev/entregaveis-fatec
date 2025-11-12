# 19. Analisador de texto

## Peça um texto e mostre o total de caracteres, palavras, a palavra mais longa e a letra mais frequente.

texto = input("Digite um texto: ").strip()

total_caracteres = len(texto)
palavras = texto.split()
total_palavras = len(palavras)
palavra_mais_longa = max(palavras, key=len) if palavras else ''
# Conta apenas letras, ignora espaços e case
from collections import Counter
letras = [c.lower() for c in texto if c.isalpha()]
mais_frequente = Counter(letras).most_common(1)
letra_mais_frequente = mais_frequente[0][0] if mais_frequente else ''

print(f"Total de caracteres: {total_caracteres}")
print(f"Total de palavras: {total_palavras}")
print(f"Palavra mais longa: {palavra_mais_longa}")
print(f"Letra mais frequente: {letra_mais_frequente}")
