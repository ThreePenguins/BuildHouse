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

        this.labelMeter = new cc.LabelTTF(this.high+"M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winSize.width/2, winSize.height / 2 + 100));
        this.addChild(this.labelMeter);

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
        	new cc.Sprite(res.restart_n_png),
        	new cc.Sprite(res.restart_s_png),
            this.onRestart, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
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