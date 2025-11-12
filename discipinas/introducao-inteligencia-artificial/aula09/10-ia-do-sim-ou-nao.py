# 10. IA do 'sim ou não'

## O usuário faz uma pergunta, e o programa responde aleatoriamente com 'Sim', 'Não' ou 'Talvez'.

import random

respostas = ['Sim', 'Não', 'Talvez']

pergunta = input("Faça uma pergunta: ")

print(f"A IA respondeu: {respostas[random.randint(0, 2)]}")
