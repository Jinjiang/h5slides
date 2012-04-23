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

editor.init();



