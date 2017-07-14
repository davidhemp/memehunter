
GAME_WIDTH = 1280;
GAME_HEIGHT = 800;
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create });
function preload() {
    game.add.plugin(PhaserInput.Plugin);
    //  Phaser can load JSON files.

    //  It does this using an XMLHttpRequest.

    //  If loading a file from outside of the domain in which the game is running
    //  a 'Access-Control-Allow-Origin' header must be present on the server.

    game.load.json('highscoresHard', 'http://hempston.co.uk/static/memehunter/highscorehard.php');
    game.load.json('highscoresEasy', 'http://hempston.co.uk/static/memehunter/highscoreeasy.php');
    // game.load.json('version', 'http://phaser.io/version.json');

}

function create() {

    game.stage.backgroundColor = '#0072bc';
    var shift = [-250, 250];
    var difficultyList = ['Hard','Easy'];
    var style = {'font': '18px Arial', 'fill':'#FF6347', 'align':'center', 'stroke':'#ffffff', 'strokeThickness':6};
    for (var j =0; j < 2; j++){
        var highscoresJSON = game.cache.getJSON("highscores" + difficultyList[j]);
        highscoresGroup = game.add.group();
        col = ["", difficultyList[j], "", "Name", "Pages", "Time"]
        for (var i=0; i < col.length;i++){
            highscoresGroup.add(game.add.text(0,0, col[i], style));
        }
        for (var i =0; i < highscoresJSON.length; i++){
            highscoresGroup.add(game.add.text(0, 0, highscoresJSON[i].name.substring(0,9), style));
            highscoresGroup.add(game.add.text(0, 0, highscoresJSON[i].pages, style));
            highscoresGroup.add(game.add.text(0, 0, highscoresJSON[i].time, style));
        }
        highscoresGroup.align(3, -1, 150, 50);
        highscoresGroup.setAll('anchor.x', 0.5);
        highscoresGroup.setAll('anchor.y', 0.5);
        highscoresGroup.x = game.world.centerX - 150 + shift[j];
        highscoresGroup.y = game.world.centerY/3;
    }


}
