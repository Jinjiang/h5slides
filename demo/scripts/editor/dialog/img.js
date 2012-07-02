define(['lib/zepto', 'data', 'status', 'editor/dialog/elements'],
        function ($, data, status, elements) {
    var content = elements.content;

    function build() {
        content.html('<p><input type="file"></p>' +
            '<div class="preview"></div>');
        content.find('input').bind('change', function (e) {
            var input = content.find('input');
            var file = content.find('input')[0].files[0];
            var value = 'none';
            if (file) {
                var url = window.webkitURL.createObjectURL(file);
                value = 'url(' + url + ')'
            }
            var preview = content.find('.preview').
                css('background-image', value);
        });
        update(data.get(status.page).getItem(status.name).getProp(status.prop));
    }
    function update(value) {
        content.find('.preview').css('background-image', value);
    }
    function clear() {
        content.html('');
    }
    function val() {
        var input = content.find('input');
        var file = content.find('input')[0].files[0];
        var value = '';

        if (file) {
            value = window.webkitURL.createObjectURL(file);
        }
        if (status.prop == 'background-image') {
            if (value) {
                value = 'url(' + value + ')';
            }
            else {
                value = 'none';
            }
        }

        return value;
    }

    return {
        build: build,
        udpate: update,
        clear: clear,
        val: val
    };
});