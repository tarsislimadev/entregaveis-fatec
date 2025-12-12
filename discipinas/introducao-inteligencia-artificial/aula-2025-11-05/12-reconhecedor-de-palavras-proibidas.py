# 12. Reconhecedor de palavras proibidas

## Peça uma frase e verifique se contém palavras proibidas. Se tiver, exiba um alerta.

palavras_proibidas = ['futebol', 'cachorro', 'gato', 'cachorro', 'gato']

frase = input("Digite uma frase: ").split()

def reconhecer_palavras_proibidas(frase):
    for palavra in frase:
        if palavra in palavras_proibidas:
            return f'A frase contém a palavra proibida: {palavra}'
    return 'A frase não contém palavras proibidas!'

print(reconhecer_palavras_proibidas(frase))
