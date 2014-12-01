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

        var spriteBG = new cc.Sprite(res.PlayBG_png);
        //spriteBG.scale = 0.5;
        spriteBG.setPosition(cc.p(0,0));
        spriteBG.anchorX = 0;
        spriteBG.anchorY = 0;
        this.addChild(spriteBG);
        this.cloude(4, this.bk_index*g_game_h);
        this.scheduleUpdate();
    },
    rangeRandom:function (n,m){
        var c = m-n+1;
        return Math.floor(Math.random() * c + n);
    },

    cloude:function(num, base_y){
        while(num--){
            var cloud = new cc.Sprite(res.cloud_png);
            cloud.scale = this.rangeRandom(5,12)*0.1;
            cc.log(this.rangeRandom(0.2,0.5));
            var move_to_y = base_y + this.rangeRandom(20,g_game_h);
            if (move_to_y < 600)
                return;
            var move_to_x = this.rangeRandom(0,2)%2 * g_game_w; //0 或 320

            cloud.setPosition(cc.p(this.rangeRandom(100,220),move_to_y));
            cloud.runAction(new cc.MoveTo(this.rangeRandom(10,30), cc.p(move_to_x,move_to_y )));
            this.addChild(cloud);
        }

    },

    checkAndReload:function (pos) {
        if(pos.y >= g_game_h*this.bk_index){
            this.bk_index++;

            var spriteBG = new cc.Sprite(res.PlayBG2_png);
            spriteBG.setPosition(cc.p(0,this.bk_index*g_game_h));
            spriteBG.anchorX = 0;
            spriteBG.anchorY = 0;
            this.addChild(spriteBG);

            this.cloude(4, this.bk_index*g_game_h);
        }
        return true;
    },

    update:function (dt) {
        var game_control = this.getParent().getChildByTag(TagOfLayer.GameControl);
        var max_high_pos = game_control.max_pos;
        this.checkAndReload(max_high_pos);

    }
});
