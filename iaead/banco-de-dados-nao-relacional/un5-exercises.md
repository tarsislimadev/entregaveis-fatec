# Banco de Dados Não Relacional

## Unidade 5

### Exercícios de Fixação

Pergunta: Em Bancos de Dados NoSQL, como o MongoDB, a flexibilidade na estrutura dos documentos oferece vantagens significativas em termos de modelagem e desempenho. No entanto, essa flexibilidade também exige cuidados adicionais para garantir a integridade e a qualidade dos dados inseridos. No contexto do MongoDB, qual das alternativas a seguir descreve corretamente uma estratégia eficaz para garantir a validação dos dados inseridos em uma coleção?

Resposta: Definir um validador baseado em JSON Schema durante a criação da coleção, especificando tipos, padrões e campos obrigatórios.

Pergunta: Em ambientes corporativos que utilizam o MongoDB, a inserção em lote de documentos é uma prática comum, especialmente durante importações de dados, migrações de sistemas ou sincronizações periódicas. Saber como configurar essa operação é essencial para evitar interrupções inesperadas. Durante a inserção de múltiplos documentos com o método insertMany(), um erro de chave duplicada interrompe o processo. Qual configuração deve ser utilizada para permitir que o MongoDB continue a inserção dos documentos válidos? _____ $CATEGORY: top/BD-NÃO RELACIONAL

Resposta: Adicionar o parâmetro { ordered: false } na chamada do insertMany(), permitindo que a inserção continue mesmo após encontrar erros.
