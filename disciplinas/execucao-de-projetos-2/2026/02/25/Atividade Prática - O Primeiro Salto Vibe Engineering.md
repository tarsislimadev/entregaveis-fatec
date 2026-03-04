# Atividade Prática: O Primeiro Salto Vibe Engineering

Criar um micro-aplicativo funcional de triagem de saúde usando orquestração de agentes e Antigravity.

1. O Problema Fictício: "Check-up Rápido: Triagem Inteligente"

A Clínica "Saúde Rio Claro" está com as salas de espera superlotadas. Muitos pacientes aguardam horas apenas para descobrir que deveriam ter ido ao clínico geral ou que o caso não é urgente.

As Squads devem desenvolver uma aplicação simples de . O usuário insere seus sintomas e idade, e a IA, baseada em protocolos pré-definidos (Grounding), sugere a urgência do atendimento (Verde, Amarelo ou Vermelho).

2. Elaborando o PRD (Product Requirements Document)

📝 Estrutura do PRD (Passo a Passo)

* Defina em uma frase o que o app faz. (Ex: "Reduzir o tempo de espera através de uma pré-análise de sintomas").
* Quem é o usuário? Um idoso com dores ou um jovem com sintomas de gripe? O tom de voz deve ser acolhedor.
* Campo para nome e idade.

[ ] Campo de texto aberto para descrever o que está sentindo.
[ ] Botão "Analisar Urgência".
[ ] Painel de resultado com cor e recomendação.

* Se o usuário mencionar "dor no peito" ou "falta de ar", o resultado deve ser sempre .
* O app deve exibir um aviso: "Este é um protótipo de IA e não substitui uma consulta médica".

3. O "Master Prompt": Orquestrando o Agente

"Atue como um Engenheiro de Software Sênior especializado em e .
Estou desenvolvendo um MVP de triagem de saúde conforme o PRD que elaborei (veja os detalhes abaixo).
Gere a estrutura de código completa para um aplicativo web simples utilizando a plataforma Antigravity.

Use Pandas se houver necessidade de processar algum protocolo de triagem em CSV.
A interface deve ser limpa, profissional e focada em acessibilidade (saúde).
Implemente a lógica: se o input do usuário contiver palavras-chave críticas (dor no peito, desmaio, hemorragia), retorne 'URGENTE'.

Não apenas escreva o código; explique a arquitetura que você escolheu.
Se houver alguma ambiguidade no meu PRD, pare e me pergunte antes de gerar o código.

[COLE AQUI O TEXTO DO PRD QUE VOCÊ PREENCHEU NO PASSO 2]

4. Checklist de Entrega (Final da Aula)

Ao final, a Squad deve apresentar:

(A inteligência por trás do código).
funcionando.
"O que foi mais rápido: escrever o código ou ajustar o prompt para o agente entender a regra de negócio?".
