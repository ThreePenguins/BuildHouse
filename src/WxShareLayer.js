/**
 * Created by ZHOUTINGTING on 11/11/14.
 */
var WxShareLayer = cc.Layer.extend({
    arrow:null,
    lable:null,
    is_on:null,
    ctor: function () {
        this._super();
        this.initWxApi();
        this.initShareButton(res.qqmb_png,res.qqmb_png,this.onShare,cc.p(80,150));
        cc.log(WeixinApi.openInWeixin());

    },

    initShareButton:function(pic_on, pic_down, fun, pos){
        var share_menu = new cc.MenuItemSprite(
            new cc.Sprite(pic_on), // normal state image
            new cc.Sprite(pic_down), //select state image
            fun, this);
        var share_button = new cc.Menu(share_menu);  //7. create the menu
        share_button.setPosition(pos);
        this.addChild(share_button);
    },
    onShare: function () {
        this.addChild(new MaskLayer());
        //this.addChild(new MaskLayer());
    },
    initWxApi:function(){
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?46b0a8d26d37172ca6c1c800d87116c8";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();

        var href = window.location.href, base = href,
            lastpt = href.lastIndexOf("."),
            last = href.lastIndexOf("/");
        if (last != -1 && lastpt > last)
            base = base.substr(0, last);
        window.wxData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl":base+'/icon.png',
            "link":window.location.href,
            "desc":"最近微信刷屏的游戏，喵的太贱了，快来感受下吧",
            "title":"最近微信刷屏的游戏，喵的太贱了，快来感受下吧"
        };
        window.wxFriend = wxData;/*{
         "appId": "", // 服务号可以填写appId
         "imgUrl":'http://h5.cocoachina.com/static/app/wxcat/icon.png',
         "link":window.location.href,
         "desc":'最近微信刷屏的游戏，喵的太贱了，快来感受下吧',
         "title":"最近微信刷屏的游戏《来自喵星的你》，喵的太贱了，快来感受下吧"
         };*/
        WeixinApi.ready(function(Api) {
            Api.hideOptionMenu();
            var wxCallbacks = {
                ready : function() {
                },
                cancel : function(resp) {
                },
                fail : function(resp) {
                },
                confirm : function(resp) {
                },
                all : function(resp) {
                }
            };
            Api.shareToFriend(wxFriend, wxCallbacks);
            Api.shareToTimeline(wxData, wxCallbacks);
            Api.shareToWeibo(wxData, wxCallbacks);
        });
    }
});

var MaskLayer = cc.LayerColor.extend({
    a:null,
    ctor: function () {
        this._super(cc.color(100, 0, 0, 188), cc.winSize.width, cc.winSize.height);
        var arrow = new cc.Sprite(res.arrow_png);
        arrow.anchorX = 1;
        arrow.anchorY = 1;
        arrow.x = cc.winSize.width - 15;
        arrow.y = cc.winSize.height - 5;

        this.addChild(arrow);

        var label = new cc.LabelTTF("请点击右上角的菜单按钮\n然后\"分享到朋友圈\"\n和好友比划比划吧", "黑体", 18, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
        label.x = cc.winSize.width/2;
        label.y = cc.winSize.height - 100;
        label.anchorY = 1;
        label.shadowColor = cc.color(255,255,255);
        label.shadowBlur = 50;

        this.addChild(label);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                return true;
            },
            onTouchEnded: function (t, event) {

                event.getCurrentTarget().removeFromParent();

            }
        }, this);

    }

});
