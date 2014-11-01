var g_groundHight = 50;
var g_runnerStartX = 80;
var g_dead_line = -200;
var g_max_serial = 2;
var g_block_list = [0,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
                    ];
var g_randomArray=['addRetBlock','addCirBlock','addPoly3Block','addRectangle'];

if(typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.GameControl = 1;
    TagOfLayer.Status = 2;
    TagOfLayer.GameLayer = 3;
};

// collision type for chipmunk
if(typeof SpriteTag == "undefined") {
    var SpriteTag = {};
    SpriteTag.newblock = 0;
    SpriteTag.oldblock = 1;
    SpriteTag.wall = 2;
};