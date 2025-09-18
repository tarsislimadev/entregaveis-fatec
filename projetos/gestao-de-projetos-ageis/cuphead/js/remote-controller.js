export class RemoteController {
    constructor() {
        this.peer = null;
        this.connection = null;
        this.isConnected = false;

        this.inputState = {
            left: false,
            right: false,
            up: false,
            down: false,
            shoot: false,
            dash: false
        };

        this.init();
    }

    init() {
        this.setupPeerConnection();
        this.setupControls();
        this.startInputLoop();
    }

    setupPeerConnection() {
        this.peer = new Peer();

        this.peer.on('open', (id) => {
            console.log('Meu peer ID:', id);
            document.getElementById('myPeerId').textContent = id;
            document.getElementById('connectionStatus').textContent = 'Pronto para conectar';
        });

        this.peer.on('error', (err) => {
            console.error('Erro no peer:', err);
            this.updateConnectionStatus('Erro de conexão');
        });
    }

    connectToGame() {
        const gamePeerId = document.getElementById('gamePeerId').value.trim();

        if (!gamePeerId) {
            alert('Por favor, insira o ID do jogo');
            return;
        }

        if (this.connection) {
            this.connection.close();
        }

        this.connection = this.peer.connect(gamePeerId);

        this.connection.on('open', () => {
            console.log('Conectado ao jogo');
            this.isConnected = true;
            this.updateConnectionStatus('Conectado');
            document.getElementById('gameControls').style.display = 'block';
            document.getElementById('connectBtn').disabled = true;
            document.getElementById('disconnectBtn').disabled = false;
        });

        this.connection.on('close', () => {
            console.log('Conexão fechada');
            this.isConnected = false;
            this.updateConnectionStatus('Desconectado');
            document.getElementById('gameControls').style.display = 'none';
            document.getElementById('connectBtn').disabled = false;
            document.getElementById('disconnectBtn').disabled = true;
        });

        this.connection.on('error', (err) => {
            console.error('Erro na conexão:', err);
            this.updateConnectionStatus('Erro de conexão');
            alert('Erro ao conectar. Verifique se o ID do jogo está correto.');
        });

        this.updateConnectionStatus('Conectando...');
    }

    disconnect() {
        if (this.connection) {
            this.connection.close();
            this.connection = null;
        }
    }

    updateConnectionStatus(status) {
        document.getElementById('connectionStatus').textContent = status;
    }

    setupControls() {
        // Touch/Click controls for buttons
        const controlButtons = document.querySelectorAll('.control-btn, .action-btn');

        controlButtons.forEach(button => {
            const action = button.dataset.action;

            // Mouse events
            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.setInput(action, true);
                button.classList.add('pressed');
            });

            button.addEventListener('mouseup', (e) => {
                e.preventDefault();
                this.setInput(action, false);
                button.classList.remove('pressed');
            });

            button.addEventListener('mouseleave', (e) => {
                this.setInput(action, false);
                button.classList.remove('pressed');
            });

            // Touch events for mobile
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.setInput(action, true);
                button.classList.add('pressed');
            });

            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.setInput(action, false);
                button.classList.remove('pressed');
            });

            button.addEventListener('touchcancel', (e) => {
                e.preventDefault();
                this.setInput(action, false);
                button.classList.remove('pressed');
            });
        });

        // Keyboard controls as backup
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    e.preventDefault();
                    this.setInput('up', true);
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    e.preventDefault();
                    this.setInput('down', true);
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    e.preventDefault();
                    this.setInput('left', true);
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    e.preventDefault();
                    this.setInput('right', true);
                    break;
                case 'Space':
                    e.preventDefault();
                    this.setInput('shoot', true);
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    e.preventDefault();
                    this.setInput('dash', true);
                    break;
            }
        });

        document.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    e.preventDefault();
                    this.setInput('up', false);
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    e.preventDefault();
                    this.setInput('down', false);
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    e.preventDefault();
                    this.setInput('left', false);
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    e.preventDefault();
                    this.setInput('right', false);
                    break;
                case 'Space':
                    e.preventDefault();
                    this.setInput('shoot', false);
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    e.preventDefault();
                    this.setInput('dash', false);
                    break;
            }
        });

        // Note: Global functions are now handled in module exports
    }

    setInput(action, value) {
        if (this.inputState[action] !== value) {
            this.inputState[action] = value;
            console.log(`Input ${action}: ${value}`);
        }
    }

    sendInput() {
        if (this.isConnected && this.connection) {
            try {
                this.connection.send({
                    type: 'input',
                    input: { ...this.inputState }
                });
            } catch (err) {
                console.error('Erro ao enviar input:', err);
            }
        }
    }

    startInputLoop() {
        // Send input state 60 times per second
        setInterval(() => {
            this.sendInput();
        }, 1000 / 60);
    }
}

// Export functions for global access
export const connectToGame = (controller) => controller.connectToGame();
export const disconnect = (controller) => controller.disconnect();

// Initialize the remote controller when the page loads
export const initRemoteController = () => {
    const controller = new RemoteController();

    // Make functions globally available
    window.connectToGame = () => connectToGame(controller);
    window.disconnect = () => disconnect(controller);

    return controller;
};