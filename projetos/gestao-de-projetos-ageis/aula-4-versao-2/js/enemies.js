import * as THREE from 'three';

export class PoliceEnemy {
    constructor(scene, game) {
        this.scene = scene;
        this.game = game;
        this.health = 50;
        this.maxHealth = 50;
        this.speed = 80;
        this.attackRange = 150;
        this.lastAttackTime = 0;
        this.attackCooldown = 2000; // 2 seconds
        this.isGrounded = false;
        this.velocity = { x: 0, y: 0 };
        this.facingRight = false;
        
        // Choose random suit texture
        this.suitTexture = Math.random() < 0.5 ? 'suit-1.webp' : 'suit-2.webp';
        
        this.createMesh();
        this.setupPhysics();
    }
    
    createMesh() {
        // Create police enemy as a sprite using the suit image
        const textureLoader = new THREE.TextureLoader();
        
        // Load texture with error handling
        const suitTexture = textureLoader.load(
            this.suitTexture,
            // onLoad callback
            (texture) => {
                console.log(`Loaded police suit texture: ${this.suitTexture}`);
            },
            // onProgress callback
            undefined,
            // onError callback
            (error) => {
                console.error(`Failed to load texture: ${this.suitTexture}`, error);
            }
        );
        
        // Create a plane geometry for the sprite
        const geometry = new THREE.PlaneGeometry(20, 40);
        
        const material = new THREE.MeshBasicMaterial({ 
            map: suitTexture,
            transparent: true,
            alphaTest: 0.1,
            side: THREE.DoubleSide
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(window.innerWidth / 2 + 50, -window.innerHeight / 2 + 50, 0);
        
        // Add police details
        this.addPoliceDetails();
        
        this.scene.add(this.mesh);
    }
    
    addPoliceDetails() {
        // Since we're using suit sprites, we'll add minimal 3D elements
        // Gun in right hand
        const gunGeometry = new THREE.BoxGeometry(6, 1.5, 1.5);
        const gunMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        this.gun = new THREE.Mesh(gunGeometry, gunMaterial);
        this.gun.position.set(12, 5, 1);
        this.gun.castShadow = true;
        this.mesh.add(this.gun);
        
        // Police badge
        const badgeGeometry = new THREE.CircleGeometry(2, 8);
        const badgeMaterial = new THREE.MeshLambertMaterial({ color: 0xffd700 });
        this.badge = new THREE.Mesh(badgeGeometry, badgeMaterial);
        this.badge.position.set(0, 8, 1);
        this.mesh.add(this.badge);
    }
    
    setupPhysics() {
        this.gravity = -800;
        this.groundY = -window.innerHeight / 2 + 50;
    }
    
    update(deltaTime, player) {
        if (!player) return;
        
        this.aiBehavior(deltaTime, player);
        this.applyPhysics(deltaTime);
        this.updateAnimation();
    }
    
    aiBehavior(deltaTime, player) {
        const distanceToPlayer = Math.abs(this.mesh.position.x - player.mesh.position.x);
        
        // Move towards player
        if (distanceToPlayer > 100) {
            if (this.mesh.position.x > player.mesh.position.x) {
                this.velocity.x = -this.speed;
                this.facingRight = false;
            } else {
                this.velocity.x = this.speed;
                this.facingRight = true;
            }
        } else {
            this.velocity.x *= 0.8; // Stop and face player
        }
        
        // Attack if in range
        if (distanceToPlayer < this.attackRange) {
            const currentTime = Date.now();
            if (currentTime - this.lastAttackTime > this.attackCooldown) {
                this.attack(player);
                this.lastAttackTime = currentTime;
            }
        }
    }
    
    applyPhysics(deltaTime) {
        // Apply gravity
        this.velocity.y += this.gravity * deltaTime;
        
        // Update position
        this.mesh.position.x += this.velocity.x * deltaTime;
        this.mesh.position.y += this.velocity.y * deltaTime;
        
        // Ground collision
        if (this.mesh.position.y <= this.groundY) {
            this.mesh.position.y = this.groundY;
            this.velocity.y = 0;
            this.isGrounded = true;
        }
        
        // Remove if off screen
        if (this.mesh.position.x < -window.innerWidth / 2 - 100) {
            this.scene.remove(this.mesh);
            return;
        }
    }
    
    updateAnimation() {
        // Simple sprite animation - just face direction
        this.mesh.scale.x = this.facingRight ? 1 : -1;
        
        // Add slight bobbing when moving
        if (Math.abs(this.velocity.x) > 10) {
            const time = Date.now() * 0.01;
            this.mesh.position.y += Math.sin(time) * 0.5;
        }
    }
    
    attack(player) {
        // Create enemy bullet
        const bullet = new EnemyBullet(
            this.scene,
            this.mesh.position.x + (this.facingRight ? 20 : -20),
            this.mesh.position.y,
            this.facingRight ? 1 : -1
        );
        this.game.enemyBullets.push(bullet);
        
        // Muzzle flash effect
        this.gun.material.color.setHex(0xffaa00);
        setTimeout(() => {
            this.gun.material.color.setHex(0x333333);
        }, 100);
    }
    
    takeDamage(damage) {
        this.health -= damage;
        
        // Flash effect - temporarily change material color
        const originalColor = this.mesh.material.color;
        this.mesh.material.color.setHex(0xff0000);
        
        setTimeout(() => {
            this.mesh.material.color = originalColor;
        }, 100);
        
        if (this.health <= 0) {
            this.health = 0;
            this.createDeathEffect();
        }
    }
    
    createDeathEffect() {
        // Create explosion particles
        for (let i = 0; i < 10; i++) {
            const particleGeometry = new THREE.SphereGeometry(2, 4, 4);
            const particleMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL(Math.random() * 0.1, 1, 0.5)
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            particle.position.copy(this.mesh.position);
            particle.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 200,
                Math.random() * 200,
                0
            );
            
            this.scene.add(particle);
            this.game.particles.push(particle);
            
            // Remove particle after 1 second
            setTimeout(() => {
                this.scene.remove(particle);
                const index = this.game.particles.indexOf(particle);
                if (index > -1) {
                    this.game.particles.splice(index, 1);
                }
            }, 1000);
        }
    }
}

export class EnemyBullet {
    constructor(scene, x, y, direction) {
        this.scene = scene;
        this.speed = 300;
        this.direction = direction;
        
        this.createMesh(x, y);
    }
    
    createMesh(x, y) {
        const geometry = new THREE.SphereGeometry(2.5, 8, 6);
        const material = new THREE.MeshLambertMaterial({ 
            color: 0xff4444,
            emissive: 0x440000
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, y, 0);
        this.mesh.castShadow = true;
        
        this.scene.add(this.mesh);
    }
    
    update(deltaTime) {
        this.mesh.position.x += this.speed * this.direction * deltaTime;
        
        // Rotate bullet
        this.mesh.rotation.z += deltaTime * 15;
    }
}
