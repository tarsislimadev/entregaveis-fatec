# 18. Mini chatbot

## Crie um chatbot simples que responde de forma diferente a algumas frases e encerra quando o usuário digitar 'sair'.

while True:
    pergunta = input("Você: ").strip().lower()
    if pergunta == 'sair':
        print("Chatbot: Até logo!")
        break
    elif "olá" in pergunta or "oi" in pergunta:
        print("Chatbot: Olá! Como posso ajudar você hoje?")
    elif "nome" in pergunta:
        print("Chatbot: Eu sou um chatbot super simples!")
    elif "tudo bem" in pergunta:
        print("Chatbot: Estou bem, obrigado por perguntar!")
    elif "obrigado" in pergunta or "obrigada" in pergunta:
        print("Chatbot: De nada! Se precisar de mais alguma coisa, é só falar.")
    else:
        print("Chatbot: Desculpe, não entendi. Poderia repetir?")
