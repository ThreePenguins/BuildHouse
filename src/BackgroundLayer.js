var BackgroundLayer = cc.Layer.extend({
    space:null,

    ctor:function (space) {
        this._super();

        this.space = space;
        this.winsize = cc.director.getWinSize();
        this.bk_index = 0;//back ground 重复引用计数
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
        this.scheduleUpdate();
    },

    checkAndReload:function (pos) {
        if(pos.y > this.winsize.height*this.bk_index){
            this.bk_index++;

            var spriteBG = new cc.Sprite(res.PlayBG2_png);
            spriteBG.setPosition(cc.p(0,this.bk_index*this.winsize.height));
            spriteBG.anchorX = 0;
            spriteBG.anchorY = 0;
            this.addChild(spriteBG);
        }
        return true;
    },

    update:function (dt) {
        var game_control = this.getParent().getChildByTag(TagOfLayer.GameControl);
        var max_high_pos = game_control.getHighestBody();
        this.checkAndReload(max_high_pos);

    }
});
