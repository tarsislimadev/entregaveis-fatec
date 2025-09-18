import * as THREE from 'three';

export class Enemy {
    constructor(type, game) {
        this.type = type; // 'police' or 'gangster'
        this.game = game;
        this.health = this.getMaxHealth();
        this.speed = this.getSpeed();
        this.detectionRange = 15;
        this.attackRange = 8;
        this.lastAttackTime = 0;
        this.attackCooldown = 2;
        this.state = 'patrol'; // patrol, chase, attack
        this.patrolTarget = this.getRandomPatrolPoint();
        this.velocity = new THREE.Vector3();
        
        this.createMesh();
        this.setupAI();
    }
    
    createMesh() {
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.5, 1.2);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: this.type === 'police' ? 0x0000ff : 0x800000 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.6;
        body.castShadow = true;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.3);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.3;
        head.castShadow = true;
        group.add(head);
        
        // Police hat or gangster cap
        if (this.type === 'police') {
            const hatGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2);
            const hatMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
            const hat = new THREE.Mesh(hatGeometry, hatMaterial);
            hat.position.y = 1.5;
            group.add(hat);
        } else {
            const capGeometry = new THREE.SphereGeometry(0.35, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.5);
            const capMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
            const cap = new THREE.Mesh(capGeometry, capMaterial);
            cap.position.y = 1.4;
            cap.rotation.x = Math.PI;
            group.add(cap);
        }
        
        // Arms
        const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8);
        const armMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(-0.6, 0.8, 0);
        leftArm.castShadow = true;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(0.6, 0.8, 0);
        rightArm.castShadow = true;
        group.add(rightArm);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8);
        const legMaterial = new THREE.MeshLambertMaterial({ 
            color: this.type === 'police' ? 0x0000ff : 0x000000 
        });
        
        const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        leftLeg.position.set(-0.2, -0.4, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        rightLeg.position.set(0.2, -0.4, 0);
        rightLeg.castShadow = true;
        group.add(rightLeg);
        
        // Weapon
        const weaponGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.8);
        const weaponMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
        weapon.position.set(0.7, 0.8, 0);
        weapon.rotation.z = Math.PI / 2;
        group.add(weapon);
        
        this.mesh = group;
        this.mesh.position.set(
            (Math.random() - 0.5) * 40,
            1,
            (Math.random() - 0.5) * 40
        );
    }
    
    getMaxHealth() {
        return this.type === 'police' ? 80 : 60;
    }
    
    getSpeed() {
        return this.type === 'police' ? 3 : 4;
    }
    
    setupAI() {
        this.aiTimer = 0;
        this.aiUpdateInterval = 0.1; // Update AI every 100ms
    }
    
    update(deltaTime) {
        this.aiTimer += deltaTime;
        
        if (this.aiTimer >= this.aiUpdateInterval) {
            this.updateAI();
            this.aiTimer = 0;
        }
        
        this.move(deltaTime);
        this.updateAnimation();
    }
    
    updateAI() {
        const player = this.game.player;
        if (!player) return;
        
        const distanceToPlayer = this.mesh.position.distanceTo(player.mesh.position);
        
        if (distanceToPlayer <= this.detectionRange) {
            if (distanceToPlayer <= this.attackRange) {
                this.state = 'attack';
                this.attack(player);
            } else {
                this.state = 'chase';
                this.chasePlayer(player);
            }
        } else {
            this.state = 'patrol';
            this.patrol();
        }
    }
    
    patrol() {
        const distanceToTarget = this.mesh.position.distanceTo(this.patrolTarget);
        
        if (distanceToTarget < 2) {
            this.patrolTarget = this.getRandomPatrolPoint();
        }
        
        this.moveTowards(this.patrolTarget);
    }
    
    chasePlayer(player) {
        this.moveTowards(player.mesh.position);
    }
    
    attack(player) {
        const currentTime = Date.now() / 1000;
        
        if (currentTime - this.lastAttackTime >= this.attackCooldown) {
            this.shootAtPlayer(player);
            this.lastAttackTime = currentTime;
        }
    }
    
    moveTowards(target) {
        const direction = new THREE.Vector3()
            .subVectors(target, this.mesh.position)
            .normalize();
        
        this.velocity.x = direction.x * this.speed;
        this.velocity.z = direction.z * this.speed;
        
        // Rotate to face movement direction
        if (direction.x !== 0 || direction.z !== 0) {
            this.mesh.rotation.y = Math.atan2(direction.x, direction.z);
        }
    }
    
    move(deltaTime) {
        this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));
        
        // Keep enemy in bounds
        this.mesh.position.x = Math.max(-25, Math.min(25, this.mesh.position.x));
        this.mesh.position.z = Math.max(-25, Math.min(25, this.mesh.position.z));
        
        // Apply gravity
        if (this.mesh.position.y > 1) {
            this.mesh.position.y -= 10 * deltaTime;
            if (this.mesh.position.y < 1) {
                this.mesh.position.y = 1;
            }
        }
    }
    
    updateAnimation() {
        // Simple walking animation
        if (this.velocity.length() > 0) {
            this.mesh.children[0].rotation.x = Math.sin(Date.now() * 0.01) * 0.1;
        }
    }
    
    shootAtPlayer(player) {
        const bullet = new EnemyBullet(
            this.mesh.position.clone(),
            this.mesh.rotation.y,
            this.type
        );
        this.game.bullets.push(bullet);
        this.game.scene.add(bullet.mesh);
    }
    
    takeDamage(damage) {
        this.health -= damage;
        
        // Flash red when hit
        this.mesh.children[0].material.color.setHex(0xff0000);
        setTimeout(() => {
            this.mesh.children[0].material.color.setHex(
                this.type === 'police' ? 0x0000ff : 0x800000
            );
        }, 100);
    }
    
    getRandomPatrolPoint() {
        return new THREE.Vector3(
            (Math.random() - 0.5) * 40,
            1,
            (Math.random() - 0.5) * 40
        );
    }
}

