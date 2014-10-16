var StatusLayer = cc.Layer.extend({
    next_blocks:[],
    high:0,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var winsize = cc.director.getWinSize();

        this.labelMeter = new cc.LabelTTF("100M", "Helvetica", 20);
        this.labelMeter.setPosition(cc.p(winsize.width - 70, winsize.height - 20));
        this.addChild(this.labelMeter);
    },


    updateHighMeter:function (py) {
        this.labelMeter.setString(parseInt(py / 10) + "M");
    }

});
