import * as THREE from 'three';

export class Environment {
    constructor(game) {
        this.game = game;
        this.buildings = [];
        this.streets = [];
        this.vehicles = [];
        this.pedestrians = [];
        
        this.createGround();
        this.createBuildings();
        this.createStreets();
        this.createVehicles();
        this.createSkybox();
    }
    
    createGround() {
        // Main ground
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x404040 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.game.scene.add(ground);
        
        // Add some texture variation
        for (let i = 0; i < 20; i++) {
            const patchGeometry = new THREE.PlaneGeometry(5, 5);
            const patchMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL(0, 0, 0.2 + Math.random() * 0.1)
            });
            const patch = new THREE.Mesh(patchGeometry, patchMaterial);
            patch.rotation.x = -Math.PI / 2;
            patch.position.set(
                (Math.random() - 0.5) * 80,
                0.01,
                (Math.random() - 0.5) * 80
            );
            this.game.scene.add(patch);
        }
    }
    
    createBuildings() {
        // Create São Paulo-style buildings
        const buildingPositions = [
            { x: -20, z: -20, width: 8, height: 15 },
            { x: 20, z: -20, width: 6, height: 12 },
            { x: -20, z: 20, width: 10, height: 18 },
            { x: 20, z: 20, width: 7, height: 14 },
            { x: 0, z: -25, width: 12, height: 20 },
            { x: -25, z: 0, width: 8, height: 16 },
            { x: 25, z: 0, width: 9, height: 13 },
            { x: 0, z: 25, width: 11, height: 17 }
        ];
        
        buildingPositions.forEach(pos => {
            const building = this.createBuilding(pos.x, pos.z, pos.width, pos.height);
            this.buildings.push(building);
            this.game.scene.add(building);
        });
    }
    
    createBuilding(x, z, width, height) {
        const group = new THREE.Group();
        
        // Main building structure
        const buildingGeometry = new THREE.BoxGeometry(width, height, width);
        const buildingMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(0, 0, 0.3 + Math.random() * 0.3)
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.position.y = height / 2;
        building.castShadow = true;
        building.receiveShadow = true;
        group.add(building);
        
        // Windows
        for (let floor = 1; floor < height / 3; floor++) {
            for (let side = 0; side < 4; side++) {
                const windowGeometry = new THREE.PlaneGeometry(0.8, 1.2);
                const windowMaterial = new THREE.MeshBasicMaterial({ 
                    color: Math.random() < 0.3 ? 0xffff88 : 0x000033,
                    transparent: true,
                    opacity: 0.8
                });
                const window = new THREE.Mesh(windowGeometry, windowMaterial);
                
                const windowY = floor * 3 - height / 2 + 1.5;
                const windowDistance = width / 2 + 0.01;
                
                switch (side) {
                    case 0: // Front
                        window.position.set(0, windowY, windowDistance);
                        break;
                    case 1: // Back
                        window.position.set(0, windowY, -windowDistance);
                        window.rotation.y = Math.PI;
                        break;
                    case 2: // Left
                        window.position.set(-windowDistance, windowY, 0);
                        window.rotation.y = Math.PI / 2;
                        break;
                    case 3: // Right
                        window.position.set(windowDistance, windowY, 0);
                        window.rotation.y = -Math.PI / 2;
                        break;
                }
                
                group.add(window);
            }
        }
        
        // Roof
        const roofGeometry = new THREE.ConeGeometry(width * 0.7, 2);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = height + 1;
        roof.castShadow = true;
        group.add(roof);
        
        group.position.set(x, 0, z);
        return group;
    }
    
    createStreets() {
        // Main streets
        const streetGeometry = new THREE.PlaneGeometry(100, 4);
        const streetMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        
        // Horizontal street
        const horizontalStreet = new THREE.Mesh(streetGeometry, streetMaterial);
        horizontalStreet.rotation.x = -Math.PI / 2;
        horizontalStreet.position.y = 0.01;
        this.game.scene.add(horizontalStreet);
        
        // Vertical street
        const verticalStreet = new THREE.Mesh(streetGeometry, streetMaterial);
        verticalStreet.rotation.x = -Math.PI / 2;
        verticalStreet.rotation.z = Math.PI / 2;
        verticalStreet.position.y = 0.01;
        this.game.scene.add(verticalStreet);
        
        // Street markings
        this.createStreetMarkings();
    }
    
    createStreetMarkings() {
        // White lines on streets
        const lineGeometry = new THREE.PlaneGeometry(0.2, 2);
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        // Horizontal lines
        for (let i = -40; i <= 40; i += 4) {
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.rotation.x = -Math.PI / 2;
            line.position.set(i, 0.02, 0);
            this.game.scene.add(line);
        }
        
        // Vertical lines
        for (let i = -40; i <= 40; i += 4) {
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.rotation.x = -Math.PI / 2;
            line.rotation.z = Math.PI / 2;
            line.position.set(0, 0.02, i);
            this.game.scene.add(line);
        }
    }
    
    createVehicles() {
        // Create some parked cars
        const carPositions = [
            { x: -15, z: -15, color: 0xff0000 },
            { x: 15, z: -15, color: 0x0000ff },
            { x: -15, z: 15, color: 0x00ff00 },
            { x: 15, z: 15, color: 0xffff00 },
            { x: 0, z: -20, color: 0xff8800 },
            { x: -20, z: 0, color: 0x8800ff },
            { x: 20, z: 0, color: 0x00ffff },
            { x: 0, z: 20, color: 0xff0088 }
        ];
        
        carPositions.forEach(pos => {
            const car = this.createCar(pos.x, pos.z, pos.color);
            this.vehicles.push(car);
            this.game.scene.add(car);
        });
    }
    
    createCar(x, z, color) {
        const group = new THREE.Group();
        
        // Car body
        const bodyGeometry = new THREE.BoxGeometry(2, 0.8, 4);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: color });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0.4;
        body.castShadow = true;
        group.add(body);
        
        // Car roof
        const roofGeometry = new THREE.BoxGeometry(1.6, 0.6, 2.5);
        const roofMaterial = new THREE.MeshLambertMaterial({ color: color * 0.8 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 1;
        roof.castShadow = true;
        group.add(roof);
        
        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2);
        const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
        
        const positions = [
            { x: -0.7, z: 1.2 },
            { x: 0.7, z: 1.2 },
            { x: -0.7, z: -1.2 },
            { x: 0.7, z: -1.2 }
        ];
        
        positions.forEach(pos => {
            const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
            wheel.position.set(pos.x, 0.3, pos.z);
            wheel.rotation.z = Math.PI / 2;
            wheel.castShadow = true;
            group.add(wheel);
        });
        
        group.position.set(x, 0, z);
        return group;
    }
    
    createSkybox() {
        // Create a simple skybox
        const skyGeometry = new THREE.SphereGeometry(200, 32, 32);
        const skyMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x87CEEB,
            side: THREE.BackSide
        });
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.game.scene.add(sky);
    }
    
    update(deltaTime) {
        // Update any animated elements
        this.vehicles.forEach(vehicle => {
            // Simple idle animation
            vehicle.rotation.y += Math.sin(Date.now() * 0.001) * 0.001;
        });
    }
    
    updateTimeOfDay(timeOfDay) {
        // Update environment based on time of day
        if (timeOfDay > 0.5) {
            // Night time - turn on building lights
            this.buildings.forEach(building => {
                building.children.forEach(child => {
                    if (child.material && child.material.color) {
                        if (Math.random() < 0.7) {
                            child.material.color.setHex(0xffff88);
                        }
                    }
                });
            });
        }
    }
}

// Particle system for effects
export class ParticleSystem {
    constructor(game) {
        this.game = game;
        this.particles = [];
    }
    
    createExplosion(position) {
        for (let i = 0; i < 20; i++) {
            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(0.1),
                new THREE.MeshBasicMaterial({ 
                    color: new THREE.Color().setHSL(Math.random() * 0.1, 1, 0.5)
                })
            );
            
            particle.position.copy(position);
            particle.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                Math.random() * 5,
                (Math.random() - 0.5) * 10
            );
            particle.lifetime = 1;
            
            this.particles.push(particle);
            this.game.scene.add(particle);
        }
    }
    
    update(deltaTime) {
        this.particles.forEach((particle, index) => {
            particle.position.add(particle.velocity.clone().multiplyScalar(deltaTime));
            particle.velocity.y -= 10 * deltaTime; // Gravity
            particle.lifetime -= deltaTime;
            
            if (particle.lifetime <= 0) {
                this.game.scene.remove(particle);
                this.particles.splice(index, 1);
            }
        });
    }
}
