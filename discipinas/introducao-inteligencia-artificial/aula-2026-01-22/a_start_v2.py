from heapq import heappop, heappush

def a_star_search(graph: dict, start: str, goal: str, heuristic_values: dict):
    '''
    A* search algorithm implementation.

    @return: (path_cost, path_list) or (-1, [])
    '''

    open_list = [(heuristic_values[start], start)]
    closed_list = set()

    # Guarda de onde cada nó veio
    came_from = {}

    # Guarda o melhor custo g(x) encontrado até cada nó
    g_cost = {start: 0}

    while open_list:
        f_cost, node = heappop(open_list)

        if node == goal:
            # Reconstrução do caminho
            path = [goal]
            while path[-1] != start:
                path.append(came_from[path[-1]])
            path.reverse()
            return g_cost[goal], path

        if node in closed_list:
            continue

        closed_list.add(node)

        for neighbor, edge_cost in graph[node]:
            if neighbor in closed_list:
                continue

            tentative_g = g_cost[node] + edge_cost

            # Se o vizinho ainda não foi visitado ou encontramos um caminho melhor
            if neighbor not in g_cost or tentative_g < g_cost[neighbor]:
                came_from[neighbor] = node
                g_cost[neighbor] = tentative_g
                f_neighbor = tentative_g + heuristic_values[neighbor]
                heappush(open_list, (f_neighbor, neighbor))

    return -1, []  # No path found

EXAMPLE_GRAPH = {
    'S': [('A', 4), ('B', 10), ('C', 11)],
    'A': [('B', 8), ('D', 5)],
    'B': [('D', 15)],
    'C': [('D', 8), ('E', 20), ('F', 2)],
    'D': [('F', 1), ('I', 20), ('H', 16)],
    'E': [('G', 19)],
    'F': [('G', 13)],
    'H': [('J', 2), ('I', 1)],
    'I': [('K', 13), ('G', 5), ('J', 5)],
    'J': [('K', 7)],
    'K': [('G', 16)]
}

# Node heuristic values (admissible heuristic values for the nodes)
EXAMPLE_HEURISTIC_VALUES = {
    'S': 7,
    'A': 8,
    'B': 6,
    'C': 5,
    'D': 5,
    'E': 3,
    'F': 3,
    'G': 0,
    'H': 7,
    'I': 4,
    'J': 5,
    'K': 3
}

EXAMPLE_RESULT = a_star_search(EXAMPLE_GRAPH, 'S', 'G', EXAMPLE_HEURISTIC_VALUES)
print(EXAMPLE_RESULT)
