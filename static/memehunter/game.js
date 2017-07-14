
GAME_WIDTH = 1280;
GAME_HEIGHT = 800;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'gameDiv');
var level = -1;
$(document).ajaxStop(function(){
    console.log("Game started");
    game.state.add('boot', bootState);
    game.state.add('load', loadState);
    game.state.add('menu', menuState);
    game.state.add('play', playState);
    game.state.start('boot');
});
