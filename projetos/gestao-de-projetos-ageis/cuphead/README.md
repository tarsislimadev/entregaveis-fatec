# CupHead Rio de Janeiro

Um jogo 2D inspirado no CupHead com temática do Rio de Janeiro, desenvolvido com PIXI.js e suporte para controle remoto via PeerJS.

## 🎮 Características do Jogo

- **Personagem**: CupHead estilizado com visual clássico
- **Cenário**: Rio de Janeiro com Cristo Redentor, montanhas, praia e oceano
- **Controles**: Movimento, pulo, dash e tiro
- **Inimigos**: Inimigos que aparecem periodicamente
- **Sistema de Vida**: 100 pontos de vida
- **Pontuação**: Sistema de pontos por eliminação de inimigos

## 🎯 Controles

### Controles Locais
- **WASD** ou **Setas**: Movimento
- **Espaço**: Atirar
- **Shift**: Dash

### Controles Remotos
- Use o arquivo `remote-controller.html` em outro dispositivo
- Conecte via PeerJS usando o ID do jogo
- Controle o jogo remotamente via botões touch ou teclado

## 🚀 Como Executar

1. Abra o arquivo `index.html` em um navegador web moderno
2. Para usar controle remoto:
   - Abra `remote-controller.html` em outro dispositivo/navegador
   - Copie o Peer ID do jogo principal
   - Cole no controle remoto e conecte

## 🔧 Tecnologias Utilizadas

- **PIXI.js 7.3.2**: Engine de renderização 2D
- **PeerJS 1.5.0**: Conexões peer-to-peer para controle remoto
- **HTML5 Canvas**: Renderização gráfica
- **JavaScript ES6+**: Lógica do jogo

## 📱 Suporte a Dispositivos

- **Desktop**: Controles via teclado
- **Mobile**: Controle remoto com botões touch
- **Multiplataforma**: Funciona em qualquer navegador moderno

## 🎨 Elementos Visuais

### Cenário Rio de Janeiro
- Céu degradê azul
- Montanhas verdes (representando morros cariocas)
- Cristo Redentor como marco icônico
- Praia e oceano
- Plataformas de madeira para navegação

### Personagem CupHead
- Xícara vermelha com alça
- Corpo branco com braços e pernas
- Animações de movimento e escala

### Inimigos
- Cubos vermelhos com olhos
- Sistema de vida próprio
- Spawn automático a cada 3 segundos

## 🌐 Conexão Peer-to-Peer

O jogo utiliza PeerJS para estabelecer conexões diretas entre dispositivos:

1. **Jogo Principal**: Gera um ID único
2. **Controle Remoto**: Conecta usando esse ID
3. **Comunicação**: Envia comandos de controle em tempo real
4. **Latência Baixa**: Conexão direta sem servidor intermediário

## 📋 Funcionalidades

- [x] Personagem jogável (CupHead)
- [x] Sistema de movimento e física
- [x] Sistema de tiro
- [x] Inimigos com IA básica
- [x] Colisão com plataformas
- [x] Sistema de vida e pontuação
- [x] Controle remoto via PeerJS
- [x] Interface touch para mobile
- [x] Cenário temático do Rio de Janeiro
- [x] Game Over e reinicialização

## 🔄 Como Funciona o Controle Remoto

1. O jogo principal executa e gera um Peer ID
2. O controle remoto se conecta usando esse ID
3. Os inputs do controle são enviados via WebRTC
4. O jogo processa os inputs remotos como se fossem locais
5. Suporte tanto para teclado quanto touch

## 🎯 Próximas Melhorias Possíveis

- Mais tipos de inimigos
- Power-ups e armas especiais
- Níveis múltiplos
- Sistema de vidas
- Efeitos sonoros
- Animações mais elaboradas
- Multiplayer cooperativo