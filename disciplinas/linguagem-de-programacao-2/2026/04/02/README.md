# Linguagem de Programação 2 - Aula 02/04/2026

[Web Scraping](web-scraping.pdf)

## Bibliotecas

### [WebBrowser](https://docs.python.org/3/library/webbrowser.html)

Abra páginas web com Python.

```python
import webbrowser

webbrowser.open("https://www.google.com")
```

### [Requests](https://pypi.org/project/requests/)

Faça requisições HTTP com Python.

```python
import requests

response = requests.get("https://www.google.com")

print(response.status_code)
```

### [BeautifulSoup4](https://pypi.org/project/beautifulsoup4/)

Faça parse de HTML com Python.

```python
from bs4 import BeautifulSoup

html = "<html><body><h1>Hello World</h1></body></html>"

soup = BeautifulSoup(html, "html.parser")

print(soup.h1.string)
```
