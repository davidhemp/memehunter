var menuState = {
    create: function() {
    game.stage.backgroundColor = '#4488AA';
    background = game.add.sprite(0, 0, 'forest');
    title = game.add.sprite(game.world.centerX, game.world.centerY-200, 'logo');
    title.anchor.setTo(0.5, 0.5);

    newGameLabel = game.add.text(game.world.centerX,300+100, "New Game");
    this.menuItem(newGameLabel, this.newGameMenu);

    level1Label = game.add.text(game.world.centerX,300+100, "Facebook");
    this.menuItem(level1Label, this.fbLevel);

    level4Label = game.add.text(game.world.centerX,450+100, "Twitch", {fill: '#aaaaaa'});
    this.menuItem(level4Label, this.twitchLevel);
    level2Label = game.add.text(game.world.centerX,350+100, "Imgur", {fill: '#aaaaaa'});
    this.menuItem(level2Label, this.imgurLevel);
    level2Label.anchor.setTo(0.5, 0.5);
    level3Label = game.add.text(game.world.centerX,400+100, "Youtube", {fill: '#aaaaaa'});
    level3Label.anchor.setTo(0.5, 0.5);

    backLabel = game.add.text(game.world.centerX,500+100, "Back");
    this.menuItem(backLabel, this.mainMenu);

    menuLabels =[newGameLabel, level1Label, level2Label, level3Label, level4Label, backLabel];
    this.mainMenu();

    music = game.add.audio('rickRollD');
    music.play();
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
        music.stop();
        music = game.add.audio('normiesong');
        music.play();
        game.state.start("play");
    },
    twitchLevel: function(item){
        level = 1;
        music.stop();
        music = game.add.audio('darude');
        music.play();
        game.state.start("play");
    },
    imgurLevel: function(item){
        level = 2;
        music.stop();
        if (imgurImages.length >= 10){
            levelData[level].enms = imgurImages.splice(0, 10);
            music = game.add.audio('numberone');
            music.play();
            game.state.start("play");
        } else {
            console.log("Imgur level still loading");
            console.log(imgurImages.length);
        }
    }
}
