# Introdução à Inteligencia Artificial - 2026/04/27

## Recozimento Simulado

O **Recozimento Simulado** (*Simulated Annealing*) é uma meta-heurística inspirada no processo físico de resfriamento de metais.

Ideia central:
- Começamos com uma solução inicial.
- Geramos pequenas variações (soluções vizinhas).
- Se a nova solução for melhor, aceitamos.
- Se for pior, ainda podemos aceitar com certa probabilidade, para escapar de ótimos locais.
- Essa probabilidade diminui com o tempo por meio de uma **temperatura** que vai sendo reduzida.

Componentes principais:
- **Função objetivo**: mede a qualidade da solução.
- **Vizinhança**: forma de gerar novas soluções próximas.
- **Temperatura inicial (T0)**: controla o nível de exploração no início.
- **Taxa de resfriamento**: define como a temperatura diminui (ex.: `T = alpha * T`, com `0 < alpha < 1`).
- **Critério de parada**: número de iterações, temperatura mínima ou ausência de melhora.

Vantagens:
- Simples de implementar.
- Consegue sair de mínimos locais.
- Útil para problemas de otimização combinatória.

Limitações:
- Sensível à escolha dos parâmetros.
- Pode ser mais lento que métodos guloso-locais quando mal calibrado.

```python
import math, random

# Exemplo de função objetivo (minimização):
# queremos encontrar x que minimize f(x) = x² + 4*sin(x)
def f(x):
	return x**2 + 4 * math.sin(x)

# Gera uma solução vizinha com pequena perturbação aleatória
def vizinho(x, passo=0.5):
	return x + random.uniform(-passo, passo)

def recozimento_simulado(
	x_inicial,
	T0=100.0,
	alpha=0.95,
	T_min=1e-3,
	iter_por_temp=100,
):
	x_atual = x_inicial
	f_atual = f(x_atual)

	x_melhor = x_atual
	f_melhor = f_atual

	T = T0

	while T > T_min:
		for _ in range(iter_por_temp):
			x_novo = vizinho(x_atual)
			f_novo = f(x_novo)

			delta = f_novo - f_atual

			# Se melhorou, aceita sempre
			if delta < 0:
				x_atual, f_atual = x_novo, f_novo
			else:
				# Se piorou, aceita com probabilidade e^(-delta/T)
				prob = math.exp(-delta / T)
				if random.random() < prob:
					x_atual, f_atual = x_novo, f_novo

			# Atualiza melhor solução global encontrada
			if f_atual < f_melhor:
				x_melhor, f_melhor = x_atual, f_atual

		# Resfriamento da temperatura
		T *= alpha

	return x_melhor, f_melhor

if __name__ == "__main__":
	random.seed(42)
	x0 = random.uniform(-10, 10)
	melhor_x, melhor_f = recozimento_simulado(x0)
	print(f"x inicial: {x0:.4f}")
	print(f"melhor x : {melhor_x:.4f}")
	print(f"f(x)     : {melhor_f:.4f}")
```

## Descida da Colina

A **Descida da Colina** (*Hill Climbing*) é um método de busca local que melhora a solução passo a passo, sempre escolhendo um vizinho melhor.

Funcionamento básico:
- Inicia com uma solução qualquer.
- Avalia soluções vizinhas.
- Move para a melhor vizinha que melhora o valor atual.
- Repete.
- Para quando não encontrar vizinho melhor.

Características:
- Estratégia **gulosa**: considera apenas melhora imediata.
- Rápida e fácil de aplicar.
- Pode parar em **ótimos locais**, **platôs** e **cristas**.

Variações comuns:
- "Steepest-ascent": escolhe o melhor vizinho entre todos.
- "First-choice": escolhe o primeiro vizinho que melhora.
- "Random-restart": reinicia de vários pontos aleatórios para aumentar a chance de achar soluções melhores.

Comparação com Recozimento Simulado:
- Descida da Colina: mais simples e rápida, porém mais propensa a ficar presa.
- Recozimento Simulado: aceita piores movimentos no início, aumentando exploração e chance de escapar de ótimos locais.

```python
import math, random

# Mesma função objetivo (minimização)
def f(x):
	return x**2 + 4 * math.sin(x)

# Gera n vizinhos em torno de x
def gerar_vizinhos(x, n=20, passo=0.5):
	return [x + random.uniform(-passo, passo) for _ in range(n)]

def descida_colina(x_inicial, max_iter=1000, n_vizinhos=20, passo=0.5):
	x_atual = x_inicial
	f_atual = f(x_atual)

	for _ in range(max_iter):
		vizinhos = gerar_vizinhos(x_atual, n=n_vizinhos, passo=passo)

		# Steepest-ascent (aqui para minimização): escolhe o melhor vizinho
		x_melhor_vizinho = min(vizinhos, key=f)
		f_melhor_vizinho = f(x_melhor_vizinho)

		# Move apenas se houver melhora
		if f_melhor_vizinho < f_atual:
			x_atual, f_atual = x_melhor_vizinho, f_melhor_vizinho
		else:
			# Parada: não há vizinho melhor (ótimo local/platô)
			break

	return x_atual, f_atual

def random_restart_descida_colina(
	reinicios=20,
	limite_inferior=-10,
	limite_superior=10,
):
	melhor_x = None
	melhor_f = float("inf")

	for _ in range(reinicios):
		x0 = random.uniform(limite_inferior, limite_superior)
		x_final, f_final = descida_colina(x0)

		if f_final < melhor_f:
			melhor_x, melhor_f = x_final, f_final

	return melhor_x, melhor_f

if __name__ == "__main__":
	random.seed(42)

	# Execução simples
	x0 = random.uniform(-10, 10)
	x_final, f_final = descida_colina(x0)
	print("Descida da Colina (uma execução):")
	print(f"x inicial: {x0:.4f} | x final: {x_final:.4f} | f(x): {f_final:.4f}")

	# Versão com random-restart
	melhor_x, melhor_f = random_restart_descida_colina(reinicios=30)
	print("Random-Restart:")
	print(f"melhor x: {melhor_x:.4f} | melhor f(x): {melhor_f:.4f}")
```

