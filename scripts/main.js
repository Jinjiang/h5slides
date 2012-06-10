requirejs(['editor', 'player', 'manager', 'backend'],
    function (editor, player, manager, backend) {

    function load() {
        backend.import();
        setTimeout(function () {
            editor.load()
        }, 500);
    }

    editor.init();
    player.init();
    manager.init();
    backend.init();

    manager.onplay = player.play;
    manager.onend = player.end;
    manager.onsave = backend.export;
    manager.onreset = load;

    load();
});