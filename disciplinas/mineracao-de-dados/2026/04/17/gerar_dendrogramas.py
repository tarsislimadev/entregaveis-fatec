from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from scipy.cluster.hierarchy import dendrogram, linkage


# Dados sintéticos para ilustrar similaridade entre 8 objetos.
ROTULOS = ["A", "B", "C", "D", "E", "F", "G", "H"]
PONTOS = np.array(
    [
        [1.0, 1.0],
        [1.2, 1.1],
        [0.9, 1.3],
        [5.0, 4.8],
        [5.2, 5.1],
        [4.8, 5.0],
        [8.8, 1.2],
        [9.1, 1.0],
    ]
)


def gerar_dendrograma(metodo: str, caminho_saida: Path) -> None:
    """Gera e salva um dendrograma de similaridade para um método de ligação."""
    matriz_ligacao = linkage(PONTOS, method=metodo, metric="euclidean")

    plt.figure(figsize=(10, 5), dpi=150)
    dendrogram(matriz_ligacao, labels=ROTULOS, color_threshold=0.0)
    plt.title(f"Dendrograma de Similaridade ({metodo})")
    plt.xlabel("Objetos")
    plt.ylabel("Dissimilaridade (distância euclidiana)")
    plt.tight_layout()
    plt.savefig(caminho_saida)
    plt.close()


if __name__ == "__main__":
    pasta_atual = Path(__file__).parent

    gerar_dendrograma("single", pasta_atual / "dendograma-similaridade.png")
    gerar_dendrograma("complete", pasta_atual / "dendograma-similaridade-complete.png")
    gerar_dendrograma("average", pasta_atual / "dendograma-similaridade-average.png")

    print("Imagens geradas com sucesso.")
