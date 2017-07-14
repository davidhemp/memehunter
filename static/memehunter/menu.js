var menuState = {
    create: function() {
    game.stage.backgroundColor = '#4488AA';
    background = game.add.sprite(0, 0, 'forest');
    title = game.add.sprite(game.world.centerX, game.world.centerY-200, 'logo');
    title.anchor.setTo(0.5);

    // main view
    newGameLabel = game.add.text(game.world.centerX, 400, "New Game");
    this.menuItem(newGameLabel, this.newGameMenu);
    settingsLabel = game.add.text(game.world.centerX, 450, "Settings");
    this.menuItem(settingsLabel, this.settingsMenu);

    // settings view
    difficultyLabel = game.add.text(game.world.centerX-50, 400, "Difficulty: ");
    difficultyLevelLabel = game.add.text(game.world.centerX+50, 400, "placeholder");
    if (settings.difficulty){
        difficultyLevelLabel.text = "Hard";
    } else {
        difficultyLevelLabel.text = "Easy";
    }
    this.menuItem(difficultyLabel, this.difficultyToggle);
    this.menuItem(difficultyLevelLabel, this.difficultyToggle);

    //new game view
    level1Label = game.add.text(game.world.centerX,400, "Facebook");
    this.menuItem(level1Label, this.fbLevel);
    level2Label = game.add.text(game.world.centerX,450, "Imgur");
    this.menuItem(level2Label, this.imgurLevel);
    level3Label = game.add.text(game.world.centerX,500, "Twitch");
    this.menuItem(level3Label, this.twitchLevel);

    // back on all views
    backLabel = game.add.text(game.world.centerX,500+100, "Back");
    this.menuItem(backLabel, this.mainMenu);

    menuLabels =[newGameLabel, settingsLabel,
                difficultyLabel, difficultyLevelLabel,
                level1Label, level2Label, level3Label,
                 backLabel];
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
    // main view
    mainMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible = false;
        }
        newGameLabel.visible = true;
        settingsLabel.visible = true;
    },
    // settings view
    settingsMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible = false;
        }
        difficultyLabel.visible = true;
        difficultyLevelLabel.visible = true;
        backLabel.visible = true;
    },
    difficultyToggle: function(){
        settings.difficulty = !settings.difficulty;
        if (settings.difficulty){
            difficultyLevelLabel.text = "Hard";
        } else {
            difficultyLevelLabel.text = "Easy";
        }
        console.log(settings.difficulty);
    },
    // new game view
    newGameMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible = false;
        }
        level1Label.visible = true;
        level2Label.visible = true;
        level3Label.visible = true;
        backLabel.visible = true;
    },
    fbLevel: function(item){
        level = 0;
        music.stop();
        music = game.add.audio('normiesong');
        // music.play();
        game.state.start("play");
    },
    twitchLevel: function(item){
        level = 1;
        music.stop();
        music = game.add.audio('darude');
        // music.play();
        game.state.start("play");
    },
    imgurLevel: function(item){
        level = 2;
        music.stop();
        if (imgurImages.length >= 10){
            levelData[level].enms = imgurImages.splice(0, 10);
            levelData[level].enms.push('cera');
            music = game.add.audio('numberone');
            // music.play();
            game.state.start("play");
        } else {
            console.log("Imgur level still loading");
            console.log(imgurImages.length);
        }
    }
}
