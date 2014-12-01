cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(640, 960, cc.ResolutionPolicy.FIXED_WIDTH);
	cc.view.resizeWithBrowserSize(true);
    //load resources

	cc.RMBLoaderScene.preload(g_resources, function () {
        cc.director.runScene(new MenuScene());
    }, this);
};
cc.game.run();