ambiente = [[1, 0, 0], [0, 0, 0], [0, 0, 0]]
aspirador = (1, 2)


def lerSensor(pos):
    x, y = pos

    for r in range(1, 3):
        for i in range(x - r, x + r + 1):
            for j in range(y - r, y + r + 1):
                if i < 0 or i > 2 or j < 0 or j > 2:
                    continue

                if ambiente[i][j] == 1:
                    return i, j


def pensar(aspirador, sujeira):
    ax, ay = aspirador
    sx, sy = sujeira
    acoes = []
    while True:
        if (ax, ay) == (sx, sy):
            acoes.append("ASPIRAR")
            ambiente[sx][sy] = 0
            break

        if ax < sx:
            ax += 1
            acoes.append("BAIXO")
        elif ax > sx:
            ax -= 1
            acoes.append("CIMA")
        elif ay < sy:
            ay += 1
            acoes.append("DIREITA")
        elif ay > sy:
            ay -= 1
            acoes.append("ESQUERDA")
    return acoes


sujeira = lerSensor(aspirador)

print("Sujeira detectada em:", sujeira)

acoes = pensar(aspirador, sujeira)

print("Movimentos:", acoes)

for acao in acoes:
    print("Executando:", acao)

    if acao == "ASPIRAR":
        ambiente[sujeira[0]][sujeira[1]] = 0

    if acao == "CIMA":
        x, y = (aspirador[0] - 1, aspirador[1])
    if acao == "BAIXO":
        x, y = (aspirador[0] + 1, aspirador[1])
    if acao == "ESQUERDA":
        x, y = (aspirador[0], aspirador[1] - 1)
    if acao == "DIREITA":
        x, y = (aspirador[0], aspirador[1] + 1)

    if acao != "ASPIRAR":
        print("Movendo de ", aspirador, " para ", (x, y))

    aspirador = (x, y)
