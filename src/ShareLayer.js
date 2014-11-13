/**
 * Created by ZHOUTINGTING on 11/11/14.
 */


var ShareLayer = cc.Layer.extend({
    content:null,
    url:null,
    pic_url:null,

    ctor: function (content, url, pic_url) {
        this._super();

        this.content = content;
        this.url = url;
        this.pic_url = pic_url;

        this.initShareButton(res.qqmb_png,res.qqmb_png,this.shareToWb,cc.p(80,100));
        this.initShareButton(res.qzone_png,res.qzone_png,this.hareToQzone,cc.p(160,100));
        this.initShareButton(res.sinamb_png,res.sinamb_png,this.shareToSina,cc.p(240,100));

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
    //分享到腾许微博
    shareToWb:function (){
        cc.log("shareToWb");
        var shareqqstring='http://v.t.qq.com/share/share.php?title='+this.content+'&url='+this.url+'&pic='+this.pic_url;
        window.open(shareqqstring,'newwindow','height=100,width=100,top=100,left=100');
    },
    //分享到新浪微博
    shareToSina:function() {
        cc.log("shareToSina");
        var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+this.content+'&url='+url+'&this.content=utf-8&sourceUrl='+this.url+'&pic='+this.pic_url;
        window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
    },
    //分享到QQ空间
    hareToQzone:function()
    {
        cc.log("hareToQzone");
        var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+this.content+'&url='+this.url+'&pics='+this.pic_url;
        window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
    }
});
