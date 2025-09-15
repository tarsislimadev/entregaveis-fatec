import * as THREE from 'three';
import { Player } from './player.js';
import { PoliceEnemy } from './enemies.js';
import { Environment } from './environment.js';

export class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(
            -window.innerWidth / 2, window.innerWidth / 2,
            window.innerHeight / 2, -window.innerHeight / 2,
            0.1, 1000
        );
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.clock = new THREE.Clock();
        
        this.gameState = 'playing'; // 'playing', 'gameOver', 'paused'
        this.score = 0;
        this.health = 100;
        this.maxHealth = 100;
        
        this.player = null;
        this.enemies = [];
        this.bulletsArray = [];
        this.enemyBullets = [];
        this.particles = [];
        
        this.keys = {};
        this.mouse = { x: 0, y: 0 };
        
        this.setupRenderer();
        this.setupLighting();
        this.setupEventListeners();
        this.setupEnvironment();
    }
    
    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x87CEEB); // Sky blue for morning
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('gameContainer').appendChild(this.renderer.domElement);
    }
    
    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light simulating morning sun
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -100;
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        this.scene.add(directionalLight);
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
            if (event.code === 'Space') {
                event.preventDefault();
                if (this.player) this.player.jump();
            }
        });
        
        document.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });
        
        // Mouse events
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        document.addEventListener('click', (event) => {
            if (this.gameState === 'playing' && this.player && this.player.weaponSystem) {
                this.player.shoot();
            }
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.left = -window.innerWidth / 2;
            this.camera.right = window.innerWidth / 2;
            this.camera.top = window.innerHeight / 2;
            this.camera.bottom = -window.innerHeight / 2;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    setupEnvironment() {
        // Create environment (Rio de Janeiro background)
        const environment = new Environment(this.scene);
        environment.createRioBackground();
    }
    
    start() {
        // Create player
        this.player = new Player(this.scene, this);
        
        // Start game loop
        this.gameLoop();
    }
    
    gameLoop() {
        const deltaTime = this.clock.getDelta();
        
        if (this.gameState === 'playing') {
            this.update(deltaTime);
        }
        
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update(deltaTime) {
        // Update player
        if (this.player) {
            this.player.update(deltaTime, this.keys);
        }
        
        // Update enemies
        this.enemies.forEach((enemy, index) => {
            enemy.update(deltaTime, this.player);
            
            // Remove dead enemies
            if (enemy.health <= 0) {
                this.scene.remove(enemy.mesh);
                this.enemies.splice(index, 1);
                this.score += 100;
                this.updateUI();
            }
        });
        
        // Update bullets
        this.bulletsArray.forEach((bullet, index) => {
            bullet.update(deltaTime);
            
            // Remove bullets that are off screen
            if (bullet.mesh.position.x > window.innerWidth / 2 + 100) {
                this.scene.remove(bullet.mesh);
                this.bulletsArray.splice(index, 1);
            }
        });
        
        // Update enemy bullets
        this.enemyBullets.forEach((bullet, index) => {
            bullet.update(deltaTime);
            
            // Remove bullets that are off screen
            if (bullet.mesh.position.x < -window.innerWidth / 2 - 100) {
                this.scene.remove(bullet.mesh);
                this.enemyBullets.splice(index, 1);
            }
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Spawn enemies
        this.spawnEnemies(deltaTime);
        
        // Update camera to follow player
        if (this.player) {
            this.camera.position.x = this.player.mesh.position.x;
            this.camera.position.y = this.player.mesh.position.y + 50;
        }
    }
    
    checkCollisions() {
        // Player bullets vs enemies
        this.bulletsArray.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (this.checkCollision(bullet.mesh, enemy.mesh)) {
                    enemy.takeDamage(25);
                    this.scene.remove(bullet.mesh);
                    this.bulletsArray.splice(bulletIndex, 1);
                }
            });
        });
        
        // Enemy bullets vs player
        this.enemyBullets.forEach((bullet, bulletIndex) => {
            if (this.player && this.checkCollision(bullet.mesh, this.player.mesh)) {
                this.player.takeDamage(10);
                this.scene.remove(bullet.mesh);
                this.enemyBullets.splice(bulletIndex, 1);
                this.updateUI();
            }
        });
        
        // Enemies vs player
        this.enemies.forEach((enemy) => {
            if (this.player && this.checkCollision(enemy.mesh, this.player.mesh)) {
                this.player.takeDamage(20);
                this.updateUI();
            }
        });
    }
    
    checkCollision(mesh1, mesh2) {
        const box1 = new THREE.Box3().setFromObject(mesh1);
        const box2 = new THREE.Box3().setFromObject(mesh2);
        return box1.intersectsBox(box2);
    }
    
    spawnEnemies(deltaTime) {
        // Simple enemy spawning logic
        if (Math.random() < 0.01) { // 1% chance per frame
            const enemy = new PoliceEnemy(this.scene, this);
            this.enemies.push(enemy);
        }
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('bullets').textContent = this.player && this.player.weaponSystem ? this.player.weaponSystem.getCurrentWeapon().bullets : 0;
        document.getElementById('health').textContent = this.health;
        
        if (this.health <= 0) {
            this.gameOver();
        }
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOver').style.display = 'block';
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    restart() {
        // Reset game state
        this.gameState = 'playing';
        this.score = 0;
        this.health = this.maxHealth;
        
        // Clear scene
        this.enemies.forEach(enemy => this.scene.remove(enemy.mesh));
        this.bulletsArray.forEach(bullet => this.scene.remove(bullet.mesh));
        this.enemyBullets.forEach(bullet => this.scene.remove(bullet.mesh));
        
        this.enemies = [];
        this.bulletsArray = [];
        this.enemyBullets = [];
        
        // Hide game over screen
        document.getElementById('gameOver').style.display = 'none';
        
        // Recreate player
        if (this.player) {
            this.scene.remove(this.player.mesh);
        }
        this.player = new Player(this.scene, this);
        
        this.updateUI();
    }
}

// Global function for restart button
window.restartGame = function() {
    if (window.game) {
        window.game.restart();
    }
};
