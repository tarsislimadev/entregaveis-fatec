# Super Mario World (versão GTA) - Three.js Game

Um jogo 3D desenvolvido em Three.js baseado no conceito descrito no README original, combinando elementos de Super Mario World com temática urbana estilo GTA.

## 🎮 Sobre o Jogo

**Cenário**: Uma região movimentada como o subúrbio de São Paulo, com transição do pôr do sol para a noite.

**Personagem**: Um motoboy que luta contra gangs rivais e a polícia.

**Objetivo**: Derrotar todos os inimigos (polícia e gangsters) para vencer o jogo.

## 🚀 Como Executar

### Opção 1: Usando npm (Recomendado)

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm start
```

O jogo será aberto automaticamente no navegador em `http://localhost:8080`

### Opção 2: Usando Docker

```bash
# Construir a imagem Docker
docker build -t super-mario-gta .

# Executar o container
docker run -p 8080:8080 super-mario-gta
```

### Opção 3: Servidor HTTP Simples

Se você tiver Python instalado:

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Depois acesse `http://localhost:8080`

## 🎯 Controles

- **WASD** ou **Setas**: Mover o personagem
- **Espaço**: Pular
- **Clique do Mouse**: Atirar
- **R**: Recarregar arma
- **P**: Pausar/Despausar
- **H**: Mostrar ajuda

## 🎮 Mecânicas do Jogo

### Personagem (Motoboy)
- **Vida**: 100 HP
- **Movimento**: Pode se mover em todas as direções e pular
- **Armas**: Pode encontrar e trocar armas diferentes
- **Medicamentos**: Pode recuperar vida encontrando medicamentos

### Inimigos
- **Polícia** (Azul): Tenta prender o jogador
- **Gangsters** (Vermelho): Tentam matar o jogador
- **IA**: Patrulham, perseguem e atacam o jogador

### Sistema de Armas
- **Pistola**: Arma inicial, 30 munições
- **Shotgun**: Mais dano, 8 munições
- **Rifle**: Arma balanceada, 60 munições
- **Machinegun**: Alta cadência, 100 munições

### Estados do Jogo
- **Jogando**: Estado normal do jogo
- **Hospital**: Quando o jogador morre
- **Prisão**: Quando o jogador é preso pela polícia
- **Vitória**: Quando todos os inimigos são derrotados

### Ambiente
- **Ciclo Dia/Noite**: Transição gradual do pôr do sol para a noite
- **Prédios**: Edifícios estilo São Paulo com janelas iluminadas
- **Veículos**: Carros estacionados na rua
- **Civis**: Pessoas andando pela rua

## 🏗️ Estrutura do Projeto

```
aula-4/
├── index.html              # Página principal do jogo
├── package.json            # Dependências do projeto
├── Dockerfile             # Configuração Docker
├── README.md              # Documentação original
├── README-GAME.md         # Este arquivo
└── js/
    ├── game.js            # Motor principal do jogo
    ├── player.js          # Lógica do jogador
    ├── enemies.js         # IA dos inimigos
    ├── weapons.js         # Sistema de armas
    ├── environment.js     # Ambiente 3D
    └── main.js            # Inicialização e controles
```

## 🛠️ Tecnologias Utilizadas

- **Three.js**: Biblioteca 3D para JavaScript
- **HTML5**: Estrutura da página
- **CSS3**: Estilização da interface
- **JavaScript ES6+**: Lógica do jogo
- **Node.js**: Servidor de desenvolvimento
- **Docker**: Containerização

## 🎨 Características Técnicas

- **Renderização 3D**: Cena completa com iluminação e sombras
- **Física Simples**: Gravidade e colisões básicas
- **IA dos Inimigos**: Estados de patrulha, perseguição e ataque
- **Sistema de Partículas**: Efeitos visuais para explosões
- **Interface Responsiva**: HUD com informações do jogo
- **Ciclo Temporal**: Transição dinâmica do dia para a noite

## 🎯 Objetivos de Aprendizagem

Este projeto demonstra conceitos de:
- Desenvolvimento de jogos 3D
- Programação orientada a objetos
- Gerenciamento de estado
- Colisões e física
- Inteligência artificial básica
- Interface de usuário para jogos

## 🐛 Solução de Problemas

### O jogo não carrega
- Verifique se o servidor está rodando na porta 8080
- Abra o console do navegador (F12) para ver erros
- Certifique-se de que todas as dependências foram instaladas

### Performance lenta
- Feche outras abas do navegador
- Reduza a qualidade gráfica se necessário
- Use um navegador moderno (Chrome, Firefox, Safari)

### Controles não funcionam
- Certifique-se de que a janela do jogo está em foco
- Verifique se não há outros elementos capturando os eventos de teclado

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Gestão de Projetos Ágeis da FATEC.

## 🤝 Contribuições

Este é um projeto educacional, mas sugestões e melhorias são bem-vindas!

---

**Divirta-se jogando! 🎮**
