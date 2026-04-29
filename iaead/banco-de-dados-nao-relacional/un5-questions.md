# Banco de Dados Não Relacional

## Unidade 5

### Perguntas Avaliativas

Pergunta: Garantir que os documentos inseridos estejam em conformidade com regras predefinidas é essencial para a integridade dos dados. O MongoDB permite aplicar validação com base em JSON Schema. Qual das opções a seguir representa uma vantagem do uso de validação por JSON Schema em coleções MongoDB?

Resposta: Garante que os documentos atendam a critérios como obrigatoriedade de campos, tipos e padrões.

Pergunta: No MongoDB, o campo _id é obrigatório em todos os documentos e atua como identificador único. Esse campo pode ser atribuído manualmente ou gerado automaticamente. Qual das afirmações a seguir descreve corretamente o comportamento do campo _id no MongoDB?

Resposta: Se não for especificado, o MongoDB gera um identificador do tipo ObjectId, que inclui um timestamp da criação.

Pergunta: A modelagem com subdocumentos é uma prática comum no MongoDB, permitindo armazenar estruturas hierárquicas de forma organizada e sem a necessidade de joins. Em qual das situações a seguir o uso de subdocumentos seria mais indicado?

Resposta: Registrar o endereço completo de um cliente (rua, cidade, estado) em um único campo agrupado.

Pergunta: O parâmetro upsert permite ao MongoDB inserir um documento quando ele não é encontrado em uma operação de atualização. Qual das alternativas a seguir descreve corretamente o comportamento da operação updateOne() com upsert: true?

Resposta: Atualiza o documento se ele existir; caso contrário, insere um novo com os dados fornecidos.
