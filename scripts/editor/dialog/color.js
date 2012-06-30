define(['lib/zepto', 'data', 'status', 'editor/dialog/elements'],
        function ($, data, status, elements) {
    var content = elements.content;

    function build() {
        content.html('TODO ...');
        update(data.get(status.page).getItem(status.name).getProp(status.prop));
    }
    function update(value) {
        content.find('.preview').css('background-color', value);
    }
    function clear() {
        content.html('');
    }
    function val() {
        return 'red';
    }

    return {
        build: build,
        udpate: update,
        clear: clear,
        val: val
    };
});