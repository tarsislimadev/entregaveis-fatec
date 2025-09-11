import * as THREE from 'three';
import { Enemy, EnemyBullet, Civilian } from './enemies.js';
import { Weapon, Medicine, WeaponSpawner, MedicineSpawner } from './weapons.js';

export class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.clock = new THREE.Clock();
        
        this.gameState = 'playing'; // playing, gameOver, hospital, prison
        this.score = 0;
        this.timeOfDay = 0; // 0 = sunset, 1 = night
        
        this.setupRenderer();
        this.setupLighting();
        this.setupControls();
        
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.weapons = [];
        this.medicines = [];
        this.civilians = [];
        
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };
        
        this.setupEventListeners();
    }
    
    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x87CEEB); // Sky blue
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('gameContainer').appendChild(this.renderer.domElement);
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.sunLight.position.set(50, 50, 50);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.scene.add(this.sunLight);
        
        // Street lights for night
        this.streetLights = [];
    }
    
    setupControls() {
        this.camera.position.set(0, 10, 15);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });
        
        document.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });
        
        // Mouse events
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        document.addEventListener('mousedown', (event) => {
            this.mouse.clicked = true;
        });
        
        document.addEventListener('mouseup', (event) => {
            this.mouse.clicked = false;
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    updateTimeOfDay() {
        // Gradually transition from sunset to night
        this.timeOfDay += 0.0001;
        if (this.timeOfDay > 1) this.timeOfDay = 1;
        
        // Update lighting based on time
        if (this.timeOfDay < 0.5) {
            // Sunset to dusk
            const intensity = 1 - (this.timeOfDay * 2);
            this.sunLight.intensity = intensity;
            this.scene.fog = new THREE.Fog(0x8B4513, 10, 50); // Brown fog
        } else {
            // Night
            this.sunLight.intensity = 0.1;
            this.scene.fog = new THREE.Fog(0x000033, 5, 30); // Dark blue fog
            
            // Add street lights
            if (this.streetLights.length === 0) {
                this.addStreetLights();
            }
        }
    }
    
    addStreetLights() {
        for (let i = -20; i <= 20; i += 10) {
            const light = new THREE.PointLight(0xffff88, 0.5, 20);
            light.position.set(i, 8, 0);
            light.castShadow = true;
            this.scene.add(light);
            this.streetLights.push(light);
            
            // Light post
            const postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8);
            const postMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
            const post = new THREE.Mesh(postGeometry, postMaterial);
            post.position.set(i, 4, 0);
            this.scene.add(post);
        }
    }
    
    spawnEnemy(type) {
        const enemy = new Enemy(type, this);
        this.enemies.push(enemy);
        this.scene.add(enemy.mesh);
    }
    
    spawnWeapon(type, position) {
        const weapon = new Weapon(type, position);
        this.weapons.push(weapon);
        this.scene.add(weapon.mesh);
    }
    
    spawnMedicine(position) {
        const medicine = new Medicine(position);
        this.medicines.push(medicine);
        this.scene.add(medicine.mesh);
    }
    
    spawnCivilian(position) {
        const civilian = new Civilian(position);
        this.civilians.push(civilian);
        this.scene.add(civilian.mesh);
    }
    
    update() {
        if (this.gameState !== 'playing') return;
        
        const deltaTime = this.clock.getDelta();
        
        // Update time of day
        this.updateTimeOfDay();
        
        // Update player
        if (this.player) {
            this.player.update(deltaTime, this.keys, this.mouse);
        }
        
        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update(deltaTime);
        });
        
        // Update bullets
        this.bullets.forEach((bullet, index) => {
            bullet.update(deltaTime);
            if (bullet.shouldRemove) {
                this.scene.remove(bullet.mesh);
                this.bullets.splice(index, 1);
            }
        });
        
        // Update civilians
        this.civilians.forEach(civilian => {
            civilian.update(deltaTime);
        });
        
        // Check collisions
        this.checkCollisions();
        
        // Spawn new enemies occasionally
        if (Math.random() < 0.001) {
            const type = Math.random() < 0.5 ? 'police' : 'gangster';
            this.spawnEnemy(type);
        }
        
        // Spawn civilians
        if (Math.random() < 0.002) {
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                0,
                (Math.random() - 0.5) * 100
            );
            this.spawnCivilian(position);
        }
    }
    
    checkCollisions() {
        // Bullet vs Enemy collisions
        this.bullets.forEach((bullet, bulletIndex) => {
            this.enemies.forEach((enemy, enemyIndex) => {
                if (bullet.mesh.position.distanceTo(enemy.mesh.position) < 2) {
                    enemy.takeDamage(bullet.damage);
                    this.scene.remove(bullet.mesh);
                    this.bullets.splice(bulletIndex, 1);
                    
                    if (enemy.health <= 0) {
                        this.scene.remove(enemy.mesh);
                        this.enemies.splice(enemyIndex, 1);
                        this.score += enemy.type === 'police' ? 10 : 20;
                    }
                }
            });
        });
        
        // Player vs Enemy collisions
        if (this.player) {
            this.enemies.forEach((enemy, index) => {
                if (this.player.mesh.position.distanceTo(enemy.mesh.position) < 3) {
                    if (enemy.type === 'police') {
                        this.gameState = 'prison';
                        this.showGameOver('Você foi preso pela polícia!', 'Prisão');
                    } else {
                        this.player.takeDamage(20);
                    }
                }
            });
        }
        
        // Player vs Weapon collisions
        this.weapons.forEach((weapon, index) => {
            if (this.player && this.player.mesh.position.distanceTo(weapon.mesh.position) < 2) {
                this.player.equipWeapon(weapon.type);
                this.scene.remove(weapon.mesh);
                this.weapons.splice(index, 1);
            }
        });
        
        // Player vs Medicine collisions
        this.medicines.forEach((medicine, index) => {
            if (this.player && this.player.mesh.position.distanceTo(medicine.mesh.position) < 2) {
                this.player.heal(30);
                this.scene.remove(medicine.mesh);
                this.medicines.splice(index, 1);
            }
        });
    }
    
    showGameOver(message, title = 'Game Over') {
        this.gameState = 'gameOver';
        document.getElementById('gameOverTitle').textContent = title;
        document.getElementById('gameOverMessage').textContent = message;
        document.getElementById('gameOver').style.display = 'block';
    }
    
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.render();
    }
}

// Global game instance
export let game;
