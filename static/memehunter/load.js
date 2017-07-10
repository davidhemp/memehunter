var loadState = {
    preload: function(){
        // Facebook level
        // load images
        game.load.image('desk', '/static/memehunter/assets/fb/desk.png');
        game.load.image('bullet', '/static/memehunter/assets/fb/pointer.png');
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
        game.load.image('lirik', '/static/memehunter/assets/twitch/lirik.png');
        game.load.image('soda', '/static/memehunter/assets/twitch/soda.jpg');
        game.load.image('potato', '/static/memehunter/assets/twitch/potato.png');
        game.load.image('police', '/static/memehunter/assets/twitch/police.png');
        game.load.image('sodag', '/static/memehunter/assets/twitch/sodag.png');
        game.load.image('girlstreamer', '/static/memehunter/assets/twitch/girlstreamer.jpg');
        game.load.image('melon', '/static/memehunter/assets/twitch/melon.png');
        game.load.image('kappa', '/static/memehunter/assets/twitch/kappa.png');

        game.load.image('twitchBackground', '/static/memehunter/assets/twitch/twitchlogo.png');
        // menu
        //load images
        game.load.image('forest', '/static/memehunter/assets/forest.jpg');
        //load music
        game.load.audio('rickRollD', ['/static/memehunter/assets/audio/RickRollD.ogg',
                                        '/static/memehunter/assets/audio/RickRollD.mp3']);
    },
    create: function(){
        game.debug.text('content loaded', 20, 20, {font: '30px', fill :'#fff000'});
        game.state.start('menu');
    }
}
var Enemy = function(game, enmName, level, enmBullet) {
    Phaser.Sprite.call(this, game, GAME_WIDTH, GAME_HEIGHT, enmName);
    this.anchor.setTo(0.5, 0.5);
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
