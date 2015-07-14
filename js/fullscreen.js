define([], function(){

    var fullScreen = {
        /**
            是否支持全屏模式
         */
        fullScreenEnabled: ( function() {
            var doc = document.documentElement;

            return	( 'requestFullscreen' in doc ) ||
                    ( 'webkitRequestFullScreen' in doc ) ||
                    ( 'msRequestFullscreen' in doc && document.msFullscreenEnabled) ||
                    ( 'mozRequestFullScreen' in doc && document.mozFullScreenEnabled ) ||
                    false;
        } )(),
        /**
            判断当前全屏状态
         */
        isFullScreen: function() {
            return  document.fullscreen ||
                    document.webkitIsFullScreen ||
                    document.mozFullScreen ||
                    false;
        },
        /**
            进入全屏模式
         */
        requestFullScreen : function(elem){
            if ( !this.fullScreenEnabled ) {
                return;
            }

            if ( this.isFullScreen() ) {
                this.exitFullScreen();
            }

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            }else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen();
            }else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            }else if (elem.msRequestFullscreen){
                elem.msRequestFullscreen();
            }
        },
        /**
            退出全屏模式
         */
        exitFullScreen : function(){
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }else if (document.msExitFullscreen){
                document.msExitFullscreen();
            }
        },
        /**
            绑定全屏事件
         */
        bindFullScreenChange : function(handler){
            if (this.fullScreenEnabled) {
                if(document.onwebkitfullscreenchange){
                    document.onwebkitfullscreenchange = function (e) {
                        handler && handler(isFullscreen());
                    };
                }else if(document.onmozfullscreenchange){
                    document.onmozfullscreenchange = function (e) {
                        handler && handler(isFullscreen());
                    };
                }else if(document.onmsfullscreenchange){
                    document.onmsfullscreenchange = function (e) {
                        handler && handler(isFullscreen());
                    };
                }
            }
        }
    };

    return fullScreen;
});
