# Banco de Dados Não Relacional

## Unidade 2

## Exercicios de Fixação

Pergunta: O MongoDB permite armazenar arrays de subdocumentos, como uma lista de itens em um pedido. Para realizar consultas que combinem muitas condições sobre o mesmo elemento do array, é necessário utilizar o operador $elemMatch, pois a notação pontilhada simples pode gerar falsos positivos.

Considere a seguinte estrutura de documentos em uma coleção pedidos:

```json
{
  cliente: "Carlos",
  itens: [
    { produto: "Mouse", quantidade: 2 },
    { produto: "Teclado", quantidade: 1 }
  ]
}
```

Qual das alternativas realiza corretamente uma consulta que retorna pedidos em que o produto seja "Mouse" com quantidade maior que 1, dentro do mesmo item?

Resposta: db.pedidos.find({ itens: { $elemMatch: { produto: "Mouse", quantidade: { $gt: 1 } } } })

Pergunta: Em aplicações que consomem dados de um Banco MongoDB, é comum a necessidade de retornar apenas campos específicos de cada documento, a fim de reduzir o volume de dados transferidos e melhorar o desempenho da aplicação. O método find() permite esse controle por meio do segundo parâmetro da consulta, conhecido como projeção. Considere o seguinte cenário: uma coleção clientes contém os campos nome, email, telefone e _id. Para retornar apenas o nome e o email dos clientes, excluindo explicitamente o campo _id, qual das alternativas representa corretamente a sintaxe da consulta no MongoDB?

Resposta: db.clientes.find({}, { nome: 1, email: 1, _id: 0 })
