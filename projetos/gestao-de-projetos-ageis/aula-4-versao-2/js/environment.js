import * as THREE from 'three';

export class Environment {
    constructor(scene) {
        this.scene = scene;
        this.parallaxLayers = [];
    }
    
    createRioBackground() {
        this.createSky();
        this.createMountains();
        this.createCityscape();
        this.createGround();
        this.createClouds();
        this.createFavela();
    }
    
    createSky() {
        // Create gradient sky for morning
        const skyGeometry = new THREE.PlaneGeometry(window.innerWidth * 2, window.innerHeight * 2);
        const skyMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x87CEEB, // Sky blue
            side: THREE.DoubleSide
        });
        
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        sky.position.set(0, 0, -100);
        this.scene.add(sky);
        
        // Add sun
        const sunGeometry = new THREE.CircleGeometry(30, 16);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffd700,
            emissive: 0xffaa00
        });
        
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.set(window.innerWidth / 3, window.innerHeight / 3, -50);
        this.scene.add(sun);
    }
    
    createMountains() {
        // Create Corcovado (Christ the Redeemer mountain)
        const mountainGeometry = new THREE.ConeGeometry(80, 200, 8);
        const mountainMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x228B22, // Forest green
            transparent: true,
            opacity: 0.8
        });
        
        const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
        mountain.position.set(window.innerWidth / 2 - 100, -window.innerHeight / 2 + 100, -80);
        mountain.castShadow = true;
        this.scene.add(mountain);
        
        // Add Christ the Redeemer statue
        const statueGeometry = new THREE.CylinderGeometry(2, 2, 40, 8);
        const statueMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc });
        
        const statue = new THREE.Mesh(statueGeometry, statueMaterial);
        statue.position.set(window.innerWidth / 2 - 100, -window.innerHeight / 2 + 200, -75);
        statue.castShadow = true;
        this.scene.add(statue);
        
        // Add arms (cross shape)
        const armGeometry = new THREE.BoxGeometry(20, 4, 4);
        const armMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc });
        
        const leftArm = new THREE.Mesh(armGeometry, armMaterial);
        leftArm.position.set(window.innerWidth / 2 - 120, -window.innerHeight / 2 + 200, -75);
        leftArm.castShadow = true;
        this.scene.add(leftArm);
        
        const rightArm = new THREE.Mesh(armGeometry, armMaterial);
        rightArm.position.set(window.innerWidth / 2 - 80, -window.innerHeight / 2 + 200, -75);
        rightArm.castShadow = true;
        this.scene.add(rightArm);
    }
    
    createCityscape() {
        // Create Rio de Janeiro city buildings
        const buildingColors = [0x4169E1, 0x1E90FF, 0x00BFFF, 0x87CEEB, 0xB0C4DE];
        
        for (let i = 0; i < 15; i++) {
            const height = 80 + Math.random() * 120;
            const width = 30 + Math.random() * 40;
            const buildingGeometry = new THREE.BoxGeometry(width, height, 20);
            const buildingMaterial = new THREE.MeshLambertMaterial({ 
                color: buildingColors[Math.floor(Math.random() * buildingColors.length)]
            });
            
            const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
            building.position.set(
                -window.innerWidth / 2 + i * 60 + Math.random() * 20,
                -window.innerHeight / 2 + height / 2,
                -60
            );
            building.castShadow = true;
            building.receiveShadow = true;
            this.scene.add(building);
            
            // Add windows
            this.addWindows(building, width, height);
        }
    }
    
    addWindows(building, width, height) {
        const windowGeometry = new THREE.BoxGeometry(3, 4, 0.5);
        const windowMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffff88,
            emissive: 0x444400
        });
        
        const rows = Math.floor(height / 15);
        const cols = Math.floor(width / 8);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() > 0.3) { // Not all windows are lit
                    const window = new THREE.Mesh(windowGeometry, windowMaterial);
                    window.position.set(
                        -width / 2 + col * 8 + 4,
                        -height / 2 + row * 15 + 7.5,
                        10.5
                    );
                    building.add(window);
                }
            }
        }
    }
    
    createGround() {
        // Create street/ground
        const groundGeometry = new THREE.PlaneGeometry(window.innerWidth * 2, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x696969, // Dim gray for asphalt
            transparent: true,
            opacity: 0.9
        });
        
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.position.set(0, -window.innerHeight / 2 + 50, 0);
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        // Add street lines
        this.addStreetLines();
        
        // Add some street furniture
        this.addStreetFurniture();
    }
    
    addStreetLines() {
        const lineGeometry = new THREE.PlaneGeometry(200, 2);
        const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        for (let i = 0; i < 10; i++) {
            const line = new THREE.Mesh(lineGeometry, lineMaterial);
            line.position.set(
                -window.innerWidth + i * 200,
                -window.innerHeight / 2 + 50,
                1
            );
            this.scene.add(line);
        }
    }
    
    addStreetFurniture() {
        // Add some palm trees
        for (let i = 0; i < 5; i++) {
            this.createPalmTree(
                -window.innerWidth / 2 + i * 200 + Math.random() * 100,
                -window.innerHeight / 2 + 50
            );
        }
        
        // Add some street lights
        for (let i = 0; i < 8; i++) {
            this.createStreetLight(
                -window.innerWidth / 2 + i * 150,
                -window.innerHeight / 2 + 50
            );
        }
    }
    
    createPalmTree(x, y) {
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(3, 5, 40, 8);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(x, y + 20, -20);
        trunk.castShadow = true;
        this.scene.add(trunk);
        
        // Leaves
        const leavesGeometry = new THREE.SphereGeometry(15, 8, 6);
        const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(x, y + 45, -20);
        leaves.castShadow = true;
        this.scene.add(leaves);
    }
    
    createStreetLight(x, y) {
        // Pole
        const poleGeometry = new THREE.CylinderGeometry(1, 1, 30, 8);
        const poleMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const pole = new THREE.Mesh(poleGeometry, poleMaterial);
        pole.position.set(x, y + 15, -10);
        pole.castShadow = true;
        this.scene.add(pole);
        
        // Light
        const lightGeometry = new THREE.SphereGeometry(3, 8, 6);
        const lightMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffff88,
            emissive: 0x444400
        });
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.set(x, y + 30, -10);
        this.scene.add(light);
    }
    
    createClouds() {
        // Add some morning clouds
        for (let i = 0; i < 8; i++) {
            this.createCloud(
                -window.innerWidth / 2 + Math.random() * window.innerWidth,
                window.innerHeight / 4 + Math.random() * window.innerHeight / 2
            );
        }
    }
    
    createCloud(x, y) {
        const cloudGeometry = new THREE.SphereGeometry(20, 8, 6);
        const cloudMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(x, y, -90);
        this.scene.add(cloud);
        
        // Add smaller cloud parts
        for (let i = 0; i < 3; i++) {
            const partGeometry = new THREE.SphereGeometry(15, 8, 6);
            const part = new THREE.Mesh(partGeometry, cloudMaterial);
            part.position.set(
                x + (Math.random() - 0.5) * 40,
                y + (Math.random() - 0.5) * 20,
                -90
            );
            this.scene.add(part);
        }
    }
    
    createFavela() {
        // Create favela houses on the hills
        for (let i = 0; i < 20; i++) {
            const houseGeometry = new THREE.BoxGeometry(
                15 + Math.random() * 10,
                20 + Math.random() * 15,
                8
            );
            const houseMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL(0.1, 0.3, 0.4 + Math.random() * 0.3)
            });
            
            const house = new THREE.Mesh(houseGeometry, houseMaterial);
            house.position.set(
                -window.innerWidth / 2 + Math.random() * window.innerWidth,
                -window.innerHeight / 2 + 50 + Math.random() * 100,
                -40
            );
            house.castShadow = true;
            this.scene.add(house);
        }
    }
}
