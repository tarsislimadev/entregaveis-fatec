export class CupHeadRioGame {
    constructor() {
        this.app = null;
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.keys = {};
        this.gameState = {
            health: 100,
            score: 0,
            isGameOver: false
        };

        // Peer connection for remote control
        this.peer = null;
        this.connection = null;
        this.isRemoteControlled = false;
        this.remoteInput = {
            left: false,
            right: false,
            up: false,
            down: false,
            shoot: false,
            dash: false
        };

        this.init();
    }

    async init() {
        await this.setupPixi();
        this.setupPeerConnection();
        this.createPlayer();
        this.createBackground();
        this.setupControls();
        this.startGameLoop();
        this.spawnEnemies();
    }

    async setupPixi() {
        this.app = new PIXI.Application({
            width: 1024,
            height: 576,
            backgroundColor: 0x87CEEB,
            antialias: true
        });

        document.getElementById('gameContainer').appendChild(this.app.view);

        // Load textures (we'll create simple colored rectangles for now)
        await PIXI.Assets.load();
    }

    setupPeerConnection() {
        this.peer = new Peer();

        this.peer.on('open', (id) => {
            console.log('Meu peer ID:', id);
            document.getElementById('peerId').textContent = id;
            document.getElementById('connectionStatus').textContent = 'Aguardando conexão';
        });

        this.peer.on('connection', (conn) => {
            console.log('Conexão recebida de:', conn.peer);
            this.setupConnection(conn);
        });

        this.peer.on('error', (err) => {
            console.error('Erro no peer:', err);
        });
    }

    setupConnection(conn) {
        this.connection = conn;

        conn.on('open', () => {
            console.log('Conexão estabelecida');
            document.getElementById('connectionStatus').textContent = 'Conectado';
            this.isRemoteControlled = true;
        });

        conn.on('data', (data) => {
            if (data.type === 'input') {
                this.remoteInput = data.input;
            }
        });

        conn.on('close', () => {
            console.log('Conexão fechada');
            document.getElementById('connectionStatus').textContent = 'Desconectado';
            this.isRemoteControlled = false;
            this.remoteInput = {
                left: false,
                right: false,
                up: false,
                down: false,
                shoot: false,
                dash: false
            };
        });
    }

    createPlayer() {
        // Create a simple CupHead-style character (red cup with white body)
        const playerContainer = new PIXI.Container();

        // Cup (head)
        const cup = new PIXI.Graphics();
        cup.beginFill(0xFF0000);
        cup.drawRect(-15, -30, 30, 20);
        cup.endFill();

        // Handle
        const handle = new PIXI.Graphics();
        handle.beginFill(0xFF0000);
        handle.drawRect(15, -25, 8, 15);
        handle.endFill();

        // Body
        const body = new PIXI.Graphics();
        body.beginFill(0xFFFFFF);
        body.drawRect(-12, -10, 24, 25);
        body.endFill();

        // Arms
        const leftArm = new PIXI.Graphics();
        leftArm.beginFill(0xFFFFFF);
        leftArm.drawRect(-20, -5, 8, 15);
        leftArm.endFill();

        const rightArm = new PIXI.Graphics();
        rightArm.beginFill(0xFFFFFF);
        rightArm.drawRect(12, -5, 8, 15);
        rightArm.endFill();

        // Legs
        const leftLeg = new PIXI.Graphics();
        leftLeg.beginFill(0x000000);
        leftLeg.drawRect(-10, 15, 8, 12);
        leftLeg.endFill();

        const rightLeg = new PIXI.Graphics();
        rightLeg.beginFill(0x000000);
        rightLeg.drawRect(2, 15, 8, 12);
        rightLeg.endFill();

        playerContainer.addChild(cup, handle, body, leftArm, rightArm, leftLeg, rightLeg);

        playerContainer.x = 100;
        playerContainer.y = 400;
        playerContainer.vx = 0;
        playerContainer.vy = 0;
        playerContainer.speed = 5;
        playerContainer.jumpPower = 15;
        playerContainer.isOnGround = false;
        playerContainer.dashCooldown = 0;

        this.player = playerContainer;
        this.app.stage.addChild(this.player);
    }

    createBackground() {
        // Rio de Janeiro themed background
        const background = new PIXI.Graphics();

        // Sky gradient
        background.beginFill(0x87CEEB);
        background.drawRect(0, 0, 1024, 200);
        background.endFill();

        // Mountains (representing Rio's mountains)
        background.beginFill(0x228B22);
        background.drawPolygon([
            200, 200, 300, 100, 400, 200
        ]);
        background.drawPolygon([
            350, 200, 450, 80, 550, 200
        ]);
        background.drawPolygon([
            500, 200, 600, 120, 700, 200
        ]);
        background.endFill();

        // Beach/ground
        background.beginFill(0xF4A460);
        background.drawRect(0, 500, 1024, 76);
        background.endFill();

        // Ocean
        background.beginFill(0x4682B4);
        background.drawRect(0, 450, 1024, 50);
        background.endFill();

        // Christ the Redeemer silhouette
        const christ = new PIXI.Graphics();
        christ.beginFill(0x696969);
        // Body
        christ.drawRect(480, 120, 8, 40);
        // Arms
        christ.drawRect(460, 130, 48, 6);
        // Head
        christ.drawCircle(484, 115, 6);
        christ.endFill();

        background.addChild(christ);

        // Ground platforms
        const platforms = new PIXI.Graphics();
        platforms.beginFill(0x8B4513);
        platforms.drawRect(0, 500, 1024, 20);
        platforms.drawRect(200, 450, 150, 20);
        platforms.drawRect(400, 400, 150, 20);
        platforms.drawRect(600, 350, 150, 20);
        platforms.drawRect(800, 450, 150, 20);
        platforms.endFill();

        this.app.stage.addChildAt(background, 0);
        this.app.stage.addChildAt(platforms, 1);

        this.platforms = [
            {x: 0, y: 500, width: 1024, height: 20},
            {x: 200, y: 450, width: 150, height: 20},
            {x: 400, y: 400, width: 150, height: 20},
            {x: 600, y: 350, width: 150, height: 20},
            {x: 800, y: 450, width: 150, height: 20}
        ];
    }

    setupControls() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        // Note: Global functions are now handled in module exports
    }

    getInput() {
        if (this.isRemoteControlled && this.connection) {
            return this.remoteInput;
        }

        return {
            left: this.keys['KeyA'] || this.keys['ArrowLeft'],
            right: this.keys['KeyD'] || this.keys['ArrowRight'],
            up: this.keys['KeyW'] || this.keys['ArrowUp'],
            down: this.keys['KeyS'] || this.keys['ArrowDown'],
            shoot: this.keys['Space'],
            dash: this.keys['ShiftLeft'] || this.keys['ShiftRight']
        };
    }

    updatePlayer() {
        const input = this.getInput();

        // Horizontal movement
        if (input.left) {
            this.player.vx = -this.player.speed;
            this.player.scale.x = -1;
        } else if (input.right) {
            this.player.vx = this.player.speed;
            this.player.scale.x = 1;
        } else {
            this.player.vx *= 0.8; // Friction
        }

        // Jumping
        if (input.up && this.player.isOnGround) {
            this.player.vy = -this.player.jumpPower;
            this.player.isOnGround = false;
        }

        // Dash
        if (input.dash && this.player.dashCooldown <= 0) {
            this.player.vx = this.player.scale.x > 0 ? 15 : -15;
            this.player.dashCooldown = 60; // 1 second at 60fps
        }

        if (this.player.dashCooldown > 0) {
            this.player.dashCooldown--;
        }

        // Shooting
        if (input.shoot) {
            this.shoot();
        }

        // Apply gravity
        this.player.vy += 0.8;

        // Update position
        this.player.x += this.player.vx;
        this.player.y += this.player.vy;

        // Platform collision
        this.checkPlatformCollision();

        // Screen boundaries
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x > 1024) this.player.x = 1024;
        if (this.player.y > 600) {
            this.takeDamage(10);
            this.player.x = 100;
            this.player.y = 400;
            this.player.vx = 0;
            this.player.vy = 0;
        }
    }

    checkPlatformCollision() {
        this.player.isOnGround = false;

        for (let platform of this.platforms) {
            if (this.player.x > platform.x - 15 &&
                this.player.x < platform.x + platform.width + 15 &&
                this.player.y + 27 > platform.y &&
                this.player.y + 27 < platform.y + platform.height + 10 &&
                this.player.vy > 0) {

                this.player.y = platform.y - 27;
                this.player.vy = 0;
                this.player.isOnGround = true;
                break;
            }
        }
    }

    shoot() {
        const bullet = new PIXI.Graphics();
        bullet.beginFill(0xFFFF00);
        bullet.drawCircle(0, 0, 3);
        bullet.endFill();

        bullet.x = this.player.x + (this.player.scale.x > 0 ? 20 : -20);
        bullet.y = this.player.y - 10;
        bullet.vx = this.player.scale.x > 0 ? 10 : -10;
        bullet.vy = 0;

        this.bullets.push(bullet);
        this.app.stage.addChild(bullet);
    }

    updateBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.x += bullet.vx;
            bullet.y += bullet.vy;

            if (bullet.x < -10 || bullet.x > 1034 || bullet.y < -10 || bullet.y > 586) {
                this.app.stage.removeChild(bullet);
                this.bullets.splice(i, 1);
            }
        }
    }

    spawnEnemies() {
        setInterval(() => {
            if (this.enemies.length < 5 && !this.gameState.isGameOver) {
                this.createEnemy();
            }
        }, 3000);
    }

    createEnemy() {
        const enemy = new PIXI.Graphics();
        enemy.beginFill(0x8B0000);
        enemy.drawRect(-10, -10, 20, 20);
        enemy.endFill();

        // Add simple face
        enemy.beginFill(0xFF0000);
        enemy.drawCircle(-5, -5, 2);
        enemy.drawCircle(5, -5, 2);
        enemy.endFill();

        enemy.x = Math.random() < 0.5 ? -20 : 1044;
        enemy.y = 400;
        enemy.vx = enemy.x < 0 ? 2 : -2;
        enemy.health = 30;

        this.enemies.push(enemy);
        this.app.stage.addChild(enemy);
    }

    updateEnemies() {
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.x += enemy.vx;

            // Check collision with player
            const dx = enemy.x - this.player.x;
            const dy = enemy.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 30) {
                this.takeDamage(5);
                this.app.stage.removeChild(enemy);
                this.enemies.splice(i, 1);
                continue;
            }

            // Check collision with bullets
            for (let j = this.bullets.length - 1; j >= 0; j--) {
                const bullet = this.bullets[j];
                const bdx = bullet.x - enemy.x;
                const bdy = bullet.y - enemy.y;
                const bdistance = Math.sqrt(bdx * bdx + bdy * bdy);

                if (bdistance < 15) {
                    enemy.health -= 10;
                    this.app.stage.removeChild(bullet);
                    this.bullets.splice(j, 1);

                    if (enemy.health <= 0) {
                        this.gameState.score += 100;
                        this.app.stage.removeChild(enemy);
                        this.enemies.splice(i, 1);
                        break;
                    }
                }
            }

            if (enemy.x < -50 || enemy.x > 1074) {
                this.app.stage.removeChild(enemy);
                this.enemies.splice(i, 1);
            }
        }
    }

    takeDamage(amount) {
        this.gameState.health -= amount;
        if (this.gameState.health <= 0) {
            this.gameState.health = 0;
            this.gameOver();
        }
    }

    gameOver() {
        this.gameState.isGameOver = true;

        const gameOverText = new PIXI.Text('GAME OVER\nPressione F5 para reiniciar', {
            fontFamily: 'Arial',
            fontSize: 48,
            fill: 0xFF0000,
            align: 'center'
        });

        gameOverText.anchor.set(0.5);
        gameOverText.x = 512;
        gameOverText.y = 288;

        this.app.stage.addChild(gameOverText);
    }

    updateUI() {
        document.getElementById('health').textContent = this.gameState.health;
        document.getElementById('score').textContent = this.gameState.score;
    }

    startGameLoop() {
        this.app.ticker.add(() => {
            if (!this.gameState.isGameOver) {
                this.updatePlayer();
                this.updateBullets();
                this.updateEnemies();
                this.updateUI();
            }
        });
    }
}

// Export functions for global access
export const connectToPeer = (game) => {
    const remotePeerId = document.getElementById('remotePeerId').value;
    if (remotePeerId && game.peer) {
        game.connection = game.peer.connect(remotePeerId);
        game.setupConnection(game.connection);
    }
};

export const disconnect = (game) => {
    if (game.connection) {
        game.connection.close();
        game.connection = null;
    }
};

// Initialize the game when the page loads
export const initGame = () => {
    const game = new CupHeadRioGame();

    // Make functions globally available
    window.connectToPeer = () => connectToPeer(game);
    window.disconnect = () => disconnect(game);

    return game;
};