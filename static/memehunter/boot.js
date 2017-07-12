var bootState = {
    preload: function(){
        game.load.image('loadinganimation', '/static/memehunter/assets/loading.gif');
        game.load.image('loadingbar', '/static/memehunter/assets/bar.png');
    },
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};
