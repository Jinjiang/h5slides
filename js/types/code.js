define(['data', 'vm'], function (dataManager, vm) {
    var dialog = $('#code-dialog');
    var tabs = $('#code-manager-tabs');
    var codePanel = $('#code-panel');
    var demoPanel = $('#demo-panel');

    var codeInput = $('#code-input');
    var urlInput = $('#demo-url-input');
    var urlBtnRemove = $('#demo-url-remove');

    var currentData;

    function getCurrentKey() {
        return tabs.find('.active a').attr('data-key') || 'code';
    }

    function showData(data) {
        var key;

        if (data.config && data.config.type === 'demo') {
            key = 'demo';
            urlInput.val(data.value).focus();
        }
        else {
            key = 'code';
            codeInput.val(data.value).focus();
        }

        tabs.find('[data-key="' + key + '"]').tab('show');
    }

    function render(data, dom, placeHolder) {
        var contentDom;

        if (!data.value) {
            dom.text(placeHolder);
            return;
        }

        if (data.config && data.config.type == 'demo') {
            contentDom = $('<iframe class="code-item demo"></iframe>');
            contentDom.attr('frameborder', '0');
            contentDom.attr('src', data.value);
        }
        else {
            contentDom = $('<pre class="code-item code"></pre>');
            contentDom.html(hljs.highlightAuto(data.value).value);
        }

        contentDom.hide();
        dom.append(contentDom);
    }

    function resize(dom) {
        var width;
        var height;

        var contentDom = dom.find('.code-item');


        if (!contentDom || !dom) {
            return;
        }

        width = dom.width();
        height = dom.height();
        contentDom.css('width', width + 'px');
        contentDom.css('height', height + 'px');

        contentDom.show();
    }

    function save() {
        var currentKey = getCurrentKey();
        var newValue;

        if (currentKey === 'code') {
            newValue = codeInput.val();
        }
        else {
            newValue = urlInput.val();
        }

        if (!currentData.config) {
            currentData.config = {};
        }
        currentData.config.type = currentKey;

        dataManager.setValue(vm.currentPage(), vm.currentItem(), newValue);
    }

    return {
        init: function () {
            urlBtnRemove.click(function () {
                if (!currentData.config) {
                    currentData.config = {};
                }
                currentData.config.type = 'code';

                dataManager.setValue(vm.currentPage(), vm.currentItem(), '');
                dialog.modal('hide');
            });

            dialog.on('hidden', function () {
                vm.finishEdit();
            });

            dialog.find('[data-action="save"]').click(save);
        },
        preview: function (data, dom) {
            render(data, dom, 'NO ANY ODE & DEMO HERE :-(');
            resize(dom);
        },
        resize: function (data, dom) {
            resize(dom);
        },
        edit: function (key, page, data, dom) {
            currentData = data;
            dialog.modal('show');
            showData(data);
        },
        build: function (data, dom) {
            render(data, dom, '');
        },
        show: function (dom) {
            resize(dom);
        },
        hide: function (dom) {
        }
    };
});