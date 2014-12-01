var MW = MW || {};

var g_groundHight = 128;
var g_game_h = 960;
var g_game_w = 640;
var g_runnerStartX = 80;
var g_dead_line = -200;
var g_max_serial = 2;

var g_color_box_num = 4;
var g_color_cir_num = 2;
var g_block_index = 1;

var g_high_scal = 1;

var g_box_arr = [res.box_png_b,res.box_png_g,res.box_png_r,res.box_png_y];
var g_cir_arr = [res.cir_png_b,res.cir_png_r];
//var g_block_list = [0,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ,0,0,0,0,1,2,1,0,0,0,0,0,1,0,0,0,3,1,0,2,0,0,0
//                    ];
var g_block_list = [0,0,2,1,0,1,0,3,0,1,2,3,0,3,2,1,0,2,0,0
                    ,2,2,1,0,0,3,3,2,0,1,0,0,2,2,2,3,2,0,1,2
                    ,1,1,0,0,0,2,3,3,1,2,0,1,2,3,1,0,1,2,3,0
                    ,0,0,2,1,0,1,0,3,0,1,2,3,0,3,2,1,0,2,0,0
                    ,2,2,1,0,0,3,3,2,0,1,0,0,2,2,2,3,2,0,1,2
                    ,1,1,0,0,0,2,3,3,1,2,0,1,2,3,1,0,1,2,3,0
                    ,0,0,2,1,0,1,0,3,0,1,2,3,0,3,2,1,0,2,0,0
                    ,2,2,1,0,0,3,3,2,0,1,0,0,2,2,2,3,2,0,1,2
                    ,1,1,0,0,0,2,3,3,1,2,0,1,2,3,1,0,1,2,3,0
                    ];
var g_randomArray=['addRetBlock','addCirBlock','addPoly3Block','addRectangle'];

if(typeof TagOfLayer == "undefined") {
	var TagOfLayer = {};
	TagOfLayer.background = 0;
	TagOfLayer.GameControl = 1;
	TagOfLayer.Status = 2;
	TagOfLayer.GameLayer = 3;
};

//collision type for chipmunk
if(typeof SpriteTag == "undefined") {
	var SpriteTag = {};
	SpriteTag.newblock = 0;
	SpriteTag.oldblock = 1;
	SpriteTag.wall = 2;
};