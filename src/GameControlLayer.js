
var GameControlLayer = cc.Layer.extend({
    blockArr:[],

    ctor:function (space) {
        this._super();
        this.space = space;
        this.init();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(false);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);
    },
    init:function () {
        this._super();

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

        this.scheduleUpdate();
    },

    onExit:function() {
        //release sth.

        this._super();
    },


    onTouchBegan:function(touch, event) {
        var pos = touch.getLocation();
        cc.log(pos);
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);

        if (pos.y > 300)
        {
            cc.director.runScene(new GameOverScene(100));
        }
        return true;
    },

    onTouchMoved:function(touch, event) {
        var pos = touch.getLocation();
        cc.log(pos);
        event.getCurrentTarget().recognizer.movePoint(pos.x, pos.y);
    },

    onTouchEnded:function(touch, event) {
        var rtn = event.getCurrentTarget().recognizer.endPoint();
        cc.log("rnt = " + rtn);
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

    update:function (dt) {

        // update status


        // check and update runner stat

    }

});
