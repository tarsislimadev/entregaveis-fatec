# Linguagem de Programação 2 - 2026-04-16

## Funções Hash (em Python)

Hash functions in Python convert input data into fixed-size byte strings using the `hash()` function. These functions are essential for:

- Dictionary and Set Operations: Hash functions determine where values are stored internally
- Data Integrity: Detect if data has been modified using hashing algorithms like MD5, SHA-1, and SHA-256
- Performance: Enable O(1) lookup times in hash tables

Python's built-in `hash()` returns an integer hash value for any hashable object (strings, tuples, numbers, etc.). For cryptographic purposes, the `hashlib` module provides secure hash algorithms.

### Example:
```python
# Built-in hash
print(hash("hello"))  # Output: hash value (varies by session)

# Cryptographic hashing
import hashlib
text = "hello"
hash_obj = hashlib.sha256(text.encode())
print(hash_obj.hexdigest())  # Output: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
```
