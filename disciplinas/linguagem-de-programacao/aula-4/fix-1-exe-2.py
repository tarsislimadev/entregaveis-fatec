allowed = False

while not allowed:
    password = input("Digite a senha: ")
    if password == "123mudar":
        print("Acesso permitido!")
        allowed = True
    else:
        print("Senha incorreta. Tente novamente.")
