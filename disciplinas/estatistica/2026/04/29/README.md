# Estatistica - 2026/04/29

## Estatistica Inferencial

Estatística inferencial é a área da estatística que usa dados de uma amostra para tirar conclusões sobre uma população inteira. Como normalmente não é viável medir todos os elementos da população, coletamos uma parte representativa e aplicamos métodos probabilísticos para estimar parâmetros e testar hipóteses.

### Conceitos principais

- **População:** conjunto total de interesse (ex.: todos os alunos de uma faculdade).
- **Amostra:** subconjunto da população usado na análise.
- **Parâmetro:** medida numérica da população (ex.: média populacional, proporção verdadeira).
- **Estatística amostral:** medida calculada com base na amostra (ex.: média da amostra).

### Objetivos da estatística inferencial

1. **Estimar parâmetros** da população com base na amostra.
2. **Quantificar incerteza** por meio de erro padrão, margem de erro e intervalos de confiança.
3. **Testar hipóteses** para apoiar decisões com evidência estatística.

### Estimação

- **Estimativa pontual:** fornece um único valor para o parâmetro (ex.: \(\bar{x}\) para estimar \(\mu\)).
- **Intervalo de confiança (IC):** fornece uma faixa plausível de valores para o parâmetro, com um nível de confiança (ex.: 95%).

Exemplo: um IC de 95% para a média pode ser [68, 72]. Isso indica que, pelo método adotado, intervalos construídos repetidamente conteriam a média real em 95% dos casos.

### Testes de hipóteses

Processo básico:

1. Definir **hipótese nula** (\(H_0\)) e **hipótese alternativa** (\(H_1\)).
2. Escolher nível de significância (**\(\alpha\)**, geralmente 0,05).
3. Calcular a estatística de teste e o **p-valor**.
4. Comparar p-valor com \(\alpha\):
	- se **p ≤ \(\alpha\)**, rejeita-se \(H_0\);
	- se **p > \(\alpha\)**, não se rejeita \(H_0\).

### Erros em decisões inferenciais

- **Erro tipo I:** rejeitar \(H_0\) quando ela é verdadeira.
- **Erro tipo II:** não rejeitar \(H_0\) quando ela é falsa.

### Distribuições e ferramentas comuns

- Distribuição normal, t de Student, qui-quadrado e F.
- Regressão, correlação, ANOVA e testes para médias/proporções.

### Boas práticas

- Garantir amostragem adequada e, quando possível, aleatória.
- Verificar pressupostos dos testes (normalidade, independência, homogeneidade de variâncias).
- Reportar tamanho de efeito além do p-valor.
- Interpretar resultados no contexto do problema, evitando conclusões causais indevidas.

Em resumo, a estatística inferencial permite transformar dados amostrais em decisões e conclusões sobre populações, sempre considerando a incerteza associada ao processo.
