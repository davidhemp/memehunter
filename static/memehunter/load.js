var loadState = {
    preload: function(){
        // loadingAnimation = game.add.sprite(game.world.centerX, game.world.centerY, "loadinganimation");
        // loadingAnimation.anchor.setTo(0.5);
        loadingBar = game.add.sprite(game.world.centerX, game.world.centerY, "loadingbar");
        loadingBar.anchor.setTo(0.5);
        game.load.setPreloadSprite(loadingBar);

        game.load.crossOrigin = 'anonymous';
        // imgur level
        for (var i=0; i < 10; i++){
            game.load.image(imgurImages[i], imgurURLS[i]);
        }
        game.load.image('cera', '/static/memehunter/assets/imgur/cera.png');

        game.load.image('downvote', '/static/memehunter/assets/imgur/downvote.png');
        game.load.image('imgurBackground', '/static/memehunter/assets/imgur/background.png');
        // Facebook level
        // load images
        game.load.image('political1', '/static/memehunter/assets/fb/political1.jpg');
        game.load.image('political2', '/static/memehunter/assets/fb/political2.jpg');
        game.load.image('political3', '/static/memehunter/assets/fb/political3.jpg');
        game.load.image('pray1', '/static/memehunter/assets/fb/pray1.jpg');
        game.load.image('pray2', '/static/memehunter/assets/fb/pray2.jpg');
        game.load.image('pray3', '/static/memehunter/assets/fb/pray3.jpg');
        game.load.image('clickbait1', '/static/memehunter/assets/fb/clickbait1.png');
        game.load.image('clickbait2', '/static/memehunter/assets/fb/clickbait2.png');
        game.load.image('clickbait3', '/static/memehunter/assets/fb/clickbait3.png');
        game.load.image('troll', '/static/memehunter/assets/fb/troll.png');

        game.load.image('grumpy', '/static/memehunter/assets/fb/grumpy.png');
        game.load.image('hands', '/static/memehunter/assets/fb/hands.png');
        game.load.image('wow', '/static/memehunter/assets/fb/wow.png');
        game.load.image('like', '/static/memehunter/assets/fb/like.png');

        game.load.image('fbBackground', '/static/memehunter/assets/fb/background.png');

        // Twitch level
        // load images
        game.load.image('ice', '/static/memehunter/assets/twitch/ice.jpg');
        game.load.image('police', '/static/memehunter/assets/twitch/police.png');
        game.load.image('lirik', '/static/memehunter/assets/twitch/lirik.png');
        game.load.image('potato', '/static/memehunter/assets/twitch/potato.png');
        game.load.image('soda', '/static/memehunter/assets/twitch/soda.jpg');
        game.load.image('sodag', '/static/memehunter/assets/twitch/sodag.png');
        game.load.image('girlstreamer1', '/static/memehunter/assets/twitch/girlstreamer1.jpg');
        game.load.image('melon', '/static/memehunter/assets/twitch/melon.png');
        game.load.image('girlstreamer2', '/static/memehunter/assets/twitch/girlstreamer2.jpg');
        game.load.image('hey', '/static/memehunter/assets/twitch/hey.png');
        game.load.image('girlstreamer3', '/static/memehunter/assets/twitch/girlstreamer3.png');
        game.load.image('smorc', '/static/memehunter/assets/twitch/smorc.png');
        game.load.image('boaty', '/static/memehunter/assets/twitch/boaty.png');
        game.load.image('give', '/static/memehunter/assets/twitch/give.png');
        game.load.image('reckful', '/static/memehunter/assets/twitch/reckful.png');
        game.load.image('drama', '/static/memehunter/assets/twitch/drama.jpg');
        game.load.image('glitch', '/static/memehunter/assets/twitch/glitch.png');
        game.load.image('kappa', '/static/memehunter/assets/twitch/kappa.png');

        game.load.image('glitch', '/static/memehunter/assets/twitch/glitch.png');
        game.load.image('twitchBackground', '/static/memehunter/assets/twitch/twitchlogo.png');
        // menu
        //load images
        game.load.image('logo', '/static/memehunter/assets/logo.png')
        game.load.image('forest', '/static/memehunter/assets/forest.jpg');
        //load music
        game.load.audio('rickRollD', '/static/memehunter/assets/audio/RickRollD.ogg');
        game.load.audio('darude', '/static/memehunter/assets/audio/darude.ogg');
        game.load.audio('normiesong', '/static/memehunter/assets/audio/normiesong.ogg');
        game.load.audio('numberone', '/static/memehunter/assets/audio/numberone.ogg');
        //player assets
        game.load.image('desk', '/static/memehunter/assets/desk.png');
        game.load.image('bullet', '/static/memehunter/assets/pointer.png');
    },
    create: function(){
        game.debug.text('content loaded', 20, 20, {font: '30px', fill :'#fff000'});
        game.state.start('menu');
    }
}

var Enemy = function(game, enmName, level, enmBullet) {
    Phaser.Sprite.call(this, game, GAME_WIDTH, GAME_HEIGHT, enmName);
    this.anchor.setTo(0.5, 0.5);
    this.height = 250;
    this.width = 250;
    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.bulletType = enmBullet
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(3, enmBullet);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);
}
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
// player = new Player(game);
// game.world.add(player);
