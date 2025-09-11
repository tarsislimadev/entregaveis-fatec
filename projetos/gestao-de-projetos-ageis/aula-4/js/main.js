import * as THREE from 'three';
import { Game } from './game.js';
import { Player, Bullet } from './player.js';
import { Enemy, EnemyBullet, Civilian } from './enemies.js';
import { Weapon, Medicine, WeaponSpawner, MedicineSpawner } from './weapons.js';
import { Environment, ParticleSystem } from './environment.js';

// Main game initialization and control
let environment, weaponSpawner, medicineSpawner, particleSystem;

function initGame() {
    // Hide loading screen
    document.getElementById('loading').style.display = 'none';
    
    // Initialize game (using global game variable from game.js)
    window.game = new Game();
    environment = new Environment(window.game);
    weaponSpawner = new WeaponSpawner(window.game);
    medicineSpawner = new MedicineSpawner(window.game);
    particleSystem = new ParticleSystem(window.game);
    
    // Create player
    window.game.player = new Player(window.game);
    window.game.scene.add(window.game.player.mesh);
    
    // Spawn initial enemies
    for (let i = 0; i < 3; i++) {
        const type = Math.random() < 0.5 ? 'police' : 'gangster';
        window.game.spawnEnemy(type);
    }
    
    // Spawn initial civilians
    for (let i = 0; i < 5; i++) {
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * 40,
            0,
            (Math.random() - 0.5) * 40
        );
        window.game.spawnCivilian(position);
    }
    
    // Spawn initial weapons and medicines
    window.game.spawnWeapon('shotgun', new THREE.Vector3(10, 1, 10));
    window.game.spawnMedicine(new THREE.Vector3(-10, 1, -10));
    
    // Start game loop
    window.game.animate();
    
    console.log('Super Mario World (versão GTA) iniciado!');
}

export function restartGame() {
    // Reset game state
    window.game.gameState = 'playing';
    document.getElementById('gameOver').style.display = 'none';
    
    // Reset player
    window.game.player.health = 100;
    window.game.player.ammo = 30;
    window.game.player.currentWeapon = 'pistol';
    window.game.player.mesh.position.set(0, 2, 0);
    
    // Clear enemies
    window.game.enemies.forEach(enemy => {
        window.game.scene.remove(enemy.mesh);
    });
    window.game.enemies = [];
    
    // Clear bullets
    window.game.bullets.forEach(bullet => {
        window.game.scene.remove(bullet.mesh);
    });
    window.game.bullets = [];
    
    // Clear weapons and medicines
    window.game.weapons.forEach(weapon => {
        window.game.scene.remove(weapon.mesh);
    });
    window.game.weapons = [];
    
    window.game.medicines.forEach(medicine => {
        window.game.scene.remove(medicine.mesh);
    });
    window.game.medicines = [];
    
    // Clear civilians
    window.game.civilians.forEach(civilian => {
        window.game.scene.remove(civilian.mesh);
    });
    window.game.civilians = [];
    
    // Reset time of day
    window.game.timeOfDay = 0;
    
    // Spawn new enemies
    for (let i = 0; i < 3; i++) {
        const type = Math.random() < 0.5 ? 'police' : 'gangster';
        window.game.spawnEnemy(type);
    }
    
    // Spawn new civilians
    for (let i = 0; i < 5; i++) {
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * 40,
            0,
            (Math.random() - 0.5) * 40
        );
        window.game.spawnCivilian(position);
    }
    
    // Spawn new items
    window.game.spawnWeapon('shotgun', new THREE.Vector3(10, 1, 10));
    window.game.spawnMedicine(new THREE.Vector3(-10, 1, -10));
    
    console.log('Jogo reiniciado!');
}

