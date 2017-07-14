var menuState = {
    create: function() {
    game.stage.backgroundColor = '#000000';
    background = game.add.sprite(0, 0, 'forest');
    title = game.add.sprite(game.world.centerX, game.world.centerY-200, 'logo', style);
    title.anchor.setTo(0.5);

    // main view
    newGameLabel = game.add.text(game.world.centerX, 400, "New Game", style);
    this.menuItem(newGameLabel, this.newGameMenu);
    highscoresLabel = game.add.text(game.world.centerX, 450, "High Scores", style);
    this.menuItem(highscoresLabel, this.highscoresList);
    settingsLabel = game.add.text(game.world.centerX, 500, "Settings", style);
    this.menuItem(settingsLabel, this.settingsMenu);

    // settings view
    if (settings.difficulty){
        difficultyLabel = game.add.text(game.world.centerX, 400, "Difficulty: Hard", style);
    } else {
        difficultyLabel = game.add.text(game.world.centerX, 400, "Difficulty: Easy", style);
    }
    this.menuItem(difficultyLabel, this.difficultyToggle);
    //new game view
    level1Label = game.add.text(game.world.centerX,400, "Facebook", style);
    this.menuItem(level1Label, this.fbLevel);
    level2Label = game.add.text(game.world.centerX,450, "Imgur", style);
    this.menuItem(level2Label, this.imgurLevel);
    level3Label = game.add.text(game.world.centerX,500, "Twitch", style);
    this.menuItem(level3Label, this.twitchLevel);

    // back on all views
    backLabel = game.add.text(game.world.centerX, 600, "Back", style);
    this.menuItem(backLabel, this.mainMenu);

    menuLabels =[newGameLabel, highscoresLabel, settingsLabel,
                difficultyLabel,
                level1Label, level2Label, level3Label,
                 backLabel];
    this.mainMenu();

    music = game.add.audio('rickRollD');
    // music.play();
    },

    menuItem: function(item, clickEvent) {
        item.fill = '#FF6347';
        item.inputEnabled = true;
        item.anchor.setTo(0.5);
        item.events.onInputDown.add(clickEvent, this);
        item.events.onInputOut.add(this.mouseOut, this);
        item.events.onInputOver.add(this.mouseOver, this);
    },
    mouseOver: function(item){
        item.fill = '#ff00ff';
    },
    mouseOut: function(item){
        item.fill = '#FF6347';
    },
    // main view
    mainMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible = false;
        }
        newGameLabel.visible = true;
        settingsLabel.visible = true;
        highscoresLabel.visible = true;
        backLabel.y = 600;
    },
    // settings view
    settingsMenu: function(){
        for (var i =0; i < menuLabels.length; i++){
            menuLabels[i].visible = false;
        }
        difficultyLabel.visible = true;
        backLabel.visible = true;
    },
    highscoresList: function(){
        game.state.start('highscores');
    },
    difficultyToggle: function(){
        settings.difficulty = !settings.difficulty;
        if (settings.difficulty){
            difficultyLabel.text = "Difficulty: Hard";
        } else {
            difficultyLabel.text = "Difficulty: Easy";
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
