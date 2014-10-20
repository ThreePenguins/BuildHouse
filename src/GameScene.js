
var GameScene = cc.Scene.extend({
    space:null,

    // init space of chipmunk
    initPhysics:function() {
        this.space = new cp.Space();
        // Gravity
        this.space.gravity = cp.v(0, -350);
        //设置空间内刚体间联系的迭代计算器个数和弹性关系迭代计算器个数.
        //chipmunk使用迭代计算器计算出空间内物体的受力关系.
        //它建立一个大列表存放物体间所有的碰撞,连接等相互影响关系.根据实际情况传递某些相互作用.
        //传递相互作用的数取决于迭代器的个数,每次迭代都使计算结果更精确.
        //如果进行了过多的迭代,虽然物理影响效果会更好,但是这也会消耗过多的cpu处理时间.
        //如果进行的迭代太少,物理模拟效果会不精确,或者使本该静止的物体没能静止下来.
        //使用迭代器的个数在于平衡CPU性能和物理模拟精确度之间权衡.
        this.space.iterations = 60;
        // 休眠临界时间
        this.space.sleepTimeThreshold = 0.5;
        this.space.collisionSlop = 0.5;
        // set up Walls
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(50, g_groundHight),// start point
            cp.v(250, g_groundHight),// MAX INT:4294967295
            0);// thickness of wall

        wallBottom.setFriction(1);
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
