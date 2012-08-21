define(['lib/zepto', 'data', 'status', 'editor/dialog/elements', 'editor/dialog/img_files'],
        function ($, data, status, elements, files) {
    var content = elements.content;

    function build() {
        content.html('<p><textarea id="html" style="width:900px;height:200px;"></textarea></p><p><textarea id="javascript"  style="width:900px;height:200px;"></textarea></p>');
        
        if(data.get(status.page).getItem(status.name).getProp("-val-demo")) {
            var d= JSON.parse(data.get(status.page).getItem(status.name).getProp("-val-demo"));
        } else {
            var d= {html:"",script:""}
        } 

        content.find('#html')[0].value = d.html;
        content.find('#javascript')[0].value = d.script;
/*
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
*/
    }
    function update(value) {
        content.find('.preview').html(value.html);
    }
    function clear() {
        content.html('');
    }
    function val() {
        var value = JSON.stringify({html:content.find('#html')[0].value, script:content.find('#javascript')[0].value});
        return value;

    }

    return {
        build: build,
        udpate: update,
        clear: clear,
        val: val
    };
});