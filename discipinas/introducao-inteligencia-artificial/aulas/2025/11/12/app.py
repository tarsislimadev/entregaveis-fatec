# Sensor de sujeira (ou aspirador guloso)

# Implemente um sensor no aspirador que permita identificar a sujeira mais próxima e então desloca-se até ela para realizar a limpeza.
# Esse sensor opera da localização do agente até os limites da sala: primeiro são avaliadas as localidades que são acessíveis com um único movimento do agente, depois aquelas acessíveis com dois movimentos, depois aquelas acessíveis com três movimentos e assim por diante.
# Dessa forma, a primeira sujeira a ser encontrada torna-se o alvo e o agente move-se até ela. No meio do caminho, o sensor é desligado e outras sujeiras não são identificadas até que a limpeza do alvo atual seja feita.
# Cuidado com a bateria!!

from collections import deque

aspirador = [1, 1]
ambiente = [
  [0, 0, 1],
  [0, 0, 1],
  [1, 1, 1],
]

def pos_vizinhas(pos, tamanho):
    x, y = pos
    vizinhas = []
    movimentos = [(-1,0),(1,0),(0,-1),(0,1)] # cima, baixo, esquerda, direita
    for dx, dy in movimentos:
        nx, ny = x + dx, y + dy
        if 0 <= nx < tamanho and 0 <= ny < tamanho:
            vizinhas.append((nx, ny))
    return vizinhas

def encontrar_sujeira_mais_proxima(aspirador, ambiente):
    tamanho = len(ambiente)
    visitados = set()
    fila = deque()
    fila.append((tuple(aspirador), []))  # [(posição_atual, caminho percorrido)]
    while fila:
        pos, caminho = fila.popleft()
        if ambiente[pos[0]][pos[1]] == 1:
            return caminho + [pos]
        for vizinha in pos_vizinhas(pos, tamanho):
            if vizinha not in visitados:
                visitados.add(vizinha)
                fila.append((vizinha, caminho + [pos]))
    return None  # Nenhuma sujeira encontrada

def mover_e_limpar(aspirador, ambiente):
    caminho = encontrar_sujeira_mais_proxima(aspirador, ambiente)
    if not caminho:
        print('Todas as sujeiras foram limpas!')
        return False
    print(f"Movendo para a sujeira em {caminho[-1]}")
    for passo in caminho[1:]:  # aspirador já está na posição inicial
        aspirador[0], aspirador[1] = passo
        print(f"Aspirador moveu para {passo}")
    # Limpar sujeira
    ambiente[aspirador[0]][aspirador[1]] = 0
    print(f"Sujeira limpa em {aspirador}")
    return True

# Loop até limpar tudo
while True:
    if not any(1 in linha for linha in ambiente):
        print('Limpeza concluída!')
        break
    sucesso = mover_e_limpar(aspirador, ambiente)
    if not sucesso:
        break
