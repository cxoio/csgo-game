// map.js - de_dust2 Map Generator

class Dust2Map {
    constructor(scene) {
        this.scene = scene;
        this.mapSize = 200;
        this.buildMap();
    }

    buildMap() {
        // Ground/Floor
        this.createFloor();
        
        // Main structures
        this.createBombSiteA();
        this.createBombSiteB();
        this.createMiddleArea();
        this.createTerroristSpawn();
        this.createCTSpawn();
        this.createWalls();
        this.createLighting();
    }

    createFloor() {
        const floorGeometry = new THREE.PlaneGeometry(this.mapSize, this.mapSize);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    createBombSiteA() {
        // Site A structure
        const siteAGeometry = new THREE.BoxGeometry(40, 3, 40);
        const siteAMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const siteA = new THREE.Mesh(siteAGeometry, siteAMaterial);
        siteA.position.set(-60, 1, 60);
        siteA.castShadow = true;
        this.scene.add(siteA);

        // Walls around A
        this.createWall(siteA.position.x - 20, siteA.position.z - 20, 40, 15);
        this.createWall(siteA.position.x + 20, siteA.position.z - 20, 40, 15);
    }

    createBombSiteB() {
        // Site B structure
        const siteBGeometry = new THREE.BoxGeometry(40, 3, 40);
        const siteBMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const siteB = new THREE.Mesh(siteBGeometry, siteBMaterial);
        siteB.position.set(60, 1, -60);
        siteB.castShadow = true;
        this.scene.add(siteB);

        // Walls around B
        this.createWall(siteB.position.x - 20, siteB.position.z + 20, 40, 15);
        this.createWall(siteB.position.x + 20, siteB.position.z + 20, 40, 15);
    }

    createMiddleArea() {
        // Center structure
        const midGeometry = new THREE.BoxGeometry(30, 4, 30);
        const midMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
        const middle = new THREE.Mesh(midGeometry, midMaterial);
        middle.position.set(0, 2, 0);
        middle.castShadow = true;
        this.scene.add(middle);
    }

    createTerroristSpawn() {
        // Terrorist spawn area
        const spawnGeometry = new THREE.BoxGeometry(50, 1, 30);
        const spawnMaterial = new THREE.MeshLambertMaterial({ color: 0xFF6347 });
        const spawn = new THREE.Mesh(spawnGeometry, spawnMaterial);
        spawn.position.set(-90, 0.5, 0);
        this.scene.add(spawn);
    }

    createCTSpawn() {
        // Counter-Terrorist spawn area
        const spawnGeometry = new THREE.BoxGeometry(50, 1, 30);
        const spawnMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
        const spawn = new THREE.Mesh(spawnGeometry, spawnMaterial);
        spawn.position.set(90, 0.5, 0);
        this.scene.add(spawn);
    }

    createWalls() {
        // Boundary walls
        const wallHeight = 20;
        const wallThickness = 2;

        // North wall
        this.createWall(0, -this.mapSize / 2, this.mapSize, wallHeight);
        // South wall
        this.createWall(0, this.mapSize / 2, this.mapSize, wallHeight);
        // East wall
        this.createWall(this.mapSize / 2, 0, wallThickness, wallHeight);
        // West wall
        this.createWall(-this.mapSize / 2, 0, wallThickness, wallHeight);
    }

    createWall(x, z, width, height) {
        const wallGeometry = new THREE.BoxGeometry(width, height, 2);
        const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x696969 });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(x, height / 2, z);
        wall.castShadow = true;
        this.scene.add(wall);
    }

    createLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 100);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Fog for atmosphere
        this.scene.fog = new THREE.Fog(0xcccccc, 500, 1000);
    }
}