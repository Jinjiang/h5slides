/**
    @fileOverview
    程序总入口
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




// 用来调试的全局配置
var defaultTransition = 'transition_horizontal3d';

var data = new Data();
var editor = new Editor();
var player = new Player();
var stylesheets = new CSS();

editor.bind(function (type, data) {
    if (type == 'play') {
        player.play(window.data);
    }
    if (type == 'loadcss') {
        stylesheets.load(data);
    }
});
player.bind(function (type, data) {
    if (type == 'loadcss') {
        stylesheets.load(data);
    }
});

function checkPlay() {
    if (location.hash == '#play') {
        player.play(window.data);
    }
}

editor.init(checkPlay);



