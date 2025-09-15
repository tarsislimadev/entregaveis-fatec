import * as THREE from 'three';

export class WeaponSystem {
    constructor(game) {
        this.game = game;
        this.weapons = [
            { name: 'Pistol', damage: 25, bullets: 30, maxBullets: 30, fireRate: 500 },
            { name: 'Shotgun', damage: 50, bullets: 8, maxBullets: 8, fireRate: 1000 },
            { name: 'Rifle', damage: 40, bullets: 20, maxBullets: 20, fireRate: 300 }
        ];
        this.currentWeapon = 0;
        this.lastFireTime = 0;
    }
    
    getCurrentWeapon() {
        return this.weapons[this.currentWeapon];
    }
    
    canFire() {
        const currentTime = Date.now();
        const weapon = this.getCurrentWeapon();
        return currentTime - this.lastFireTime > weapon.fireRate && weapon.bullets > 0;
    }
    
    fire(player) {
        if (!this.canFire()) return false;
        
        const weapon = this.getCurrentWeapon();
        const currentTime = Date.now();
        
        weapon.bullets--;
        this.lastFireTime = currentTime;
        
        // Create bullet based on weapon type
        switch (this.currentWeapon) {
            case 0: // Pistol
                this.createPistolBullet(player);
                break;
            case 1: // Shotgun
                this.createShotgunBullets(player);
                break;
            case 2: // Rifle
                this.createRifleBullet(player);
                break;
        }
        
        this.game.bullets = weapon.bullets;
        this.game.updateUI();
        
        return true;
    }
    
    createPistolBullet(player) {
        const bullet = new Bullet(
            this.game.scene,
            player.mesh.position.x + (player.facingRight ? 20 : -20),
            player.mesh.position.y,
            player.facingRight ? 1 : -1,
            'pistol'
        );
        this.game.bulletsArray.push(bullet);
    }
    
    createShotgunBullets(player) {
        // Create multiple bullets for shotgun spread
        for (let i = 0; i < 5; i++) {
            const spread = (i - 2) * 0.1; // Spread angle
            const bullet = new Bullet(
                this.game.scene,
                player.mesh.position.x + (player.facingRight ? 20 : -20),
                player.mesh.position.y,
                player.facingRight ? 1 : -1,
                'shotgun',
                spread
            );
            this.game.bulletsArray.push(bullet);
        }
    }
    
    createRifleBullet(player) {
        const bullet = new Bullet(
            this.game.scene,
            player.mesh.position.x + (player.facingRight ? 20 : -20),
            player.mesh.position.y,
            player.facingRight ? 1 : -1,
            'rifle'
        );
        this.game.bulletsArray.push(bullet);
    }
    
    switchWeapon(index) {
        if (index >= 0 && index < this.weapons.length) {
            this.currentWeapon = index;
            this.game.bullets = this.getCurrentWeapon().bullets;
            this.game.updateUI();
        }
    }
    
    reload() {
        const weapon = this.getCurrentWeapon();
        weapon.bullets = weapon.maxBullets;
        this.game.bullets = weapon.bullets;
        this.game.updateUI();
    }
    
    addAmmo(amount) {
        const weapon = this.getCurrentWeapon();
        weapon.bullets = Math.min(weapon.bullets + amount, weapon.maxBullets);
        this.game.bullets = weapon.bullets;
        this.game.updateUI();
    }
}

export class Bullet {
    constructor(scene, x, y, direction, type = 'pistol', spread = 0) {
        this.scene = scene;
        this.type = type;
        this.direction = direction;
        this.spread = spread;
        
        // Set properties based on bullet type
        switch (type) {
            case 'pistol':
                this.speed = 400;
                this.damage = 25;
                this.color = 0xffff00;
                this.size = 3;
                break;
            case 'shotgun':
                this.speed = 350;
                this.damage = 15;
                this.color = 0xff8800;
                this.size = 2;
                break;
            case 'rifle':
                this.speed = 500;
                this.damage = 40;
                this.color = 0x00ff00;
                this.size = 2.5;
                break;
        }
        
        this.createMesh(x, y);
    }
    
