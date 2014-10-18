
var GameScene = cc.Scene.extend({
    space:null,

    // init space of chipmunk
    initPhysics:function() {
        this.space = new cp.Space();
        // Gravity
        this.space.gravity = cp.v(0, -350);
        // set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(50, g_groundHight),// start point
            cp.v(250, g_groundHight),// MAX INT:4294967295
            0);// thickness of wall

        wallBottom.u = 5;
        this.space.addStaticShape(wallBottom);
//
    },


    onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        this.gameLayer.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer.addChild(new GameControlLayer(this.space), 0, TagOfLayer.GameControl);
        this.addChild(this.gameLayer);
        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();
        //this.schedule(this.update, 0.5);

    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        var game_control = this.gameLayer.getChildByTag(TagOfLayer.GameControl);
        //var max_high_pos = game_control.getHighestBody();
        //这里可以做试图变换
        //cc.log(-1*game_control.eyeY);
        this.gameLayer.setPosition(cc.p(0,-1*game_control.eyeY));
        //this.gameLayer.setPosition(cc.p(0,0));
    }
});
