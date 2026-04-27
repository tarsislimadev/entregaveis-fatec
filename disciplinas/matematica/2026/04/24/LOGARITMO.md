# Logaritmo

[explique o que é logaritmo](#)

Logaritmo é o **expoente** ao qual uma base deve ser elevada para gerar um número.

Em outras palavras:

Se

$$
b^x = a
$$

então

$$
\log_b(a) = x
$$

Onde:

- $b$ é a base ($b > 0$ e $b \neq 1$)
- $a$ é o número (logaritmando, com $a > 0$)
- $x$ é o resultado do logaritmo

## Exemplo

$$
\log_2(8) = 3
$$

porque:

$$
2^3 = 8
$$

Ou seja, o logaritmo responde à pergunta:

**"A que potência devo elevar a base para obter esse número?"**

## Casos comuns

- **Logaritmo decimal**: $\log(a)$, base $10$
- **Logaritmo natural (neperiano)**: $\ln(a)$, base $e \approx 2{,}718$

[adicione as bases mais utilizadas](#)

## Bases mais utilizadas

- **Base 10**: muito usada em cálculos do dia a dia, engenharia e notação científica.
- **Base $e$**: muito usada em matemática, física, estatística e crescimento/decrescimento exponencial.
- **Base 2**: muito usada em computação, teoria da informação e análise de algoritmos.

[adicione as consequências das definições](#)

## Consequências das definições

Da definição de logaritmo e das condições $b > 0$, $b \neq 1$ e $a > 0$, seguem consequências importantes:

- O logaritmo só existe para número positivo: $\log_b(a)$ apenas quando $a > 0$.
- $\log_b(1) = 0$, pois $b^0 = 1$.
- $\log_b(b) = 1$, pois $b^1 = b$.
- Se $\log_b(a) = x$, então $b^x = a$ (formas logarítmica e exponencial são equivalentes).
- A função logarítmica é inversa da função exponencial de mesma base.
- Para base $b > 1$, a função $\log_b(a)$ é crescente.
- Para $0 < b < 1$, a função $\log_b(a)$ é decrescente.

[adicione as propriedades operatórias](#)

## Propriedades operatórias

Considerando $a>0$, $c>0$ e base $b>0$, com $b \neq 1$:

- **Produto**:

$$
\log_b(ac)=\log_b(a)+\log_b(c)
$$

- **Quociente**:

$$
\log_b\left(\frac{a}{c}\right)=\log_b(a)-\log_b(c)
$$

- **Potência**:

$$
\log_b(a^n)=n\cdot\log_b(a)
$$

- **Raiz** (caso particular da potência):

$$
\log_b(\sqrt[n]{a})=\log_b(a^{1/n})=\frac{1}{n}\log_b(a)
$$

- **Mudança de base**:

$$
\log_b(a)=\frac{\log_k(a)}{\log_k(b)}
$$

com $k>0$ e $k\neq 1$.

[adicione uma lista de exercícios, de múltipla escolha, com gabarito, e com: 5 questões fáceis, 5](#)questões de nível médio e 5 questões mais desafiadoras)

## Lista de exercícios (múltipla escolha)

### Questões fáceis

1. O valor de $\log_2(8)$ é:
	A) 2  
	B) 3  
	C) 4  
	D) 8

2. O valor de $\log_{10}(1000)$ é:
	A) 1  
	B) 2  
	C) 3  
	D) 10

3. O valor de $\log_5(1)$ é:
	A) 0  
	B) 1  
	C) 5  
	D) não existe

4. Se $\log_3(9)=x$, então $x$ vale:
	A) $\frac{1}{2}$  
	B) 1  
	C) 2  
	D) 3

5. O valor de $\ln(e)$ é:
	A) 0  
	B) 1  
	C) $e$  
	D) 10

### Questões de nível médio

6. Usando propriedades, $\log_2(32) - \log_2(4)$ é:
	A) 1  
	B) 2  
	C) 3  
	D) 4

7. O valor de $\log_3(81) + \log_3(3)$ é:
	A) 4  
	B) 5  
	C) 6  
	D) 7

8. Se $\log_2(x)=5$, então $x$ é:
	A) 10  
	B) 16  
	C) 25  
	D) 32

9. O valor de $\log_4(\sqrt{4})$ é:
	A) $\frac{1}{4}$  
	B) $\frac{1}{2}$  
	C) 1  
	D) 2

10. Se $\log(a)=2$ (base 10), então $a$ vale:
	 A) 20  
	 B) 50  
	 C) 100  
	 D) 1000

### Questões mais desafiadoras

11. O valor de $\log_2(3) + \log_2\left(\frac{8}{3}\right)$ é:
	 A) 2  
	 B) 3  
	 C) 4  
	 D) 5

12. Se $\log_3(x-1)=2$, então $x$ é:
	 A) 8  
	 B) 9  
	 C) 10  
	 D) 11

13. O valor de $\log_5(125) - \log_5(\sqrt{5})$ é:
	 A) $\frac{3}{2}$  
	 B) 2  
	 C) $\frac{5}{2}$  
	 D) 3

14. Sabendo que $\log_2(10)\approx 3{,}322$, o valor aproximado de $\log_4(10)$ é:
	 A) 1,000  
	 B) 1,661  
	 C) 2,000  
	 D) 3,322

15. Se $\log_2(x) + \log_2(x-2)=3$, com $x>2$, então $x$ vale:
	 A) 2  
	 B) $1+\sqrt{17}$  
	 C) 4  
	 D) $2+\sqrt{8}$

## Gabarito

1) B  
2) C  
3) A  
4) C  
5) B  
6) C  
7) B  
8) D  
9) B  
10) C  
11) B  
12) C  
13) C  
14) B  
15) B

