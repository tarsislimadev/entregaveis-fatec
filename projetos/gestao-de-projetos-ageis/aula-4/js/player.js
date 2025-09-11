import * as THREE from 'three';

export class Player {
    constructor(game) {
        this.game = game;
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 5;
        this.jumpPower = 8;
        this.isGrounded = false;
        this.velocity = new THREE.Vector3();
        this.currentWeapon = 'pistol';
        this.ammo = 30;
        this.maxAmmo = 30;
        this.reloadTime = 0;
        
        this.createMesh();
        this.setupPhysics();
    }
    
    createMesh() {
        // Motoboy character - simple humanoid figure
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.5, 0.7, 1.5);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0066cc });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.75;
        body.castShadow = true;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.4);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.8;
        head.castShadow = true;
        group.add(head);
        
        // Helmet
        const helmetGeometry = new THREE.SphereGeometry(0.45, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.6);
        const helmetMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        const helmet = new THREE.Mesh(helmetGeometry, helmetMaterial);
        helmet.position.y = 1.8;
        helmet.rotation.x = Math.PI;
        group.add(helmet);
        
        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1);
        const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.8, 1, 0);
        leftArm.castShadow = true;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.8, 1, 0);
        rightArm.castShadow = true;
        group.add(rightArm);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.3, -0.75, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.3, -0.75, 0);
        rightLeg.castShadow = true;
        group.add(rightLeg);
        
        // Motorcycle (simplified)
        const bikeGeometry = new THREE.BoxGeometry(2, 0.3, 0.8);
        const bikeMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const bike = new THREE.Mesh(bikeGeometry, bikeMaterial);
        bike.position.set(0, -1.2, 0);
        bike.castShadow = true;
        group.add(bike);
        
        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        frontWheel.position.set(0.8, -1.2, 0);
        frontWheel.rotation.z = Math.PI / 2;
        group.add(frontWheel);
        
        const backWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        backWheel.position.set(-0.8, -1.2, 0);
        backWheel.rotation.z = Math.PI / 2;
        group.add(backWheel);
        
        this.mesh = group;
        this.mesh.position.set(0, 2, 0);
    }
    
    setupPhysics() {
        this.gravity = -20;
        this.velocity.y = 0;
    }
    
    update(deltaTime, keys, mouse) {
        // Handle movement
        this.handleMovement(keys, deltaTime);
        
        // Handle jumping
        this.handleJumping(keys);
        
        // Handle shooting
        this.handleShooting(mouse, deltaTime);
        
        // Handle reloading
        this.handleReloading(keys);
        
        // Apply gravity
        this.velocity.y += this.gravity * deltaTime;
        this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));
        
        // Ground collision
        if (this.mesh.position.y <= 1) {
            this.mesh.position.y = 1;
            this.velocity.y = 0;
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
        
        // Keep player in bounds
        this.mesh.position.x = Math.max(-25, Math.min(25, this.mesh.position.x));
        this.mesh.position.z = Math.max(-25, Math.min(25, this.mesh.position.z));
        
        // Update camera to follow player
        this.game.camera.position.x = this.mesh.position.x;
        this.game.camera.position.z = this.mesh.position.z + 15;
        this.game.camera.lookAt(this.mesh.position);
        
        // Update UI
        this.updateUI();
    }
    
    handleMovement(keys, deltaTime) {
        const moveSpeed = this.speed * deltaTime;
        
        if (keys['KeyW'] || keys['ArrowUp']) {
            this.mesh.position.z -= moveSpeed;
            this.mesh.rotation.y = 0;
        }
        if (keys['KeyS'] || keys['ArrowDown']) {
            this.mesh.position.z += moveSpeed;
            this.mesh.rotation.y = Math.PI;
        }
        if (keys['KeyA'] || keys['ArrowLeft']) {
            this.mesh.position.x -= moveSpeed;
            this.mesh.rotation.y = -Math.PI / 2;
        }
        if (keys['KeyD'] || keys['ArrowRight']) {
            this.mesh.position.x += moveSpeed;
            this.mesh.rotation.y = Math.PI / 2;
        }
    }
    
    handleJumping(keys) {
        if ((keys['Space'] || keys['KeyW']) && this.isGrounded) {
            this.velocity.y = this.jumpPower;
            this.isGrounded = false;
        }
    }
    
    handleShooting(mouse, deltaTime) {
        if (this.reloadTime > 0) {
            this.reloadTime -= deltaTime;
            return;
        }
        
        if (mouse.clicked && this.ammo > 0) {
            this.shoot();
            this.ammo--;
            mouse.clicked = false;
        }
    }
    
    handleReloading(keys) {
        if (keys['KeyR'] && this.ammo < this.maxAmmo) {
            this.reloadTime = 2; // 2 second reload
            this.ammo = this.maxAmmo;
        }
    }
    
    shoot() {
        const bullet = new Bullet(
            this.mesh.position.clone(),
            this.mesh.rotation.y,
            this.currentWeapon
        );
        this.game.bullets.push(bullet);
        this.game.scene.add(bullet.mesh);
    }
    
    equipWeapon(weaponType) {
        this.currentWeapon = weaponType;
        this.maxAmmo = this.getWeaponAmmo(weaponType);
        this.ammo = this.maxAmmo;
    }
    
    getWeaponAmmo(weaponType) {
        const ammoCounts = {
            'pistol': 30,
            'shotgun': 8,
            'rifle': 60,
            'machinegun': 100
        };
        return ammoCounts[weaponType] || 30;
    }
    
    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.game.gameState = 'hospital';
            this.game.showGameOver('Você foi morto! Passando tempo no hospital...', 'Hospital');
        }
    }
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }
    
    updateUI() {
        document.getElementById('healthValue').textContent = Math.max(0, this.health);
        document.getElementById('healthFill').style.width = (this.health / this.maxHealth * 100) + '%';
        document.getElementById('currentWeapon').textContent = this.currentWeapon.charAt(0).toUpperCase() + this.currentWeapon.slice(1);
        document.getElementById('ammo').textContent = this.ammo;
    }
}

// Bullet class
export class Bullet {
    constructor(position, direction, weaponType) {
        this.position = position.clone();
        this.direction = direction;
        this.speed = 20;
        this.damage = this.getWeaponDamage(weaponType);
        this.lifetime = 3;
        this.shouldRemove = false;
        
        this.createMesh();
    }
    
    createMesh() {
        const geometry = new THREE.SphereGeometry(0.1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
    }
    
    getWeaponDamage(weaponType) {
        const damages = {
            'pistol': 25,
            'shotgun': 50,
            'rifle': 40,
            'machinegun': 15
        };
        return damages[weaponType] || 25;
    }
    
    update(deltaTime) {
        // Move bullet
        this.position.x += Math.sin(this.direction) * this.speed * deltaTime;
        this.position.z += Math.cos(this.direction) * this.speed * deltaTime;
        this.mesh.position.copy(this.position);
        
        // Check lifetime
        this.lifetime -= deltaTime;
        if (this.lifetime <= 0) {
            this.shouldRemove = true;
        }
        
        // Check bounds
        if (Math.abs(this.position.x) > 50 || Math.abs(this.position.z) > 50) {
            this.shouldRemove = true;
        }
    }
}
