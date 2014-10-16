var BackgroundLayer = cc.Layer.extend({
    space:null,

    ctor:function (space) {
        this._super();

        this.space = space;

        this.init();
    },

    init:function () {
        this._super();
        var winsize = cc.director.getWinSize();
        var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
        var spriteBG = new cc.Sprite(res.PlayBG_png);
        spriteBG.setPosition(cc.p(0,0));
        spriteBG.anchorX = 0;
        spriteBG.anchorY = 0;
        this.addChild(spriteBG);


        var wall_sprit = new cc.Sprite(res.wall_png);
        wall_sprit.setPosition(cc.p(50,50));
        wall_sprit.anchorX = 0;
        wall_sprit.anchorY = 1;
        this.addChild(wall_sprit);
        //this.scheduleUpdate();
    },

    checkAndReload:function (eyeX) {

        return true;
    },

    update:function (dt) {
        var animationLayer = this.getParent().getChildByTag(TagOfLayer.GameControl);
        var eyeX = animationLayer.getEyeX();
        this.checkAndReload(eyeX);

    }
});
