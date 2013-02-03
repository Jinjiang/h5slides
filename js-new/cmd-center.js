define(['title/output', 'toolbar/output', 'stage/output'], function (title, toolbar, stage) {
    stage.getItem('title').text('Hello World!');
    stage.getItem('content').text('This is a presentation by HTML5.');
    stage.setLayout('title');
    title.updateTitle('First Work');
    toolbar.setTextBtns(false);
    return {
        changeTitle: function (val) {
            title.updateTitle(val);
        },
        changeFontFamily: function (val) {
            stage.getItem('slide').css('font-family', val);
        },
        changeItem: function (key) {
            if (key) {
                console.log('change to', key);
            }
            else {
                console.log('cancel');
            }
        },
        focusItem: function (key) {
            console.log('focus', key);
        },
        blurItem: function (key) {
            console.log('blur', key);
        },
        reset: function () {
            console.log('reset');
        },
        preview: function () {
            console.log('preview');
        },
        publish: function () {
            console.log('publish');
        },
        remove: function () {
            console.log('remove');
        }
    };
});