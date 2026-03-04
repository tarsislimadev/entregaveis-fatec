

Atue como um Engenheiro de Software Sênior especializado em desenvolvimento web e IA.
Estou desenvolvendo um MVP de triagem de saúde conforme o PRD que elaborei (veja os detalhes abaixo).
Gere a estrutura de código completa para um aplicativo web simples.

Use Pandas se houver necessidade de processar algum protocolo de triagem em CSV.
A interface deve ser limpa, profissional e focada em acessibilidade (saúde).
Implemente a lógica: se o input do usuário contiver palavras-chave críticas (dor no peito, desmaio, hemorragia, falta de ar), retorne 'URGENTE'.

Não apenas escreva o código; explique a arquitetura que você escolheu.

Se houver alguma ambiguidade no meu PRD, pare e me pergunte antes de gerar o código.

**PRD: Check-up Rápido: Triagem Inteligente**

*Objetivo:* Reduzir o tempo de espera através de uma pré-análise de sintomas baseada em IA, sugerindo a urgência do atendimento (Verde, Amarelo ou Vermelho).
*Usuário:* Pacientes de todas as idades da Clínica "Saúde Rio Claro". O tom de voz deve ser acolhedor, profissional e tranquilizador.

**Requisitos da Interface:**
- Campo para Inserção de Nome
- Campo para Inserção de Idade
- Campo de texto aberto para descrever o que está sentindo (sintomas).
- Botão "Analisar Urgência".
- Painel de resultado com cor (Verde, Amarelo, Vermelho) e recomendação.
- O app deve exibir de forma bem visível um aviso: "Este é um protótipo de IA e não substitui uma consulta médica".

**Regras de Negócio e Lógica:**
- Se o usuário mencionar "dor no peito", "falta de ar", "desmaio" ou "hemorragia", o resultado deve ser sempre Vermelho (Urgente).

---

Escreva o aplicativo usando Python Streamlit.
