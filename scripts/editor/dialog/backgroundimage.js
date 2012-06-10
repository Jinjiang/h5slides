define({
    build: function (dialogContent) {
        dialogContent.html('<p><input type="file"></p>' +
            '<div class="preview" style="height: 100px; background-repeat: no-repeat; background-position: center center; background-size: contain;"></div>');
        dialogContent.find('input').bind('change', function (e) {
            var input = dialogContent.find('input');
            var file = dialogContent.find('input')[0].files[0];
            var value = 'none';
            if (file) {
                var url = window.webkitURL.createObjectURL(file);
                value = 'url(' + url + ')'
            }
            var preview = dialogContent.find('.preview').
                css('background-image', value);
        })
    },
    update: function (dialogContent, value) {
        dialogContent.find('.preview').css('background-image', value);
    },
    remove: function (dialogContent) {
        dialogContent.html('');
    },
    val: function (dialogContent) {
        var input = dialogContent.find('input');
        var file = dialogContent.find('input')[0].files[0];
        var value = 'none';
        if (file) {
            var url = window.webkitURL.createObjectURL(file);
            value = 'url(' + url + ')'
        }
        return value;
    }
});