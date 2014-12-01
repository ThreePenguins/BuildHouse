var StatusLayer = cc.Layer.extend({
    next_blocks:[],
    high:0,
    score:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();
        this.next_blocks=[];
        this.core = 0;

        var winsize = cc.director.getWinSize();
        this.winsize = winsize;
        this.labelMeter = new cc.LabelTTF("得分：0", "Helvetica", 40);
        this.labelMeter.setFontFillColor(cc.color(100,100,100,255));
        this.labelMeter.setPosition(cc.p(winsize.width - 140, winsize.height - 60));
        this.addChild(this.labelMeter);
    },
    updateNextList:function(next_list){
        this.clearNextList();
        for (var i =0; i < next_list.length; i++){
            var tmp_sprite = this.spritFactory(next_list[i], g_block_index+i+1);
            this.addChild(tmp_sprite);
            tmp_sprite.setPosition(cp.v(190 - i*80, this.winsize.height - 60));
            tmp_sprite.scale *= 0.6;
            this.next_blocks.push(tmp_sprite);
        }
    },

    spritFactory:function(index, block_index){
        var sprite_name = g_randomArray[index];
        var sprite = null;
        switch (sprite_name){
            case 'addRetBlock':
                sprite = new cc.Sprite(g_box_arr[block_index%g_color_box_num]);
                break;
            case 'addCirBlock':
                sprite = new cc.Sprite(g_cir_arr[block_index%g_color_cir_num]);
                break;
            case 'addPoly3Block':
                sprite = new cc.Sprite(res.poly3_png);
                break;
            case 'addRectangle':
                sprite = new cc.Sprite(res.rectangle_png);
                sprite.scale = 0.5;
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

    updateHighMeter:function (score) {

        if(this.core < score){
            this.labelMeter.setString("得分："+parseInt(score));
            this.score = score;
        }

    }

});
