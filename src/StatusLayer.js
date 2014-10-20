var StatusLayer = cc.Layer.extend({
    next_blocks:[],
    high:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        this.next_blocks=[];

        var winsize = cc.director.getWinSize();

        this.labelMeter = new cc.LabelTTF("100M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelMeter);
    },
    updateNextList:function(next_list){
        this.clearNextList();
        for (var i =0; i < next_list.length; i++){
            var tmp_sprite = this.spritFactory(next_list[i]);
            this.addChild(tmp_sprite);
            tmp_sprite.setPosition(cp.v(20 +i*40,450));
            tmp_sprite.scale = 0.5;
            this.next_blocks.push(tmp_sprite);
        }
    },

    spritFactory:function(index){
        var sprite_name = g_randomArray[index];
        var sprite = null;
        switch (sprite_name){
            case 'addRetBlock':
                sprite = new cc.Sprite(res.box_png);
                break;
            case 'addCirBlock':
                sprite = new cc.Sprite(res.cir_png);
                break;
            case 'addPoly3Block':
                sprite = new cc.Sprite(res.poly3_png);
                break;
            case 'addRectangle':
                sprite = new cc.Sprite(res.rectangle_png);
                break;

        }
        return sprite;
    },
    clearNextList:function(){
      for (var i =0; i < this.next_blocks.length; i++){
            this.removeChild(this.next_blocks[i]);
        }
        this.next_blocks = [];
    },

    updateHighMeter:function (py) {
        this.labelMeter.setString(parseInt(py / 10) + "M");
    }

});
