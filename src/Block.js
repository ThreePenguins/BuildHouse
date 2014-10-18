var Block = cc.Class.extend({
    space:null,
    layer:null,
    shape:null,

    /** Constructor
     * @param {cc.SpriteBatchNode *}
     * @param {cp.Space *}
     * @param {cc.p}
     */
    ctor:function (layer, space) {
        this.space = space;
        this.layer = layer;


    },

    addBlock:function (pos) {
        cc.log(res.box_png);
        cc.log(res.wall_png);
        var block_sprit = new cc.PhysicsSprite(res.box_png);
        var contentSize = block_sprit.getContentSize();
        cc.log(contentSize);
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        body.p = (pos);
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);


        var block_shape = new cp.BoxShape(body,
            contentSize.width,
            contentSize.height);
        block_shape.u = 0.2;
        this.space.addShape(block_shape);
        block_sprit.setBody(body);
        this.layer.addChild(block_sprit);
    },

    getShape:function () {
        return this.shape;
    }
});