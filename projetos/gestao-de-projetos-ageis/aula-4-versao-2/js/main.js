import { Game } from './game.js';
import { Player } from './player.js';
import { PoliceEnemy } from './enemies.js';
import { WeaponSystem, PowerUp } from './weapons.js';

// Main game initialization
let game;

// Initialize the game when the page loads
window.addEventListener('load', () => {
    // Create game instance
    game = new Game();
    window.game = game; // Make it globally accessible
    
    // Start the game
    game.start();
    
    // Add keyboard controls for weapon switching
    document.addEventListener('keydown', (event) => {
        if (game && game.player && game.player.weaponSystem) {
            switch (event.code) {
                case 'Digit1':
                    game.player.weaponSystem.switchWeapon(0); // Pistol
                    break;
                case 'Digit2':
                    game.player.weaponSystem.switchWeapon(1); // Shotgun
                    break;
                case 'Digit3':
                    game.player.weaponSystem.switchWeapon(2); // Rifle
                    break;
                case 'KeyR':
                    game.player.weaponSystem.reload();
                    break;
            }
        }
    });
    
    // Add mouse click for shooting
    document.addEventListener('click', (event) => {
        if (game && game.gameState === 'playing' && game.player && game.player.weaponSystem) {
            game.player.weaponSystem.fire(game.player);
        }
    });
    
    // Add power-up spawning
    setInterval(() => {
        if (game && game.gameState === 'playing' && Math.random() < 0.1) {
            spawnPowerUp();
        }
    }, 5000); // Spawn power-up every 5 seconds with 10% chance
});

function spawnPowerUp() {
    const types = ['ammo', 'health', 'weapon'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const x = game.player.mesh.position.x + (Math.random() - 0.5) * 200;
    const y = -window.innerHeight / 2 + 100;
    
    const powerUp = new PowerUp(game.scene, x, y, type);
    
    // Add to game's power-ups array if it exists
    if (!game.powerUps) {
        game.powerUps = [];
    }
    game.powerUps.push(powerUp);
    
    // Remove power-up after 10 seconds if not collected
    setTimeout(() => {
        if (!powerUp.collected) {
            game.scene.remove(powerUp.mesh);
            const index = game.powerUps.indexOf(powerUp);
            if (index > -1) {
                game.powerUps.splice(index, 1);
            }
        }
    }, 10000);
}

// Enhanced game loop to handle power-ups
const originalUpdate = Game.prototype.update;
Game.prototype.update = function(deltaTime) {
    // Call original update
    originalUpdate.call(this, deltaTime);
    
    // Update power-ups
    if (this.powerUps) {
        this.powerUps.forEach((powerUp, index) => {
            powerUp.update(deltaTime);
            
            // Check collision with player
            if (this.player && this.checkCollision(powerUp.mesh, this.player.mesh)) {
                powerUp.collect(this.player);
                this.powerUps.splice(index, 1);
            }
            
            // Remove if collected
            if (powerUp.collected) {
                this.powerUps.splice(index, 1);
            }
        });
    }
    
    // Update particles
    if (this.particles) {
        this.particles.forEach((particle, index) => {
            particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime));
            particle.velocity.y += -800 * deltaTime; // Gravity
            
            // Remove particles that are off screen or hit ground
            if (particle.position.y < -window.innerHeight / 2 - 50) {
                this.scene.remove(particle);
                this.particles.splice(index, 1);
            }
        });
    }
};

// Add sound effects (simple beep sounds using Web Audio API)
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.init();
    }
    
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }
    
    playSound(frequency, duration, type = 'sine') {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }
    
    playShoot() {
        this.playSound(800, 0.1, 'square');
    }
    
    playHit() {
        this.playSound(200, 0.2, 'sawtooth');
    }
    
    playJump() {
        this.playSound(400, 0.1, 'sine');
    }
    
    playPowerUp() {
        this.playSound(600, 0.3, 'sine');
    }
}

// Initialize sound manager
const soundManager = new SoundManager();

// Add sound effects to game events
const originalPlayerShoot = Player.prototype.shoot;
Player.prototype.shoot = function() {
    const result = originalPlayerShoot.call(this);
    if (result) {
        soundManager.playShoot();
    }
    return result;
};

const originalPlayerJump = Player.prototype.jump;
Player.prototype.jump = function() {
    originalPlayerJump.call(this);
    soundManager.playJump();
};

const originalPlayerTakeDamage = Player.prototype.takeDamage;
Player.prototype.takeDamage = function(damage) {
    originalPlayerTakeDamage.call(this, damage);
    soundManager.playHit();
};

const originalEnemyTakeDamage = PoliceEnemy.prototype.takeDamage;
PoliceEnemy.prototype.takeDamage = function(damage) {
    originalEnemyTakeDamage.call(this, damage);
    soundManager.playHit();
};

const originalPowerUpCollect = PowerUp.prototype.collect;
PowerUp.prototype.collect = function(player) {
    originalPowerUpCollect.call(this, player);
    soundManager.playPowerUp();
};

// Add pause functionality
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape' && game) {
        if (game.gameState === 'playing') {
            game.gameState = 'paused';
            document.getElementById('gameOver').style.display = 'block';
            document.getElementById('gameOver').innerHTML = '<h2>Paused</h2><button onclick="resumeGame()">Resume</button>';
        } else if (game.gameState === 'paused') {
            resumeGame();
        }
    }
});

window.resumeGame = function() {
    if (game) {
        game.gameState = 'playing';
        document.getElementById('gameOver').style.display = 'none';
    }
};

// Add mobile touch controls
if ('ontouchstart' in window) {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Simple touch controls
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 50) {
                // Swipe right - move right
                game.keys['KeyD'] = true;
                setTimeout(() => game.keys['KeyD'] = false, 100);
            } else if (deltaX < -50) {
                // Swipe left - move left
                game.keys['KeyA'] = true;
                setTimeout(() => game.keys['KeyA'] = false, 100);
            }
        } else {
            // Vertical swipe
            if (deltaY < -50) {
                // Swipe up - jump
                if (game.player) game.player.jump();
            } else if (deltaY > 50) {
                // Swipe down - shoot
                if (game.player && game.player.weaponSystem) {
                    game.player.weaponSystem.fire(game.player);
                }
            }
        }
    });
}

console.log('Rio Streets Game loaded successfully!');
console.log('Controls:');
console.log('- WASD/Arrow Keys: Move');
console.log('- SPACE: Jump');
console.log('- Click: Shoot');
console.log('- 1,2,3: Switch weapons');
console.log('- R: Reload');
console.log('- ESC: Pause');
