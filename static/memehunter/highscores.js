var highScoresState = {
    preload: function(){
        //this is done here to it updates after each game
        // load highscores
        game.load.json('highscoresHard', 'http://hempston.co.uk/static/memehunter/highscorehard.php');
        game.load.json('highscoresEasy', 'http://hempston.co.uk/static/memehunter/highscoreeasy.php');
    },
    create: function(){
        /// set up background
        game.stage.backgroundColor = '#000000';
        background = game.add.sprite(0, 0, 'forest');
        // title = game.add.sprite(game.world.centerX, game.world.centerY-200, 'logo');
        // title.anchor.setTo(0.5);
        // highscores table
        var shift = [-250, 250];
        var difficultyList = ['Hard','Easy'];
        var style = {'fill':'#FF6347', 'align':'center', 'stroke':'#ffffff', 'strokeThickness':6};
        for (var j =0; j < 2; j++){
            var highscoresJSON = game.cache.getJSON("highscores" + difficultyList[j]);
            var highscoresGroup = game.add.group();
            var col = ["", difficultyList[j], "", "Name", "Pages", "Time"]
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
        // return to menu state
        var backLabel = game.add.text(game.world.centerX, 700, "Back", style);
        this.setupLabel(backLabel);
        backLabel.events.onInputDown.add(function(){game.state.start('menu');}, this);
        },
        setupLabel: function(item){
            item.inputEnabled = true;
            item.anchor.setTo(0.5);
            item.events.onInputOut.add(this.mouseOut, this);
            item.events.onInputOver.add(this.mouseOver, this);
        },
        mouseOver: function(item){
            item.fill = '#ff00ff';
        },
        mouseOut: function(item){
            item.fill = '#FF6347';
        }

}
