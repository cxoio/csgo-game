// input.js - Input and Control Handler

class InputController {
    constructor(camera, player) {
        this.camera = camera;
        this.player = player;
        this.keys = {};
        this.mouse = { x: 0, y: 0, locked: false };
        this.isAiming = false;
        this.isShooting = false;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));

        // Mouse events
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', (e) => this.onMouseUp(e));

        // Pointer lock
        document.addEventListener('pointerlockchange', () => this.onPointerLockChange());
        document.addEventListener('pointerlockerror', () => console.error('Pointer lock error'));

        // Request pointer lock on canvas click
        document.getElementById('gameCanvas').addEventListener('click', () => {
            document.getElementById('gameCanvas').requestPointerLock =
                document.getElementById('gameCanvas').requestPointerLock ||
                document.getElementById('gameCanvas').mozRequestPointerLock;
            document.getElementById('gameCanvas').requestPointerLock();
        });
    }

    onKeyDown(event) {
        const key = event.key.toUpperCase();
        this.keys[key] = true;

        // Handle specific actions
        if (key === 'R') {
            this.reload();
        }
        if (key === 'E') {
            this.interact();
        }
    }

    onKeyUp(event) {
        const key = event.key.toUpperCase();
        this.keys[key] = false;
    }

    onMouseMove(event) {
        if (this.mouse.locked) {
            const movementX = event.movementX || event.mozMovementX || 0;
            const movementY = event.movementY || event.mozMovementY || 0;

            // Adjust camera rotation based on mouse movement
            const sensitivity = 0.005;
            this.camera.rotation.order = 'YXZ';
            this.camera.rotation.y -= movementX * sensitivity;
            this.camera.rotation.x -= movementY * sensitivity;

            // Clamp vertical rotation
            this.camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.camera.rotation.x));
        }
    }

    onMouseDown(event) {
        if (event.button === 0) { // LMB - Shoot
            this.isShooting = true;
        }
        if (event.button === 2) { // RMB - Aim
            this.isAiming = true;
        }
    }

    onMouseUp(event) {
        if (event.button === 0) {
            this.isShooting = false;
        }
        if (event.button === 2) {
            this.isAiming = false;
        }
    }

    onPointerLockChange() {
        if (document.pointerLockElement === document.getElementById('gameCanvas') ||
            document.mozPointerLockElement === document.getElementById('gameCanvas')) {
            this.mouse.locked = true;
        } else {
            this.mouse.locked = false;
        }
    }

    handleMovement(speed = 0.5) {
        const direction = new THREE.Vector3();
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.camera.quaternion);

        if (this.keys['W']) direction.addScaledVector(forward, speed);
        if (this.keys['S']) direction.addScaledVector(forward, -speed);
        if (this.keys['A']) direction.addScaledVector(right, -speed);
        if (this.keys['D']) direction.addScaledVector(right, speed);

        this.player.position.add(direction);
    }

    shoot() {
        if (this.isShooting) {
            console.log('BANG! Shooting...');
        }
    }

    reload() {
        console.log('Reloading weapon...');
    }

    interact() {
        console.log('Interacting with object...');
    }

    update() {
        this.handleMovement();
        this.shoot();
    }
}