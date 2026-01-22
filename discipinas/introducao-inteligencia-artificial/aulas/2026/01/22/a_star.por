algoritmo AEstrela
// Tradução do algoritmo A* (A-Star) de Python para Portugol.
// Este é um pseudocódigo e não um código executável diretamente.

// Estrutura para representar o grafo.
// Um dicionário (ou mapa) onde a chave é o nome do nó (string)
// e o valor é uma lista de pares (vizinho, custo_da_aresta).
// Ex: Grafo['S'] = [('A', 4), ('B', 10)]
tipo NoGrafo = registro
    nome: cadeia
    custo_aresta: inteiro
fim_registro

// Estrutura para representar a fila de prioridade (Min-Heap).
// Cada elemento na fila será um registro contendo:
// - custo_f: o custo f(n) = g(n) + h(n)
// - no: o nome do nó
tipo ItemFilaPrioridade = registro
    custo_f: inteiro
    no: cadeia
fim_registro

funcao A_Star_Search(Grafo: Dicionario<cadeia, Lista<NoGrafo>>, Inicio: cadeia, Objetivo: cadeia, Heuristicas: Dicionario<cadeia, inteiro>): inteiro
    // Implementação do algoritmo de busca A* (A-Star).
    //
    // @param Grafo: O grafo a ser pesquisado.
    // @param Inicio: O nó inicial.
    // @param Objetivo: O nó objetivo.
    // @param Heuristicas: Os valores heurísticos para cada nó.
    //                      O nó objetivo deve ter um valor heurístico de 0.
    // @return: O custo do caminho do nó inicial ao nó objetivo, ou -1 se nenhum caminho for encontrado.

    // g_custos armazena o custo real do início até cada nó.
    // Inicializa todos os custos com "infinito" e o custo do início com 0.
    g_custos: Dicionario<cadeia, inteiro>
    para cada no_do_grafo em chaves(Grafo) faca
        g_custos[no_do_grafo] = INFINITO
    fim_para
    g_custos[Inicio] = 0

    // open_list (Fila de Prioridade / Min-Heap) armazena (custo_f, nó).
    // O custo_f para o nó inicial é g_custos[Inicio] (0) + Heuristicas[Inicio].
    open_list: FilaDePrioridade<ItemFilaPrioridade> // Fila de prioridade de mínimo
    open_list.inserir({custo_f: Heuristicas[Inicio], no: Inicio}) // Adiciona o nó inicial

    closed_list: Conjunto<cadeia> // Conjunto de nós já visitados/processados

    enquanto (nao open_list.estaVazia()) faca
        item_atual = open_list.extrairMinimo() // Extrai o item com menor custo_f
        custo_f_atual = item_atual.custo_f
        no_atual = item_atual.no

        se (no_atual == Objetivo) entao
            // Quando o objetivo é alcançado, o custo_f_atual é g_custos[Objetivo] + Heuristicas[Objetivo].
            // Como Heuristicas[Objetivo] deve ser 0, o custo_f_atual é o custo total g_custos[Objetivo].
            retorne g_custos[Objetivo]
        fim_se

        se (closed_list.contem(no_atual)) entao
            continue // Ignora se o nó já foi processado
        fim_se

        closed_list.adicionar(no_atual)

        // Itera sobre os vizinhos do nó atual
        para cada vizinho_info em Grafo[no_atual] faca // vizinho_info é um NoGrafo (nome, custo_aresta)
            vizinho_nome = vizinho_info.nome
            custo_aresta = vizinho_info.custo_aresta

            se (closed_list.contem(vizinho_nome)) entao
                continue // Ignora se o vizinho já foi processado
            fim_se

            // Calcula o custo g provisório para chegar ao vizinho através do nó_atual
            g_prov_vizinho = g_custos[no_atual] + custo_aresta

            // Se o vizinho ainda não tem um g_custo ou encontramos um caminho mais curto
            se (nao g_custos.contem(vizinho_nome) ou g_prov_vizinho < g_custos[vizinho_nome]) entao
                g_custos[vizinho_nome] = g_prov_vizinho // Atualiza o g_custo do vizinho
                // Calcula o custo f para o vizinho
                f_vizinho = g_prov_vizinho + Heuristicas[vizinho_nome]
                // Adiciona ou atualiza o vizinho na fila de prioridade
                open_list.inserir({custo_f: f_vizinho, no: vizinho_nome})
            fim_se
        fim_para
    fim_enquanto

    retorne -1 // Nenhum caminho encontrado
fim_funcao

// --- Exemplos de uso ---

// Definição do grafo de exemplo
GrafoExemplo: Dicionario<cadeia, Lista<NoGrafo>>
GrafoExemplo['S'] = [{nome: 'A', custo_aresta: 4}, {nome: 'B', custo_aresta: 10}, {nome: 'C', custo_aresta: 11}]
GrafoExemplo['A'] = [{nome: 'B', custo_aresta: 8}, {nome: 'D', custo_aresta: 5}]
GrafoExemplo['B'] = [{nome: 'D', custo_aresta: 15}]
GrafoExemplo['C'] = [{nome: 'D', custo_aresta: 8}, {nome: 'E', custo_aresta: 20}, {nome: 'F', custo_aresta: 2}]
GrafoExemplo['D'] = [{nome: 'F', custo_aresta: 1}, {nome: 'I', custo_aresta: 20}, {nome: 'H', custo_aresta: 16}]
GrafoExemplo['E'] = [{nome: 'G', custo_aresta: 19}]
GrafoExemplo['F'] = [{nome: 'G', custo_aresta: 13}]
GrafoExemplo['H'] = [{nome: 'J', custo_aresta: 2}, {nome: 'I', custo_aresta: 1}]
GrafoExemplo['I'] = [{nome: 'K', custo_aresta: 13}, {nome: 'G', custo_aresta: 5}, {nome: 'J', custo_aresta: 5}]
GrafoExemplo['J'] = [{nome: 'K', custo_aresta: 7}]
GrafoExemplo['K'] = [{nome: 'G', custo_aresta: 16}]

// Valores heurísticos de exemplo para os nós (heurística admissível)
HeuristicasExemplo: Dicionario<cadeia, inteiro>
HeuristicasExemplo['S'] = 7
HeuristicasExemplo['A'] = 8
HeuristicasExemplo['B'] = 6
HeuristicasExemplo['C'] = 5
HeuristicasExemplo['D'] = 5
HeuristicasExemplo['E'] = 3
HeuristicasExemplo['F'] = 3
HeuristicasExemplo['G'] = 0
HeuristicasExemplo['H'] = 7
HeuristicasExemplo['I'] = 4
HeuristicasExemplo['J'] = 5
HeuristicasExemplo['K'] = 3

// Chama a função de busca A* com os dados de exemplo
RESULTADO_EXEMPLO = A_Star_Search(GrafoExemplo, 'S', 'G', HeuristicasExemplo)
escreva("Resultado do A* Search:", RESULTADO_EXEMPLO)
