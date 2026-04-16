# Linguagem de Programação 2 - 2026-04-16

## Funções Hash (em Python)

Funções hash em Python convertem dados de entrada em strings de bytes de tamanho fixo usando a função `hash()`. Essas funções são essenciais para:

- Operações de Dicionário e Conjunto: Funções hash determinam onde os valores são armazenados internamente
- Integridade de Dados: Detectar se os dados foram modificados usando algoritmos de hash como MD5, SHA-1 e SHA-256
- Desempenho: Ativar tempos de busca O(1) em tabelas hash

O `hash()` integrado do Python retorna um valor hash inteiro para qualquer objeto hashable (strings, tuplas, números, etc.). Para fins criptográficos, o módulo `hashlib` fornece algoritmos de hash seguro.

### Exemplo:
```python
# Hash integrado
print(hash("hello"))  # Saída: valor hash (varia por sessão)

# Hash criptográfico
import hashlib
text = "hello"
hash_obj = hashlib.sha256(text.encode())
print(hash_obj.hexdigest())  # Saída: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```
