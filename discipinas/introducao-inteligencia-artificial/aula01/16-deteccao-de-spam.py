# 16. Detecção de spam

## Verifique se um texto contém palavras suspeitas como 'grátis', 'dinheiro fácil', 'clique aqui' e classifique o e-mail como spam ou não.

palavras_suspeitas = ['grátis', 'dinheiro fácil', 'clique aqui', 'ganhe dinheiro', 'ganhe dinheiro rápido', 'ganhe dinheiro fácil', 'ganhe dinheiro rápido', 'ganhe dinheiro fácil']

def deteccao_de_spam(texto):
    for palavra in texto.split():
        if palavra in palavras_suspeitas:
            return f'O texto é spam! Palavra suspeita: {palavra}'
    return 'O texto não é spam!'

texto = input("Digite o texto: ").strip().lower()
print(deteccao_de_spam(texto))
