# Banco de Dados Não Relacional

## Unidade 2

## Perguntas Avaliativas

Pergunta: Durante uma aula sobre transição conceitual entre SQL e MongoDB, foi solicitado converter a consulta SQL a seguir: `SELECT nome FROM produtos WHERE preco > 100`. Qual seria a equivalente correta dessa consulta em MongoDB?

Resposta: db.produtos.find({ preco: 100 }, { nome: 1 })

Pergunta: Uma API de vendas precisa exibir os resultados ordenados por valor decrescente e paginar os registros, exibindo duas vendas por página. Qual combinação de métodos a seguir realiza corretamente a ordenação e simula a segunda página de resultados?

Resposta: [[ RESPOSTA AMBIGUA ]]

Pergunta: Uma coleção de pedidos armazena itens em arrays de subdocumentos. Deseja-se localizar pedidos em que o produto "Mouse" foi comprado com quantidade maior que 1. Qual comando retorna corretamente os documentos desejados?

Resposta: db.pedidos.find({ itens: { $elemMatch: { produto: "Mouse", quantidade: { $gt: 1 } } } })

Pergunta: Em um sistema de artigos científicos, deseja-se buscar textos que contenham as palavras "dados" ou "MongoDB" e exibir os mais relevantes. Qual consulta atende corretamente ao objetivo?

Resposta: db.artigos.find({ conteudo: { $regex: "MongoDB dados" } })
