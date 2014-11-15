

var MenuLayer = cc.Layer.extend({
    ctor : function(){
        //1. call super class's ctor function
        this._super();
        this.init();
    },
    init:function(){
        //call super class's super function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.helloBG_png);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);


        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay= new cc.MenuItemSprite(
    		new cc.Sprite(res.start_n_png), // normal state image
    		new cc.Sprite(res.start_s_png), //select state image
            this.onPlay, this);
//        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
//        menu.setPosition(centerpos);
//        this.addChild(menu);
        
//        if (MW.BGSOUND) {
//        	cc.audioEngine.setMusicVolume(0.7);
//        	cc.audioEngine.playMusic(res.mainMusic_mp3, true);
//        }
        
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(16);
        var title1 = new cc.MenuItemFont("Sound");
        title1.setEnabled(false);
        title1.setPosition(200,0);
        
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(16);
        var item1 = new cc.MenuItemToggle(
        		new cc.MenuItemFont("On"),
        		new cc.MenuItemFont("Off") );
        item1.setCallback(this.onSoundControl );
        var state = MW.BGSOUND ? 0 : 1;
        item1.setSelectedIndex(state);
        item1.setPosition(260,0);
        
        var menu = new cc.Menu(menuItemPlay,title1,item1);  //7. create the menu
        menu.setPosition(centerpos);
        menu.alignItemsInColumns(1, 2);
        this.addChild(menu);
        return true;
    },
    onSoundControl:function(){
    	MW.BGSOUND = !MW.BGSOUND;
    	var audioEngine = cc.audioEngine;
//    	if(MW.BGSOUND){
//    		audioEngine.playMusic(res.mainMusic_mp3, true);
//    	}
//    	else{
//    		audioEngine.stopMusic();
//    		audioEngine.stopAllEffects();
//    	}
    },

    onPlay : function(){
        cc.log("==onplay clicked");
        cc.director.runScene(new GameScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MenuLayer();

        this.addChild(layer);
    }
});
