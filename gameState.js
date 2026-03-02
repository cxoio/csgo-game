// gameState.js - Game State Manager

class GameState {
    constructor() {
        this.currentState = 'MENU';
        this.playerTeam = null;
        this.playerHealth = 100;
        this.playerArmor = 0;
        this.playerMoney = 2400;
        this.currentWeapon = 'Glock';
        this.ammo = { current: 20, reserve: 120 };
        this.round = 1;
        this.roundTime = 0;
        this.gameTime = 0;
        this.score = { terrorists: 0, counterTerrorists: 0 };
        this.bots = [];
    }

    startGame() {
        this.currentState = 'TEAM_SELECT';
        this.showTeamSelection();
    }

    showTeamSelection() {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('teamMenu').style.display = 'block';
    }

    selectTeam(team) {
        this.playerTeam = team;
        this.currentState = 'PLAYING';
        this.hideMenus();
        this.showGameHUD();
        this.initializeGame();
    }

    hideMenus() {
        document.getElementById('mainMenu').style.display = 'none';
        document.getElementById('teamMenu').style.display = 'none';
    }

    showGameHUD() {
        document.getElementById('gameHUD').style.display = 'block';
        document.getElementById('controlsInfo').style.display = 'block';
    }

    updateHUD() {
        document.getElementById('teamDisplay').textContent = this.playerTeam.toUpperCase();
        document.getElementById('roundDisplay').textContent = this.round;
        document.getElementById('healthDisplay').textContent = this.playerHealth;
        document.getElementById('armorDisplay').textContent = this.playerArmor;
        document.getElementById('moneyDisplay').textContent = this.playerMoney;
        document.getElementById('currentWeapon').textContent = this.currentWeapon;
        document.getElementById('ammoCount').textContent = this.ammo.current + '/' + this.ammo.reserve;
    }

    takeDamage(amount) {
        if (this.playerArmor > 0) {
            const armorDamage = Math.min(this.playerArmor, amount * 0.75);
            this.playerArmor -= armorDamage;
            this.playerHealth -= (amount - armorDamage);
        } else {
            this.playerHealth -= amount;
        }

        if (this.playerHealth <= 0) {
            this.playerDied();
        }
    }

    playerDied() {
        console.log('You have been eliminated!');
        this.currentState = 'SPECTATING';
    }

    changeWeapon(weaponName) {
        this.currentWeapon = weaponName;
    }

    reloadWeapon() {
        if (this.ammo.reserve > 0) {
            const reloadAmount = Math.min(30, this.ammo.reserve);
            this.ammo.current = reloadAmount;
            this.ammo.reserve -= reloadAmount;
        }
    }

    addBots(count, team) {
        for (let i = 0; i < count; i++) {
            const bot = new AIBot(team);
            this.bots.push(bot);
        }
    }

    initializeGame() {
        this.addBots(5, 'terrorist');
        this.addBots(5, 'counter-terrorist');
    }

    update(deltaTime) {
        this.gameTime += deltaTime;
        this.roundTime += deltaTime;
        this.updateHUD();

        if (this.roundTime > 45) {
            this.endRound();
        }
    }

    endRound() {
        console.log('Round ended!');
        this.round++;
        this.roundTime = 0;
        this.playerHealth = 100;
        this.playerArmor = 0;
        this.playerMoney += 500;
    }
}