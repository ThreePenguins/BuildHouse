
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

    },
    update:function (dt) {
        // chipmunk step
        this.space.step(dt);

        //这里可以做试图变换
        this.gameLayer.setPosition(cc.p(0,0));
    }
});
