import * as THREE from 'three';
import { WeaponSystem } from './weapons.js';

export class Player {
    constructor(scene, game) {
        this.scene = scene;
        this.game = game;
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 200;
        this.jumpPower = 300;
        this.isGrounded = false;
        this.velocity = { x: 0, y: 0 };
        this.facingRight = true;
        
        this.createMesh();
        this.setupPhysics();
        
        // Initialize weapon system
        this.weaponSystem = new WeaponSystem(game);
    }
    
    createMesh() {
        // Create player geometry (simple character)
        const geometry = new THREE.BoxGeometry(20, 40, 10);
        const material = new THREE.MeshLambertMaterial({ 
            color: 0x0066cc,
            transparent: true,
            opacity: 0.9
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(-200, 0, 0);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        
        // Add player details
        this.addPlayerDetails();
        
        this.scene.add(this.mesh);
    }
    
    addPlayerDetails() {
        // Head
        const headGeometry = new THREE.SphereGeometry(8, 8, 6);
        const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
        this.head = new THREE.Mesh(headGeometry, headMaterial);
        this.head.position.set(0, 15, 0);
        this.head.castShadow = true;
        this.mesh.add(this.head);
        
        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(1, 8, 6);
        const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        this.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.leftEye.position.set(-3, 17, 6);
        this.mesh.add(this.leftEye);
        
        this.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        this.rightEye.position.set(3, 17, 6);
        this.mesh.add(this.rightEye);
        
        // Arms
        const armGeometry = new THREE.BoxGeometry(6, 20, 6);
        const armMaterial = new THREE.MeshLambertMaterial({ color: 0x0066cc });
        
        this.leftArm = new THREE.Mesh(armGeometry, armMaterial);
        this.leftArm.position.set(-15, 0, 0);
        this.leftArm.castShadow = true;
        this.mesh.add(this.leftArm);
        
        this.rightArm = new THREE.Mesh(armGeometry, armMaterial);
        this.rightArm.position.set(15, 0, 0);
        this.rightArm.castShadow = true;
        this.mesh.add(this.rightArm);
        
        // Legs
        const legGeometry = new THREE.BoxGeometry(8, 20, 8);
        const legMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        
        this.leftLeg = new THREE.Mesh(legGeometry, legMaterial);
        this.leftLeg.position.set(-6, -25, 0);
        this.leftLeg.castShadow = true;
        this.mesh.add(this.leftLeg);
        
        this.rightLeg = new THREE.Mesh(legGeometry, legMaterial);
        this.rightLeg.position.set(6, -25, 0);
        this.rightLeg.castShadow = true;
        this.mesh.add(this.rightLeg);
    }
    
    setupPhysics() {
        this.gravity = -800;
        this.groundY = -window.innerHeight / 2 + 50;
    }
    
    update(deltaTime, keys) {
        this.handleInput(keys, deltaTime);
        this.applyPhysics(deltaTime);
        this.updateAnimation();
    }
    
    handleInput(keys, deltaTime) {
        // Horizontal movement
        if (keys['KeyA'] || keys['ArrowLeft']) {
            this.velocity.x = -this.speed;
            this.facingRight = false;
        } else if (keys['KeyD'] || keys['ArrowRight']) {
            this.velocity.x = this.speed;
            this.facingRight = true;
        } else {
            this.velocity.x *= 0.8; // Friction
        }
        
        // Vertical movement (jumping)
        if ((keys['KeyW'] || keys['ArrowUp']) && this.isGrounded) {
            this.velocity.y = this.jumpPower;
            this.isGrounded = false;
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
        
        // Keep player in bounds
        const halfWidth = window.innerWidth / 2;
        if (this.mesh.position.x < -halfWidth + 50) {
            this.mesh.position.x = -halfWidth + 50;
        }
        if (this.mesh.position.x > halfWidth - 50) {
            this.mesh.position.x = halfWidth - 50;
        }
    }
    
    updateAnimation() {
        // Simple walking animation
        if (Math.abs(this.velocity.x) > 10) {
            const time = Date.now() * 0.01;
            this.leftLeg.rotation.x = Math.sin(time) * 0.3;
            this.rightLeg.rotation.x = -Math.sin(time) * 0.3;
            this.leftArm.rotation.x = -Math.sin(time) * 0.2;
            this.rightArm.rotation.x = Math.sin(time) * 0.2;
        } else {
            this.leftLeg.rotation.x = 0;
            this.rightLeg.rotation.x = 0;
            this.leftArm.rotation.x = 0;
            this.rightArm.rotation.x = 0;
        }
        
        // Face direction
        this.mesh.scale.x = this.facingRight ? 1 : -1;
    }
    
    jump() {
        if (this.isGrounded) {
            this.velocity.y = this.jumpPower;
            this.isGrounded = false;
        }
    }
    
    shoot() {
        if (this.weaponSystem) {
            return this.weaponSystem.fire(this);
        }
        return false;
    }
    
    takeDamage(damage) {
        this.health -= damage;
        this.game.health = this.health;
        
        // Flash effect
        this.mesh.material.color.setHex(0xff0000);
        setTimeout(() => {
            this.mesh.material.color.setHex(0x0066cc);
        }, 100);
        
        if (this.health <= 0) {
            this.health = 0;
        }
    }
}

