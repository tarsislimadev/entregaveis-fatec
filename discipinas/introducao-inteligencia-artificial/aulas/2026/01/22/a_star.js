class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIndex(i) {
        return 2 * i + 1;
    }

    getRightChildIndex(i) {
        return 2 * i + 2;
    }

    hasParent(i) {
        return this.getParentIndex(i) >= 0;
    }

    hasLeftChild(i) {
        return this.getLeftChildIndex(i) < this.heap.length;
    }

    hasRightChild(i) {
        return this.getRightChildIndex(i) < this.heap.length;
    }

    getParent(i) {
        return this.heap[this.getParentIndex(i)];
    }

    getLeftChild(i) {
        return this.heap[this.getLeftChildIndex(i)];
    }

    getRightChild(i) {
        return this.heap[this.getRightChildIndex(i)];
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    insert(item) {
        this.heap.push(item);
        this.heapifyUp();
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }

        const item = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return item;
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.hasParent(index) && this.getParent(index)[0] > this.heap[index][0]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    heapifyDown() {
        let index = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) && this.getRightChild(index)[0] < this.getLeftChild(index)[0]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.heap[index][0] < this.heap[smallerChildIndex][0]) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}

function a_star_search(graph, start, goal, heuristic_values) {
    /**
     * A* search algorithm implementation.
     *
     * @param {object} graph - The graph to search.
     * @param {string} start - The starting node.
     * @param {string} goal - The goal node.
     * @param {object} heuristic_values - The heuristic values for each node. The goal node must be admissible, and the heuristic value must be 0.
     * @return {number} The path cost from the start node to the goal node.
     */

    // A min heap is used to implement the priority queue for the open list.
    const openList = new MinHeap();
    // The closed list is implemented as a set for efficient membership checking.
    const closedList = new Set();

    openList.insert([heuristic_values[start], start]);

    while (!openList.isEmpty()) {
        let [cost, node] = openList.extractMin();

        // The algorithm ends when the goal node has been explored, NOT when it is added to the open list.
        if (node === goal) {
            return cost;
        }

        if (closedList.has(node)) {
            continue;
        }

        closedList.add(node);

        // Subtract the heuristic value as it was overcounted.
        cost -= heuristic_values[node];

        if (graph[node]) {
            for (const [neighbor, edge_cost] of graph[node]) {
                if (closedList.has(neighbor)) {
                    continue;
                }

                // f(x) = g(x) + h(x), where g(x) is the path cost and h(x) is the heuristic.
                const neighbor_cost = cost + edge_cost + heuristic_values[neighbor];
                openList.insert([neighbor_cost, neighbor]);
            }
        }
    }

    return -1; // No path found
}

const EXAMPLE_GRAPH = {
    'S': [['A', 4], ['B', 10], ['C', 11]],
    'A': [['B', 8], ['D', 5]],
    'B': [['D', 15]],
    'C': [['D', 8], ['E', 20], ['F', 2]],
    'D': [['F', 1], ['I', 20], ['H', 16]],
    'E': [['G', 19]],
    'F': [['G', 13]],
    'H': [['J', 2], ['I', 1]],
    'I': [['K', 13], ['G', 5], ['J', 5]],
    'J': [['K', 7]],
    'K': [['G', 16]]
};

// Node heuristic values (admissible heuristic values for the nodes)
const EXAMPLE_HEURISTIC_VALUES = {
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
};

const EXAMPLE_RESULT = a_star_search(EXAMPLE_GRAPH, 'S', 'G', EXAMPLE_HEURISTIC_VALUES);
console.log(EXAMPLE_RESULT);
