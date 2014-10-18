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
        this.u = 3;

    },

    randomShap:function(index,pos){
    	var randomArray=['addRetBlock','addCirBlock','addPoly3Block','addRectangle'];
    	var shapMethod=randomArray[index];
    	switch (shapMethod){
    	case 'addRetBlock':
    		return this.addRetBlock(pos);
    		break;
    	case 'addCirBlock':
    		return this.addCirBlock(pos);
    		break;
    	case 'addPoly3Block':
    		return this.addPoly3Block(pos);
    		break;
    	case 'addRectangle':
    		return this.addRectangle(pos);   
    		break;
    	}
    },
    
    addRetBlock:function (pos) {
        var block_sprit = new cc.PhysicsSprite(res.box_png);
        var contentSize = block_sprit.getContentSize();
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        body.p = (pos);
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);


        var block_shape = new cp.BoxShape(body,
            contentSize.width,
            contentSize.height);
        block_shape.u = this.u ;
        this.space.addShape(block_shape);
        block_sprit.setBody(body);
        this.layer.addChild(block_sprit);

        return block_sprit;
    },
    addRectangle:function(pos){
    	var rectangle_sprite=new cc.PhysicsSprite(res.rectangle_png);
    	var contentSize=rectangle_sprite.getContentSize();
    	// init physics
    	var body=new cp.Body(1, cp.momentForBox(1,contentSize.width,contentSize.height));
    	body.p=pos;
    	body.applyImpulse(cp.v(0,0),cp.v(0,0));
    	this.space.addBody(body);

    	var rectangle_shape=new cp.BoxShape(body,contentSize.width,contentSize.height);
    	rectangle_shape.u=this.u;
    	this.space.addShape(rectangle_shape);

    	rectangle_sprite.setBody(body);
    	this.layer.addChild(rectangle_sprite);

    	return rectangle_sprite;
    },

    addCirBlock:function (pos) {
        var cir_block_sprite = new cc.PhysicsSprite.create(res.cir_png);
        var contentSize = cir_block_sprite.getContentSize();
        // init physics
        var radius = contentSize.width / 2;
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        body.p = pos;
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);

        var cir_block_shape = new cp.CircleShape(body, radius, cp.vzero);
        //this.shape.setCollisionType(SpriteTag.coin);
        //Sensors only call collision callbacks, and never generate real collisions
        //this.shape.setSensor(true);
        cir_block_shape.u = this.u;
        this.space.addShape(cir_block_shape);

        cir_block_sprite.setBody(body);
        this.layer.addChild(cir_block_sprite);

        return cir_block_sprite;
    },

    addPoly3Block:function(pos){
        var poly3_block_sprite = new cc.PhysicsSprite.create(res.poly3_png);
        var contentSize = poly3_block_sprite.getContentSize();
        // init physics
        var body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        body.p = pos;
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);

        var verts = [-50, -25, 0,25, 50,-25];
        var cir_block_shape = new cp.PolyShape(body, verts, cp.vzero);
        //this.shape.setCollisionType(SpriteTag.coin);
        //Sensors only call collision callbacks, and never generate real collisions
        //this.shape.setSensor(true);
        poly3_block_sprite.u = this.u;
        this.space.addShape(cir_block_shape);

        poly3_block_sprite.setBody(body);
        this.layer.addChild(poly3_block_sprite);

        return poly3_block_sprite;
    },


});