define({
    build: function (dialogContent) {
        dialogContent.html('currently not supported :-(');
    },
    update: function (dialogContent, value) {
        dialogContent.css('color', value);
    },
    remove: function (dialogContent) {
        dialogContent.empty();
    },
    val: function (dialogContent) {
        return 'red';
    }
});