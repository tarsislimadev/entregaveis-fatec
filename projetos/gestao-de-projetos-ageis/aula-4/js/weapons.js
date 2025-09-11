import * as THREE from 'three';

export class Weapon {
    constructor(type, position) {
        this.type = type;
        this.position = position;
        this.createMesh();
    }
    
    createMesh() {
        const group = new THREE.Group();
        
        // Base weapon shape
        let weaponGeometry, weaponMaterial;
        
        switch (this.type) {
            case 'pistol':
                weaponGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.8);
                weaponMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
                break;
            case 'shotgun':
                weaponGeometry = new THREE.BoxGeometry(0.3, 0.2, 1.2);
                weaponMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
                break;
            case 'rifle':
                weaponGeometry = new THREE.BoxGeometry(0.15, 0.1, 1.5);
                weaponMaterial = new THREE.MeshLambertMaterial({ color: 0x222222 });
                break;
            case 'machinegun':
                weaponGeometry = new THREE.BoxGeometry(0.2, 0.15, 1.8);
                weaponMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
                break;
            default:
                weaponGeometry = new THREE.BoxGeometry(0.2, 0.1, 0.8);
                weaponMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        }
        
        const weapon = new THREE.Mesh(weaponGeometry, weaponMaterial);
        weapon.castShadow = true;
        group.add(weapon);
        
        // Weapon glow effect
        const glowGeometry = new THREE.SphereGeometry(0.5);
        const glowMaterial = new THREE.MeshBasicMaterial({ 
            color: this.getWeaponColor(),
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        
        // Floating animation
        this.originalY = this.position.y;
        this.floatSpeed = 2;
        this.floatAmplitude = 0.3;
        
        this.mesh = group;
        this.mesh.position.copy(this.position);
    }
    
    getWeaponColor() {
        const colors = {
            'pistol': 0x00ff00,
            'shotgun': 0xff8800,
            'rifle': 0x0088ff,
            'machinegun': 0xff0088
        };
        return colors[this.type] || 0x00ff00;
    }
    
    update(deltaTime) {
        // Floating animation
        this.mesh.position.y = this.originalY + Math.sin(Date.now() * 0.005 * this.floatSpeed) * this.floatAmplitude;
        
        // Rotation
        this.mesh.rotation.y += deltaTime;
    }
}

export class Medicine {
    constructor(position) {
        this.position = position;
        this.createMesh();
    }
    
    createMesh() {
        const group = new THREE.Group();
        
        // Medicine bottle
        const bottleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.6);
        const bottleMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x00ff00,
            transparent: true,
            opacity: 0.8
        });
        const bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
        bottle.castShadow = true;
        group.add(bottle);
        
        // Cross symbol
        const crossGeometry = new THREE.PlaneGeometry(0.3, 0.3);
        const crossMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.9
        });
        const cross = new THREE.Mesh(crossGeometry, crossMaterial);
        cross.position.z = 0.21;
        group.add(cross);
        
        // Glow effect
        const glowGeometry = new THREE.SphereGeometry(0.4);
        const glowMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true,
            opacity: 0.2
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);
        
        // Floating animation
        this.originalY = this.position.y;
        this.floatSpeed = 1.5;
        this.floatAmplitude = 0.2;
        
        this.mesh = group;
        this.mesh.position.copy(this.position);
    }
    
    update(deltaTime) {
        // Floating animation
        this.mesh.position.y = this.originalY + Math.sin(Date.now() * 0.005 * this.floatSpeed) * this.floatAmplitude;
        
        // Rotation
        this.mesh.rotation.y += deltaTime * 0.5;
    }
}

// Weapon spawner system
export class WeaponSpawner {
    constructor(game) {
        this.game = game;
        this.spawnTimer = 0;
        this.spawnInterval = 30; // Spawn weapon every 30 seconds
        this.weaponTypes = ['pistol', 'shotgun', 'rifle', 'machinegun'];
    }
    
    update(deltaTime) {
        this.spawnTimer += deltaTime;
        
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnWeapon();
            this.spawnTimer = 0;
        }
    }
    
    spawnWeapon() {
        const weaponType = this.weaponTypes[Math.floor(Math.random() * this.weaponTypes.length)];
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * 40,
            1,
            (Math.random() - 0.5) * 40
        );
        
        const weapon = new Weapon(weaponType, position);
        this.game.weapons.push(weapon);
        this.game.scene.add(weapon.mesh);
    }
}

// Medicine spawner system
export class MedicineSpawner {
    constructor(game) {
        this.game = game;
        this.spawnTimer = 0;
        this.spawnInterval = 45; // Spawn medicine every 45 seconds
    }
    
    update(deltaTime) {
        this.spawnTimer += deltaTime;
        
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnMedicine();
            this.spawnTimer = 0;
        }
    }
    
    spawnMedicine() {
        const position = new THREE.Vector3(
            (Math.random() - 0.5) * 40,
            1,
            (Math.random() - 0.5) * 40
        );
        
        const medicine = new Medicine(position);
        this.game.medicines.push(medicine);
        this.game.scene.add(medicine.mesh);
    }
}
