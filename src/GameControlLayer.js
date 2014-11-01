
var GameControlLayer = cc.Layer.extend({
    block_arr:[],
    block_factory:null,
    eyeY:null,
    max_pos:null,
    serial_count:0,

    ctor:function (space) {
        this._super();
        this.space = space;
        this.block_arr = [];
        this.eyeY = 0;
        this.max_pos = cp.v(0,0);
        this.serial_count = 0;//最大连续释放
        this.init();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(true);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 100);
    },
    init:function () {
        this._super();
        this.block_factory = new Block(this, this.space);
        this.block_index = new BlockIndex();
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

        if(event.getCurrentTarget().isStable() ){
            event.getCurrentTarget().serial_count = 0;
        }
        event.getCurrentTarget().serial_count += 1;

        if(event.getCurrentTarget().serial_count > g_max_serial){
            // 超过连续放置上限则不能放置新的block
            return;
        }
        //cc.log(pos);
        var new_pos = event.getCurrentTarget().convertToNodeSpace(pos);

        var block = event.getCurrentTarget().block_factory.randomShap(event.getCurrentTarget().block_index.next(),new_pos);
        event.getCurrentTarget().block_arr.push(block);
        event.getCurrentTarget().recognizer.beginPoint(pos.x, pos.y);
        var state_layer = event.getCurrentTarget().getParent().getParent().getChildByTag(TagOfLayer.Status);
        state_layer.updateNextList(event.getCurrentTarget().block_index.nextList());

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

    isStable:function(){
        for(var i = 1; i < this.block_arr.length; i++){
            if (this.block_arr[i].body.isSleeping() != true)
            return false;
        }

        return true;
    },

    getHighestBody:function(){
        var max_pos = cp.vzero;
        if(this.block_arr.length < 2){
           return max_pos;
        }

        max_pos = this.block_arr[0].body.p;

        for(var i = 1; i < this.block_arr.length; i++){
          if(this.block_arr[i].body.p.y > this.block_arr[i-1].body.p.y){
              max_pos = this.block_arr[i].body.p;
          }

        }
        this.confirmEyePos(max_pos);
        this.max_pos = max_pos;
        return max_pos;
    },

    confirmEyePos:function(pos){
        this.eyeY = pos.y - 240 > 0 ? pos.y - 240 : 0;
    },

    getEyeY:function(){
        return this.eyeY;
    },

    isOver:function(){

        for(var i = 0; i < this.block_arr.length; i++){
            //cc.log(i);
            //cc.log(this.block_arr[i].body.p.y);
            if(this.block_arr[i].body.p.y < g_dead_line){
                //cc.log("game over");
                var status = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
                cc.director.runScene(new GameOverScene(status.score));
            }
        }
        return false;

    },

    getScore:function(){
        var score = 0;
        var scale = 1;

        for(var i = 0; i < this.block_arr.length; i++){
            if(i == 20){
                scale += 0.5;
            }
            if(i == 50){
                scale += 0.5
            }
            score += this.block_arr[i].score*scale;
        }

        return score;
    },

    update:function (dt) {

        // update status


        this.isOver();
        // check and update runner stat

        if(this.isStable()){
            this.getHighestBody();
            var status = this.getParent().getParent().getChildByTag(TagOfLayer.Status);
            status.updateHighMeter(this.getScore());
        }

    }

});
