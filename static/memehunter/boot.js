var bootState = {
    create: function() {
        game.debug.text('booting', 20, 20, {font: '30px', fill :'#ffffff'});
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');
    }
};
