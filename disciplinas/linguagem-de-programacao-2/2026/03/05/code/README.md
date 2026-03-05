# Aula 4 - Exemplos de Programação Orientada a Objetos (POO) em Python

## Introdução

Este diretório contém diversos exemplos práticos de conceitos fundamentais de Orientação a Objetos em Python, divididos por tópicos nos respectivos subdiretórios.

## Estrutura do Diretório

Abaixo está o detalhamento de cada pasta e arquivo presente nesta aula:

### 1. `EmployeeManagerInheritance` (Herança)
Demonstra o conceito de **Herança** e **Sobrescrita de Métodos (Method Overriding)**.
- Define uma classe base `Employee` com funcionalidades e dados padrões.
- O código é então estendido por uma subclasse base `Manager` (herdando de `Employee`), que demonstra como reutilizar construtores base (via `super().__init__()`) e modificar o comportamento original de métodos como o cálculo de pagamento anual para suportar bônus dinâmicos.

### 2. `PersonGettersSettersAndDirectAccess` (Acesso e Encapsulamento Básico)
Compara a abordagem tradicional de acesso direto com os métodos estilo Java: `getter` e `setter`.
- Explora a diferença de interação entre leitura/escrita direta (`person.salary = 10`) e métodos de manipulação de valores explícitos (`getSalary()` e `setSalary()`).

### 3. `PrivatePersonWIthNameMangling` (Atributos Privados)
Ilustra como proteger dados em Python utilizando o artifício de **Name Mangling**.
- Atributos iniciados por dois sublinhados sequenciais (ex: `self.__privateData`) são sutilmente escondidos de modificadores externos pelo interpretador Python, forçando a adoção de métodos para seu gerenciamento e desencorajando seu uso fora da definição da classe.

### 4. `PropertyDecorator` (Decoradores e Validação)
Explora o jeito recomendado e idiomático do Python gerenciar métodos `getters` e `setters`.
- Demonstra o uso da sintaxe unificada utilizando o decorador `@property` (para acessar os dados) e o decorador `@<atributo>.setter` (para validar e salvar dados novos).
- Usado de modelo também para validar proativamente a "tipagem" e coerência lógica de um dado atribuído em tempo de execução.

### 5. `Stack` (Estrutura de Dados LIFO)
Implementa uma **Pilha (Last-In, First-Out)** usando uma classe clássica de abstração.
- Esconde deliberadamente das chamadas externas as capacidades abertas da manipulação de Listas pelo Python, oferecendo rigidamente os verbos clássicos de pilhas que garantem a restrição desejada: ação `push()`, retirada `pop()`, leitura top-level `peek()` e o tamanho puro no `getSize()`.

### 6. `ValidatingData_ClubExample` (Condições e Estado)
Exemplo prático simulando gestão restritiva através de listas de manutenção.
- A classe Club possui uma capacidade máxima pré-definida no seu construtor (`maxMembers`). Seu método de adição, invés de apenas injetar na estrutura de dados, aplica uma validação contra regra de limite de recursos de dados, gerenciando cenários falsos com naturalidade.

### 7. Arquivo `isInstanceIsSubclass.py` (Checagem de Classe)
Código direto com exemplos dos dois métodos built-ins clássicos para validação condicional relacional:
- **`isinstance(obj, Class)`**: Valida se o referencial no pacote em execução pertence ou compartilha hierarquia com um determinado classe modelo.
- **`issubclass(Subclass, ParentClass)`**: Verifica a veracidade literal que uma dada declaração de Classe é de fatos extensão herdeira de uma outra sem necessariamente envolver objetos instanciados na regra.
