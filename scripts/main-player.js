requirejs(['player', 'backend', 'data', 'stylesheet'],
    function (player, backend, data, stylesheet) {

    function load() {
        backend.import();
        setTimeout(function () {
            stylesheet.load('theme', data.getTheme());
            player.play();
        }, 500);
    }

    player.init();
    backend.init();

    load();
});