# Atividades - Agentes Baseados em Conhecimento

## Respostas

1. **O que é uma knowledge base (KB) em um agente baseado em conhecimento?**
A **KB (base de conhecimento)** é o conjunto de fatos e regras representados formalmente que o agente usa para raciocinar sobre o ambiente e decidir ações.

2. **O que é uma “sentença” no contexto de representação de conhecimento?**
Uma **sentença** é uma expressão formal (em uma linguagem lógica) que afirma algo que pode ser verdadeiro ou falso em um modelo.

3. **Quais são as duas operações principais realizadas sobre a KB?**
As operações principais são:
- **TELL**: adicionar novas informações (fatos/regras) à KB.
- **ASK**: consultar a KB para inferir respostas.

4. **O que significa inferência em agentes baseados em conhecimento?**
É o processo de derivar novas conclusões a partir do que já está na KB, usando regras lógicas válidas.

5. **No mundo do Wumpus, o que indica a percepção de uma breeze?**
Indica que existe **pelo menos um poço em alguma casa adjacente** (cima, baixo, esquerda ou direita).

6. **Explique o ciclo de funcionamento de um agente baseado em conhecimento: TELL e ASK**
O agente percebe o ambiente e faz **TELL** para registrar a percepção na KB. Em seguida faz **ASK** para perguntar o que pode ser concluído (por exemplo, casas seguras), escolhe uma ação e repete o ciclo a cada passo de tempo.

7. **Qual a diferença entre abordagem declarativa e abordagem procedural?**
- **Declarativa**: descreve *o que é verdadeiro* (fatos e regras).
- **Procedural**: descreve *como fazer* (sequência de passos/comandos).

8. **O que é um modelo em lógica e qual sua relação com “mundo possível”?**
Um **modelo** é uma atribuição de significados/valores de verdade que torna sentenças verdadeiras. O **modelo** representa um **mundo possível** (uma forma possível de o mundo ser).

9. **Explique o conceito de semântica em lógica.**
Semântica define o significado das sentenças: em quais modelos elas são verdadeiras ou falsas.

10. **Por que a representação usada por agentes de busca clássicos é limitada?**
Porque descreve estados e transições sem representar explicitamente conhecimento geral, regras e relações abstratas; isso limita a capacidade de raciocínio e generalização.

11. **Explique formalmente o conceito de entailment (⊨).**
Dizemos que $\alpha \models \beta$ quando, em **todo modelo** onde $\alpha$ é verdadeira, $\beta$ também é verdadeira. Ou seja, $\beta$ é consequência lógica de $\alpha$.

12. **Interprete: α ⊨ β ⟺ M(α) ⊆ M(β)**
Significa que $\alpha$ implica logicamente $\beta$ se, e somente se, o conjunto de modelos que satisfazem $\alpha$ está contido no conjunto de modelos que satisfazem $\beta$.

13. **No exemplo do Wumpus: por que o agente pode concluir que não há poço em [1,2], mas não em [2,2]?**
Porque as percepções e regras disponíveis eliminam a possibilidade de poço em [1,2], mas ainda deixam ao menos um modelo possível com poço em [2,2]. Logo, não há entailment para “sem poço em [2,2]”.

14. **Por que model checking é considerado um algoritmo de inferência?**
Porque ele verifica sistematicamente os modelos para decidir se uma conclusão é consequência lógica da KB (se a conclusão vale em todos os modelos da KB).

15. **Por que o raciocínio lógico garante conclusões verdadeiras no mundo real (assumindo KB correta)?**
Se a KB descreve corretamente o mundo e o método de inferência é correto, então as conclusões derivadas preservam verdade lógica e correspondem ao mundo descrito.

16. **Explique o conceito de grounding e seu papel em agentes inteligentes.**
**Grounding** é conectar símbolos/representações internas a entidades, percepções e ações reais do ambiente. Sem grounding, o agente manipula símbolos sem “significado operacional” no mundo.

17. **Por que a ausência de percepção (ex: ausência de breeze) pode gerar inferência?**
Porque a ausência também é informação: em Wumpus, “não sentir breeze” implica que não há poço nas casas adjacentes, permitindo concluir segurança local.

18. **Como o agente combina informações de tempos diferentes para inferir a localização de um poço?**
Ele acumula percepções na KB ao longo do tempo (ex.: breeze em uma célula, ausência em outra) e cruza restrições. A interseção dessas restrições pode isolar uma única posição compatível para o poço.

19. **Por que um algoritmo de inferência precisa ser sound?**
Para garantir que tudo o que ele conclui é realmente consequência lógica da KB. Sem soundness, o agente pode inferir coisas falsas e agir incorretamente.

20. **Compare espaço de modelos finito e infinito e o impacto na inferência.**
- **Finito**: em princípio, pode-se enumerar modelos (model checking completo é viável, embora possa ser caro).
- **Infinito**: não dá para enumerar tudo; são necessárias técnicas simbólicas/regras de prova. Isso torna a inferência mais desafiadora e, em alguns casos, indecidível.
