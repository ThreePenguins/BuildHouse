
var GameScene = cc.Scene.extend({
    space:null,
    eye_y:null,
    space: null,                //物理世界
    ctor:function () {
        this._super();
        this.eye_y = 0;
        this.space = new cp.Space();
    },

    // init space of chipmunk
    initPhysics:function() {
    	var space = this.space;
        // Gravity
        space.gravity = cp.v(0, -980);
        var staticBody = space.staticBody;
        //设置空间内刚体间联系的迭代计算器个数和弹性关系迭代计算器个数.
        //chipmunk使用迭代计算器计算出空间内物体的受力关系.
        //它建立一个大列表存放物体间所有的碰撞,连接等相互影响关系.根据实际情况传递某些相互作用.
        //传递相互作用的数取决于迭代器的个数,每次迭代都使计算结果更精确.
        //如果进行了过多的迭代,虽然物理影响效果会更好,但是这也会消耗过多的cpu处理时间.
        //如果进行的迭代太少,物理模拟效果会不精确,或者使本该静止的物体没能静止下来.
        //使用迭代器的个数在于平衡CPU性能和物理模拟精确度之间权衡.
        //this.space.iterations = 60;
        // 休眠临界时间
        space.sleepTimeThreshold = 0.5;
        space.collisionSlop = 0.5;
        // set up Walls
        var wallBottom = new cp.SegmentShape(staticBody,
            cp.v(50, g_groundHight),// start point
            cp.v(250, g_groundHight),// MAX INT:4294967295
            0);// thickness of wall

        wallBottom.setFriction(1);
        wallBottom.setElasticity(0);
        wallBottom.setCollisionType(SpriteTag.newblock);
        this.space.addShape(wallBottom);
    },    
    onEnter:function () {
        this._super();
        this.initPhysics();

        this.gameLayer = new cc.Layer();

        //add three layer in the right order
        var background_layer = new BackgroundLayer(this.space);
        var game_contr_layer = new GameControlLayer(this.space);
        var status_layer = new StatusLayer();

        this.gameLayer.addChild(background_layer, 0, TagOfLayer.background);
        this.gameLayer.addChild(game_contr_layer, 0, TagOfLayer.GameControl);
        this.addChild(this.gameLayer, 0, TagOfLayer.GameLayer);

        this.addChild(status_layer, 0, TagOfLayer.Status);

        status_layer.updateNextList(game_contr_layer.block_index.nextList());
    
        if (MW.BGSOUND) {
        	cc.audioEngine.setMusicVolume(0.7);
        	cc.audioEngine.playMusic(res.mainMusic_mp3, true);
        }
        this.scheduleUpdate();
        this.space.addCollisionHandler(SpriteTag.newblock, SpriteTag.newblock, this.collisionBegin.bind(this), this.collisionPre.bind(this),this.collisionPost.bind(this), this.collisionSeparate.bind(this));

    },
    onExit : function() {
    	//移除物理碰撞检测
    	this.space.removeCollisionHandler( SpriteTag.newblock, SpriteTag.newblock );
    	this._super();
    },
    collisionBegin:function ( arbiter, space ) {
    	if(MW.BGSOUND){
    		cc.audioEngine.playEffect(res.explodeEffect_mp3);
    	}
    	return true;
    },

    collisionPre : function ( arbiter, space ) {
    	//console.log('collision pre');
    	return true;
    },

    collisionPost : function ( arbiter, space ) {
    	//console.log('collision post');
    },

    collisionSeparate : function ( arbiter, space ) {
    	//console.log('collision separate');
    },
    update:function (dt) {
        // chipmunk step
    	this.space.step(1/60.0);

        var game_control = this.gameLayer.getChildByTag(TagOfLayer.GameControl);
        //var max_high_pos = game_control.getHighestBody();
        //这里可以做试图变换
        //cc.log(-1*game_control.eyeY);
        if(this.eye_y != game_control.eyeY){
            this.eye_y = game_control.eyeY;
            this.gameLayer.runAction(new cc.MoveTo(1, cc.p(0,-1*this.eye_y)));
        }
//                this.gameLayer.runAction(new cc.MoveTo(2, cc.p(0,-1*game_control.eyeY)));
       // this.gameLayer.setPosition();
        //this.gameLayer.setPosition(cc.p(0,0));
    }
});
