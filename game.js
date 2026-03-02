// game.js - Main Game Loop and Initialization

let scene, camera, renderer, player, inputController, gameState, dust2Map;
let lastTime = Date.now();

function init() {
    try {
        // Initialize Three.js Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcccccc);

        // Initialize Camera
        const canvas = document.getElementById('gameCanvas');
        camera = new THREE.PerspectiveCamera(
            75,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            2000
        );
        camera.position.set(0, 5, 0);

        // Initialize Renderer
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true 
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.shadowMap.enabled = true;

        // Create Player
        const playerGeometry = new THREE.CapsuleGeometry(0.5, 1.8, 4, 8);
        const playerMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
        player = new THREE.Mesh(playerGeometry, playerMaterial);
        player.position.set(90, 2, 0);
        player.castShadow = true;

        camera.position.copy(player.position);
        camera.position.y += 1.6;

        // Initialize Game State
        gameState = new GameState();
        
        // Initialize Input Controller
        inputController = new InputController(camera, player);

        // Setup Menu Event Listeners
        setupMenuListeners();

        window.addEventListener('resize', onWindowResize);

        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

function setupMenuListeners() {
    try {
        document.getElementById('playBtn').addEventListener('click', () => {
            gameState.startGame();
        });

        document.getElementById('terroristBtn').addEventListener('click', () => {
            gameState.selectTeam('terrorist');
            startGameLoop();
        });

        document.getElementById('ctBtn').addEventListener('click', () => {
            gameState.selectTeam('counter-terrorist');
            startGameLoop();
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            alert('Settings menu coming soon!');
        });

        document.getElementById('aboutBtn').addEventListener('click', () => {
            alert('CS:GO 3D Game - de_dust2 Map\nVersion 1.0\nCreated with Three.js');
        });
    } catch (error) {
        console.error('Menu setup error:', error);
    }
}

function startGameLoop() {
    try {
        dust2Map = new Dust2Map(scene);
        
        if (gameState.playerTeam === 'terrorist') {
            player.position.set(-90, 2, 0);
        } else {
            player.position.set(90, 2, 0);
        }

        camera.position.copy(player.position);
        camera.position.y += 1.6;

        scene.add(player);

        animate();
    } catch (error) {
        console.error('Game loop error:', error);
    }
}

function animate() {
    try {
        requestAnimationFrame(animate);

        const currentTime = Date.now();
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        gameState.update(deltaTime);

        if (inputController) {
            inputController.update();
        }

        const targetCameraPos = new THREE.Vector3(
            player.position.x,
            player.position.y + 1.6,
            player.position.z
        );
        camera.position.lerp(targetCameraPos, 0.1);

        if (gameState.bots) {
            gameState.bots.forEach(bot => {
                bot.decideAction();
            });
        }

        renderer.render(scene, camera);
    } catch (error) {
        console.error('Animation loop error:', error);
    }
}

function onWindowResize() {
    try {
        const canvas = document.getElementById('gameCanvas');
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    } catch (error) {
        console.error('Resize error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        init();
    } catch (error) {
        console.error('DOMContentLoaded error:', error);
    }
});

window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});