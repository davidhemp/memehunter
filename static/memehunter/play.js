var playState = {
    create: function(){
        game.add.plugin(PhaserInput.Plugin);
        // Stage setting
        game.stage.backgroundColor = levelData[level].backgroundColor;
        background = game.add.sprite(game.world.centerX,
                                    game.world.centerY,
                                    levelData[level].background);
        background.anchor.setTo(0.5);
        // Player set up
        player = game.add.sprite(50, 500, 'desk');
        player.anchor.setTo(0.5, 1);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        this.speed = 400;
        this.lives = 5;
        this.score = 0;
        // Player bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        //control keys
        cursors = game.input.keyboard.createCursorKeys();
        wasd = {
          up: game.input.keyboard.addKey(Phaser.Keyboard.W),
          down: game.input.keyboard.addKey(Phaser.Keyboard.S),
          left: game.input.keyboard.addKey(Phaser.Keyboard.A),
          right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //enemy init
        enemies = game.add.group();
        enemies.enableBody = true;
        enemies.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i =0; i < levelData[level].enms.length; i++){
            for (var j = 0; j <3; j++){
                enemies.add(new Enemy(game,
                                      levelData[level].enms[i],
                                      level,
                                      levelData[level].enemybullets[i]));
            }
        }
        enemies.shuffle();
        enemies.callAll('kill');
        enemyBullets = game.add.group();
        if (settings.difficulty){
            this.enemySpawnDelta = 1000;
            this.enemyFireDelta = 2000;
        } else {
            this.enemySpawnDelta = 2000;
            this.enemyFireDelta = 3000;
        }
        this.enemySpawnTime = game.time.now;
        this.bulletFireTime = game.time.now;
        this.enemyFireTime = game.time.now;
        this.startTime = game.time.now;
        this.timedelta = 10000;
        this.time = 0;
        //UI setup
        liveLabel = game.add.text(50,50, "Lives: " + this.lives, style);
        scoreLabel = game.add.text(50,100, "pages: " + this.score, style);
        timeLabel = game.add.text(50,150, "Time: " + this.time, style);
        warningLabel = game.add.text(400, 50, levelData[level].enmsAvoidText, style);
        warningLabel.fill = '#ff0000';
        warningLabel.alpha = 0;
        //timers and flags
    },
    update: function(){
        if (game.time.now > (this.time + this.timedelta)){
            this.time = (game.time.now - this.startTime)/1000;
            timeLabel.text = "Time: " + this.time;
        }
        // enemy spawn
        if (game.time.now > this.enemySpawnTime){
            enemy = this.getRandomDead(enemies);
            if (enemy){
                height = game.rnd.integerInRange(100, 700)
                enemy.reset(1200, height);
                enemy.body.velocity.x = -200;
                this.enemySpawnTime = game.time.now + this.enemySpawnDelta;
            }
        }
        // enemy fire
        if (game.time.now > this.enemyFireTime){
            enemy = this.getRandomAlive(enemies);
            if (enemy){
                if (enemy.alive && enemy.key != levelData[level].enmsAvoid){
                    enemyBullet = enemy.bullets.getFirstExists(false);
                    if (enemyBullet){
                        enemyBullet.reset(enemy.x-200, enemy.y);
                        enemyBullet.body.velocity.x = -1000;
                        enemyBullets.add(enemyBullet);
                        this.enemyFireTime = game.time.now + this.enemyFireDelta;
                    }
                }
            }
        }
        // player controls
        if (cursors.up.isDown || wasd.up.isDown){
            player.body.velocity.y = -this.speed;
        }
        else if (cursors.down.isDown || wasd.down.isDown){
            player.body.velocity.y = this.speed;
        } else {
            player.body.velocity.y = 0;
        }
        if (cursors.right.isDown || wasd.right.isDown){
            player.body.velocity.x = this.speed;
        }
        else if (cursors.left.isDown || wasd.left.isDown){
            player.body.velocity.x = -this.speed;
        } else {
            player.body.velocity.x = 0;
        }
        if (fireButton.isDown && game.time.now > this.bulletFireTime){
            if (player.alive){
                bullet = bullets.getFirstExists(false);
                if (bullet){
                    bullet.reset(player.x+50, player.y-50);
                    bullet.body.velocity.x = 1000;
                    this.bulletFireTime = game.time.now +200;
                }
            }
        }
        game.physics.arcade.overlap(
            bullets, enemies, this.playerKill, null, this);
        game.physics.arcade.overlap(
            bullets, enemyBullets, this.playerKill, null, this);
        game.physics.arcade.overlap(
            player, enemies, this.playerDeath, null, this);
        game.physics.arcade.overlap(
            player, enemyBullets, this.playerDeath, null, this);
    },
    playerKill: function(bullet, enemy){
        bullet.kill();
        enemy.kill();
        if (enemy.key == levelData[level].enmsAvoid){
            this.score -= 10;
            warningLabel.alpha = 1;
            warningLabel.x = enemy.x-100;
            warningLabel.y = enemy.y;
            game.time.events.add(1000,
                function() {
                    game.add.tween(warningLabel).to({alpha: 0},
                    1000, Phaser.Easing.Linear.None, true);
                }, this);
            if (this.score < 0){
                this.score = 0;
            }
        } else {
            this.score += 1;
        }
        scoreLabel.text = "Pages: " + this.score;
        if (this.score > 99){
            player.kill();
            bullets.callAll('kill');
            this.score = 100;
            this.gameOver("Level complete");
        }
    },
    playerDeath: function(player, killer){
        killer.kill();
        this.lives -= 1;
        liveLabel.text = "Lives: " + this.lives;
        if (this.lives >0){
            player.reset(50,500);
            enemies.callAll('kill');
            bullets.callAll('kill');
            enemyBullets.callAll('kill');
            enemies.shuffle();
        } else {
            player.kill();
            this.gameOver("You Died!");
        }
        // game.state.start(game.state.current);
    },
    getRandomAlive: function(group) {
        var randomSprite = null, cnt = 0;
        group.forEachAlive(function(sprite) {
            if (sprite.visible && sprite.inCamera) {
                ++cnt;
                if (Math.random() <= 1 / cnt) {
                    randomSprite = sprite;
                }
            }
        });
        return randomSprite;
    },
    getRandomDead: function(group){
        var run = true;
        while (run){
            var randomSprite = group.getRandom();
            if (randomSprite.alive == false){
                run = false;
            }
        }
    return randomSprite;
    },
    gameOver: function(text){
        var gameOverLabel = game.add.text(game.world.centerX, game.world.centerY, text, style);
        gameOverLabel.anchor.setTo(0.5);
        nameInput = game.add.inputField(game.world.centerX-75, game.world.centerY+50, style);
        nameInput.width=100;
        var newGameLabel = game.add.text(game.world.centerX, game.world.centerY+150, "Click to return to main menu", style);
        newGameLabel.inputEnabled = true;
        newGameLabel.anchor.setTo(0.5);
        newGameLabel.events.onInputDown.add(this.sendScore, this);
        newGameLabel.events.onInputOut.add(function(){newGameLabel.fill = '#FF6347';}, this);
        newGameLabel.events.onInputOver.add(function(){newGameLabel.fill = '#ff00ff'}, this);
    },
    sendScore: function(){
        music.stop();
        if (nameInput.value != ""){
            console.log("Sending score");
            console.log(nameInput);
            if (settings.difficulty){
                var intdiff = 1;
            } else {
                var intdiff = 0;
            }
            $.post( "http://hempston.co.uk/static/memehunter/highscoreadd.php",
                {"name":nameInput.value, "pages":this.score, "time":this.time, "difficulty": intdiff},
                function(response) { console.log(response); })
              .done(function() { console.log( "second success" ); })
              .fail(function() { console.log( "error" ); })
              .always(function() { console.log( "finished" ); });
        }
        game.state.start('menu');
    }
};