    createMesh(x, y) {
        const geometry = new THREE.SphereGeometry(this.size, 8, 6);
        const material = new THREE.MeshLambertMaterial({ 
            color: this.color,
            emissive: new THREE.Color(this.color).multiplyScalar(0.3)
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, y, 0);
        this.mesh.castShadow = true;
        
        this.scene.add(this.mesh);
    }
    
    update(deltaTime) {
        // Calculate velocity with spread
        const velocityX = this.speed * this.direction * Math.cos(this.spread);
        const velocityY = this.speed * Math.sin(this.spread);
        
        this.mesh.position.x += velocityX * deltaTime;
        this.mesh.position.y += velocityY * deltaTime;
        
        // Rotate bullet
        this.mesh.rotation.z += deltaTime * 10;
        
        // Add trail effect
        this.createTrail();
    }
    
    createTrail() {
        // Simple trail effect by creating small particles
        if (Math.random() < 0.3) {
            const trailGeometry = new THREE.SphereGeometry(1, 4, 4);
            const trailMaterial = new THREE.MeshBasicMaterial({ 
                color: this.color,
                transparent: true,
                opacity: 0.5
            });
            
            const trail = new THREE.Mesh(trailGeometry, trailMaterial);
            trail.position.copy(this.mesh.position);
            trail.position.z = -1;
            
            this.scene.add(trail);
            
            // Remove trail after short time
            setTimeout(() => {
                this.scene.remove(trail);
            }, 200);
        }
    }
    
    getDamage() {
        return this.damage;
    }
}

export class PowerUp {
    constructor(scene, x, y, type) {
        this.scene = scene;
        this.type = type;
        this.collected = false;
        
        this.createMesh(x, y);
        this.setupAnimation();
    }
    
    createMesh(x, y) {
        let geometry, material, color;
        
        switch (this.type) {
            case 'ammo':
                geometry = new THREE.BoxGeometry(8, 8, 8);
                color = 0xffd700;
                break;
            case 'health':
                geometry = new THREE.SphereGeometry(6, 8, 6);
                color = 0xff0000;
                break;
            case 'weapon':
                geometry = new THREE.CylinderGeometry(3, 3, 12, 8);
                color = 0x00ff00;
                break;
        }
        
        material = new THREE.MeshLambertMaterial({ 
            color: color,
            emissive: new THREE.Color(color).multiplyScalar(0.2)
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, y, 0);
        this.mesh.castShadow = true;
        
        this.scene.add(this.mesh);
    }
    
    setupAnimation() {
        this.rotationSpeed = 0.02;
        this.bobSpeed = 0.05;
        this.bobAmount = 2;
        this.originalY = this.mesh.position.y;
    }
    
    update(deltaTime) {
        if (this.collected) return;
        
        // Rotate
        this.mesh.rotation.y += this.rotationSpeed;
        
        // Bob up and down
        this.mesh.position.y = this.originalY + Math.sin(Date.now() * this.bobSpeed) * this.bobAmount;
    }
    
    collect(player) {
        if (this.collected) return;
        
        this.collected = true;
        this.scene.remove(this.mesh);
        
        // Apply power-up effect
        switch (this.type) {
            case 'ammo':
                if (player.weaponSystem) {
                    player.weaponSystem.addAmmo(15);
                }
                break;
            case 'health':
                player.health = Math.min(player.health + 25, player.maxHealth);
                player.game.health = player.health;
                player.game.updateUI();
                break;
            case 'weapon':
                // Switch to next weapon
                if (player.weaponSystem) {
                    const nextWeapon = (player.weaponSystem.currentWeapon + 1) % player.weaponSystem.weapons.length;
                    player.weaponSystem.switchWeapon(nextWeapon);
                }
                break;
        }
    }
}