// Enemy Bullet class
export class EnemyBullet {
    constructor(position, direction, enemyType) {
        this.position = position.clone();
        this.direction = direction;
        this.speed = 15;
        this.damage = enemyType === 'police' ? 15 : 20;
        this.lifetime = 3;
        this.shouldRemove = false;
        
        this.createMesh();
    }
    
    createMesh() {
        const geometry = new THREE.SphereGeometry(0.08);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
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

// Civilian class
export class Civilian {
    constructor(position) {
        this.position = position.clone();
        this.speed = 1;
        this.direction = Math.random() * Math.PI * 2;
        this.changeDirectionTimer = 0;
        this.changeDirectionInterval = 3 + Math.random() * 5;
        
        this.createMesh();
    }
    
    createMesh() {
        const group = new THREE.Group();
        
        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1);
        const bodyMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(Math.random(), 0.3, 0.7) 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.5;
        body.castShadow = true;
        group.add(body);
        
        // Head
        const headGeometry = new THREE.SphereGeometry(0.25);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 1.1;
        head.castShadow = true;
        group.add(head);
        
        // Simple hair
        const hairGeometry = new THREE.SphereGeometry(0.28, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.4);
        const hairMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(Math.random(), 0.5, 0.3) 
        });
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.position.y = 1.15;
        hair.rotation.x = Math.PI;
        group.add(hair);
        
        this.mesh = group;
        this.mesh.position.copy(this.position);
    }
    
    update(deltaTime) {
        this.changeDirectionTimer += deltaTime;
        
        if (this.changeDirectionTimer >= this.changeDirectionInterval) {
            this.direction = Math.random() * Math.PI * 2;
            this.changeDirectionTimer = 0;
            this.changeDirectionInterval = 3 + Math.random() * 5;
        }
        
        // Move
        this.mesh.position.x += Math.sin(this.direction) * this.speed * deltaTime;
        this.mesh.position.z += Math.cos(this.direction) * this.speed * deltaTime;
        
        // Keep in bounds
        this.mesh.position.x = Math.max(-25, Math.min(25, this.mesh.position.x));
        this.mesh.position.z = Math.max(-25, Math.min(25, this.mesh.position.z));
        
        // Rotate to face movement direction
        this.mesh.rotation.y = this.direction;
    }
}
