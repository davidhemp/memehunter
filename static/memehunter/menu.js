var menuState = {
    create: function() {
    game.stage.backgroundColor = '#4488AA';
    background = game.add.sprite(0, 0, 'forest');
    title = game.add.text(GAME_WIDTH/2,200, "Memehunter", {font:"65px", align:"center"});
    title.anchor.setTo(0.5, 0.5);
    title.font = 'Arial Black';
    title.fontWeight = 'bold';

    //	Stroke color and thickness
    title.stroke = '#000000';
    title.strokeThickness = 10;
    title.fill = '#ffffff';

    newGameLabel = game.add.text(GAME_WIDTH/2,300, "New Game");
    this.menuItem(newGameLabel, this.newGameMenu);

    level1Label = game.add.text(GAME_WIDTH/2,300, "Facebook");
    this.menuItem(level1Label, this.fbLevel);

    level4Label = game.add.text(GAME_WIDTH/2,450, "Twitch", {fill: '#aaaaaa'});
    this.menuItem(level4Label, this.twitchLevel);
    level2Label = game.add.text(GAME_WIDTH/2,350, "Imgur", {fill: '#aaaaaa'});
    level2Label.anchor.setTo(0.5, 0.5);
    level3Label = game.add.text(GAME_WIDTH/2,400, "Youtube", {fill: '#aaaaaa'});
    level3Label.anchor.setTo(0.5, 0.5);

    backLabel = game.add.text(GAME_WIDTH/2,500, "Back");
    this.menuItem(backLabel, this.mainMenu);

    menuLabels =[newGameLabel, level1Label, level2Label, level3Label, level4Label, backLabel];
    this.mainMenu();

    music = game.add.audio('rickRollD');
    // music.play();
    },

    menuItem: function(item, clickEvent) {
        item.fill = '#ffffff';
        item.inputEnabled = true;
        item.anchor.setTo(0.5, 0.5);
        item.events.onInputDown.add(clickEvent, this);
        item.events.onInputOut.add(this.mouseOut, this);
        item.events.onInputOver.add(this.mouseOver, this);
    },
    mouseOver: function(item){
        item.fill = '#ff00ff';
    },
    mouseOut: function(item){
        item.fill = '#ffffff';
    },
    mainMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible=false;
        }
        newGameLabel.visible=true;
    },
    newGameMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible=true;
        }
        newGameLabel.visible=false;
        // level1Label.visible = true;
        // backLabel.visible = true;
    },
    fbLevel: function(item){
        level = 0;
        game.state.start("play");
    },
    twitchLevel: function(item){
        level = 1;
        game.state.start("play");
    }
}
