var GameOverLayer = cc.LayerColor.extend({
    high:null,
    // constructor
    ctor:function (high) {
        this._super();
        this.high = high;
        cc.log(high);
        this.init();

    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();     

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        
        var spritebg = new cc.Sprite(res.gameover_png);
        //spritebg.scale = 0.5;
        spritebg.setPosition(centerPos);
        this.addChild(spritebg);
        
        this.labelMeter = new cc.LabelTTF(this.high, "Helvetica", 55);
        this.labelMeter.setPosition(cc.p(winSize.width/2, winSize.height / 2 + 97*2));
        this.addChild(this.labelMeter);
        //计算击败用户百分比
        var hiscore = 620;

        var rand =  Math.random()*12454;
        var rank = 0|((hiscore - this.high) * 34763  + rand);
        var percent = Math.round((this.high *34763 + rand)*100 / (hiscore*34763+rand));
        if(percent<10){
        	percent=10;
        }
        else if(percent>=100){
        	percent=99;
        }
        this.labelPercent = new cc.LabelTTF(percent,  'Helvetica', 45, cc.size(320,45), cc.TEXT_ALIGNMENT_LEFT);
        this.labelPercent.setFontFillColor(cc.color(250,6,6,255));
        this.labelPercent.setPosition(cc.p(winSize.width/2+170, winSize.height / 2 +114));
        this.addChild(this.labelPercent);
        
        cc.MenuItemFont.setFontSize(60);
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite(res.restart_n_png),
        	new cc.Sprite(res.restart_s_png),
            this.onRestart, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos.x,centerPos.y);
        this.addChild(menu);
        
        if (WeixinApi.openInWeixin()) { 
        	this.addChild(new WxShareLayer(res.share_s_png,res.share_n_png,centerPos.x,centerPos.y-120));
        }
        else{
            var shareLayer = new ShareLayer("haha,分享了吧","www.xxrmb.com", "http://www.xxrmb.com/buildhouse/res/helloBG.png");
            this.addChild(shareLayer,1000);
        }

    },
    onRestart:function (sender) {
        cc.director.resume();
        cc.director.runScene(new GameScene());
    }
});

var GameOverScene = cc.Scene.extend({
    ctor:function (high) {
        this._super();
        this.high = high;
    },
    onEnter:function () {
        this._super();
        var layer = new GameOverLayer(this.high);

        this.addChild(layer);
    }
});