## Algoritmo Genetico

O **Algoritmo Genético** (*Genetic Algorithm*) é uma meta-heurística inspirada na evolução biológica.

Ideia central:
- Mantemos uma **população** de soluções candidatas.
- Avaliamos cada solução com uma **função de aptidão** (*fitness*).
- Selecionamos as melhores para reprodução.
- Geramos novos indivíduos com **cruzamento** e **mutação**.
- Repetimos por várias gerações até atingir um critério de parada.

Componentes principais:
- **Representação (cromossomo)**: como codificar uma solução (vetor, string binária, etc.).
- **Função de aptidão**: mede o quão boa é a solução.
- **Seleção**: define quem reproduz (ex.: torneio, roleta).
- **Cruzamento (crossover)**: combina partes de dois pais.
- **Mutação**: pequenas alterações aleatórias para manter diversidade.
- **Elitismo (opcional)**: preserva os melhores indivíduos para a próxima geração.
- **Critério de parada**: número de gerações, aptidão alvo ou estagnação.

Vantagens:
- Boa exploração global do espaço de busca.
- Não exige derivadas da função objetivo.
- Funciona bem em problemas grandes, não lineares e combinatórios.

Limitações:
- Exige ajuste de parâmetros (taxa de mutação, tamanho da população etc.).
- Pode convergir prematuramente sem diversidade.
- Pode ter custo computacional alto para muitas gerações.

```python
import math
import random

# Exemplo de função objetivo (minimização):
# queremos encontrar x que minimize f(x) = x² + 4*sin(x)
def f(x):
	return x**2 + 4 * math.sin(x)

# Como AG costuma trabalhar com maximização de fitness,
# convertemos custo em fitness positiva maior = melhor
def fitness(x):
	return 1.0 / (1.0 + f(x) - (-3.0))  # deslocamento aproximado para manter estabilidade

def inicializar_populacao(tamanho=30, limite_inferior=-10, limite_superior=10):
	return [random.uniform(limite_inferior, limite_superior) for _ in range(tamanho)]

def selecao_torneio(populacao, k=3):
	candidatos = random.sample(populacao, k)
	# minimização: vence o menor f(x)
	return min(candidatos, key=f)

def crossover_media(pai1, pai2):
	# cruzamento simples para variável real
	alpha = random.random()
	filho = alpha * pai1 + (1 - alpha) * pai2
	return filho

def mutacao_gaussiana(x, taxa_mutacao=0.2, sigma=0.3):
	if random.random() < taxa_mutacao:
		x += random.gauss(0, sigma)
	return x

def limitar(x, limite_inferior=-10, limite_superior=10):
	return max(limite_inferior, min(limite_superior, x))

def algoritmo_genetico(
	tamanho_pop=40,
	geracoes=100,
	taxa_mutacao=0.2,
	elitismo=2,
	limite_inferior=-10,
	limite_superior=10,
):
	pop = inicializar_populacao(tamanho_pop, limite_inferior, limite_superior)

	for _ in range(geracoes):
		# Ordena por qualidade (minimização)
		pop.sort(key=f)

		# Elitismo: mantém os melhores
		nova_pop = pop[:elitismo]

		# Gera o restante da população
		while len(nova_pop) < tamanho_pop:
			pai1 = selecao_torneio(pop)
			pai2 = selecao_torneio(pop)

			filho = crossover_media(pai1, pai2)
			filho = mutacao_gaussiana(filho, taxa_mutacao=taxa_mutacao)
			filho = limitar(filho, limite_inferior, limite_superior)

			nova_pop.append(filho)

		pop = nova_pop

	melhor_x = min(pop, key=f)
	melhor_f = f(melhor_x)
	return melhor_x, melhor_f

if __name__ == "__main__":
	random.seed(42)
	melhor_x, melhor_f = algoritmo_genetico(
		tamanho_pop=50,
		geracoes=120,
		taxa_mutacao=0.25,
		elitismo=2,
	)
	print("Algoritmo Genético:")
	print(f"melhor x: {melhor_x:.4f}")
	print(f"f(x): {melhor_f:.4f}")
```

Comparação rápida:
- **Descida da Colina**: exploração local, rápida, pode travar em ótimos locais.
- **Recozimento Simulado**: exploração local com aceitação probabilística de piores movimentos.
- **Algoritmo Genético**: busca populacional/global, maior diversidade e robustez para espaços complexos.

## Avaliação

- [ ] Prova Teorica, dia 18/05/2026