// Enhanced game update function
function updateGame() {
    if (window.game.gameState !== 'playing') return;
    
    const deltaTime = window.game.clock.getDelta();
    
    // Update spawners
    weaponSpawner.update(deltaTime);
    medicineSpawner.update(deltaTime);
    
    // Update environment
    environment.update(deltaTime);
    environment.updateTimeOfDay(window.game.timeOfDay);
    
    // Update particle system
    particleSystem.update(deltaTime);
    
    // Update weapons and medicines
    window.game.weapons.forEach(weapon => {
        weapon.update(deltaTime);
    });
    
    window.game.medicines.forEach(medicine => {
        medicine.update(deltaTime);
    });
    
    // Check for enemy bullet vs player collisions
    window.game.bullets.forEach((bullet, bulletIndex) => {
        if (bullet.constructor.name === 'EnemyBullet' && window.game.player) {
            if (bullet.mesh.position.distanceTo(window.game.player.mesh.position) < 2) {
                window.game.player.takeDamage(bullet.damage);
                window.game.scene.remove(bullet.mesh);
                window.game.bullets.splice(bulletIndex, 1);
                
                // Create explosion effect
                particleSystem.createExplosion(bullet.mesh.position);
            }
        }
    });
    
    // Check win condition
    if (window.game.enemies.length === 0) {
        window.game.showGameOver('Parabéns! Você derrotou todos os inimigos!', 'Vitória!');
    }
}

// Override the game's update method to include our enhancements
Game.prototype.update = function() {
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
    
    // Call our enhanced update
    updateGame();
};

// Make restartGame available globally
window.restartGame = restartGame;

// Initialize game when page loads
window.addEventListener('load', () => {
    setTimeout(initGame, 1000); // Small delay to ensure everything is loaded
});

// Add some additional UI enhancements
function updateUI() {
    // Update score display
    const scoreElement = document.getElementById('score');
    if (scoreElement && window.game) {
        scoreElement.textContent = `Pontuação: ${window.game.score}`;
    }
    
    // Update time display
    const timeElement = document.getElementById('time');
    if (timeElement && window.game) {
        const timeText = window.game.timeOfDay < 0.5 ? 'Pôr do sol' : 'Noite';
        timeElement.textContent = `Hora: ${timeText}`;
    }
}

// Add score and time to HUD
document.addEventListener('DOMContentLoaded', () => {
    const hud = document.getElementById('hud');
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'score';
    scoreDiv.textContent = 'Pontuação: 0';
    hud.appendChild(scoreDiv);
    
    const timeDiv = document.createElement('div');
    timeDiv.id = 'time';
    timeDiv.textContent = 'Hora: Pôr do sol';
    hud.appendChild(timeDiv);
});

// Enhanced game over handling
function handleGameOver() {
    // Add some final statistics
    const stats = document.createElement('div');
    stats.innerHTML = `
        <h3>Estatísticas Finais:</h3>
        <p>Pontuação: ${window.game.score}</p>
        <p>Inimigos derrotados: ${window.game.score / 10}</p>
        <p>Tempo de jogo: ${Math.floor(window.game.clock.getElapsedTime())}s</p>
    `;
    
    const gameOverDiv = document.getElementById('gameOver');
    gameOverDiv.appendChild(stats);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyP') {
        // Pause/unpause game
        if (window.game && window.game.gameState === 'playing') {
            window.game.gameState = 'paused';
            document.getElementById('gameOver').style.display = 'block';
            document.getElementById('gameOverTitle').textContent = 'Jogo Pausado';
            document.getElementById('gameOverMessage').textContent = 'Pressione P para continuar';
        } else if (window.game && window.game.gameState === 'paused') {
            window.game.gameState = 'playing';
            document.getElementById('gameOver').style.display = 'none';
        }
    }
    
    if (event.code === 'KeyM') {
        // Toggle mute (if we had sound)
        console.log('Som alternado');
    }
    
    if (event.code === 'KeyH') {
        // Show help
        alert(`
Controles do Jogo:
WASD - Mover personagem
Espaço - Pular
Clique do mouse - Atirar
R - Recarregar arma
P - Pausar/Despausar
M - Alternar som
H - Mostrar esta ajuda

Objetivo: Derrotar todos os inimigos (polícia e gangsters) para vencer o jogo!
        `);
    }
});
