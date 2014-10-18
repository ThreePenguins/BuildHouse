
var GameControlLayer = cc.Layer.extend({
    block_arr:[],
    block_factory:null,
    eyeY:null,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.block_arr = [];
        this.eyeY = 0;
        this.init();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(false);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 100);
    },
    init:function () {
        this._super();
        this.block_factory = new Block(this, this.space);
        //initialize the recognizer
        this.recognizer = new SimpleRecognizer();
        // create sprite sheet
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        this.schedule(this.update, 0.1);
    },

    onExit:function() {
        //release sth.

        this._super();
    },


    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();

        //cc.log(pos);
        var new_pos = event.getCurrentTarget().convertToNodeSpace(pos);
        var randomIndex=Math.floor(Math.random()*4);
        cc.log(pos);
        cc.log(new_pos);
        var block = event.getCurrentTarget().block_factory.randomShap(randomIndex,new_pos);
        event.getCurrentTarget().block_arr.push(block);
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);

        if (pos.y > 450)
        {
            cc.director.runScene(new GameOverScene(100));
        }
        return true;
    },

    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        //cc.log(pos);
        event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
    },

    onTouchEnded:function(touch, event) {
        var rtn = event.getCurrentTarget().recognizer.endPoint();
        //cc.log("rnt = " + rtn);
        switch (rtn) {
            case "up":
//                event.getCurrentTarget().jump();
                break;
            default:
                break;
        }
    },

    getEyeX:function () {
       // return this.sprite.getPositionX() - g_runnerStartX;
        return cc.p(0,0);
    },
    getHighestBody:function(){
        var max_pos = cp.vzero;
        if(this.block_arr.length < 2){
           return max_pos;
        }

        max_pos = this.block_arr[0].body.p;

        for(var i = 1; i < this.block_arr.length-1; i++){
          if(this.block_arr[i].body.p.y > this.block_arr[i-1].body.p.y){
              max_pos = this.block_arr[i].body.p;
          }
        }
        this.confirmEyePos(max_pos);
        return max_pos;
    },

    confirmEyePos:function(pos){
        this.eyeY = pos.y - 240 > 0 ? pos.y - 240 : 0;
    },

    getEyeY:function(){
        return this.eyeY;
    },

    update:function (dt) {

        // update status

        this.getHighestBody();
        // check and update runner stat

    }

});
