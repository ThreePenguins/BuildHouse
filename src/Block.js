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
        this.u = 1.5;
        this.s = 20;

    },

    randomShap:function(index,pos){
    	var shapMethod=g_randomArray[index];
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
        var body = new cp.Body(1.5, cp.momentForBox(1.5, contentSize.width, contentSize.height));
        body.p = (pos);
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);


        var shape = new cp.BoxShape(body,
            contentSize.width,
            contentSize.height);
        shape.setFriction(this.u);
        shape.setCollisionType(SpriteTag.newblock);

        this.space.addShape(shape);
        block_sprit.setBody(body);
        this.layer.addChild(block_sprit);

        block_sprit.score = 1*this.s;

        return block_sprit;
    },
    addRectangle:function(pos){
    	var rectangle_sprite=new cc.PhysicsSprite(res.rectangle_png);
    	var contentSize=rectangle_sprite.getContentSize();
    	// init physics
    	var body=new cp.Body(1.5, cp.momentForBox(1.5,contentSize.width,contentSize.height));
    	body.p=pos;
    	body.applyImpulse(cp.v(0,0),cp.v(0,0));
    	this.space.addBody(body);

    	var shape=new cp.BoxShape(body,contentSize.width,contentSize.height);
        shape.setFriction(this.u);
        shape.setCollisionType(SpriteTag.newblock);
    	this.space.addShape(shape);

    	rectangle_sprite.setBody(body);
    	this.layer.addChild(rectangle_sprite);

        rectangle_sprite.score = 1*this.s;

    	return rectangle_sprite;
    },

    addCirBlock:function (pos) {
        var cir_block_sprite = new cc.PhysicsSprite.create(res.cir_png);
        var contentSize = cir_block_sprite.getContentSize();
        // init physics
        var radius = contentSize.width / 2;
        var body = new cp.Body(1.5, cp.momentForBox(1.5, contentSize.width, contentSize.height));
        body.p = pos;
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);

        var shape = new cp.CircleShape(body, radius, cp.vzero);
        shape.setCollisionType(SpriteTag.newblock);
        shape.setFriction(this.u);
        this.space.addShape(shape);

        cir_block_sprite.setBody(body);
        this.layer.addChild(cir_block_sprite);

        cir_block_sprite.score = 3*this.s;

        return cir_block_sprite;
    },

    addPoly3Block:function(pos){
        var poly3_block_sprite = new cc.PhysicsSprite.create(res.poly3_png);
        var contentSize = poly3_block_sprite.getContentSize();
        // init physics
        var body = new cp.Body(1.5, cp.momentForBox(1.5, contentSize.width, contentSize.height));
        body.p = pos;
        body.applyImpulse(cp.v(0, 0), cp.v(0, 0));
        this.space.addBody(body);

        var verts = [-50, -25, 0,25, 50,-25];
        var shape = new cp.PolyShape(body, verts, cp.vzero);
        shape.setCollisionType(SpriteTag.newblock);
        shape.setFriction(this.u);
        this.space.addShape(shape);

        poly3_block_sprite.setBody(body);
        this.layer.addChild(poly3_block_sprite);

        poly3_block_sprite.score = 2*this.s;

        return poly3_block_sprite;
    }


});