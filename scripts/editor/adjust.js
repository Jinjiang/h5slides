define(['data', 'status', 'editor/position', 'editor/resize', 'editor/preview'], function (data, status, positionManager, resizeMod, previewMod) {

    var layer = $('#adjust-layer');
    var slide = $('#slide');

    var btnMove = $('#adjust-move');
    var btnResize = $('#adjust-resize');

    var visibility = false;
    var movingStatus = {};
    var resizingStatus = {};

    function moveStart(e) {
        var offset = positionManager.offset(status.name);
        movingStatus.oriOffset = positionManager.offset(status.name);
        movingStatus.oriClientX = e.clientX;
        movingStatus.oriClientY = e.clientY;
        $('html').bind('mousemove', moveDoing);
        $('html').bind('mouseup', moveEnd);
        e.preventDefault();
    }

    function moveDoing(e) {
        var movingLeft = e.clientX - movingStatus.oriClientX;
        var movingTop = e.clientY - movingStatus.oriClientY;
        var screenLeft = movingStatus.oriOffset.left + movingLeft;
        var screenTop = movingStatus.oriOffset.top + movingTop;
        layer.css('left', screenLeft);
        layer.css('top', screenTop);
        var slideOffset = slide.offset();
        var realLeft = (screenLeft - slideOffset.left) / resizeMod.scale;
        var realTop = (screenTop - slideOffset.top) / resizeMod.scale;
        var position = {
            left: realLeft,
            top: realTop
        };
        positionManager.move(status.name, position);
        data.get(status.page).getItem(status.name).setPosition(position);
        mod.onpositionchange && mod.onpositionchange(status.page, status.name);
    }

    function moveEnd(e) {
        movingStatus = {};
        $('html').unbind('mousemove', moveDoing);
        $('html').unbind('mouseup', moveEnd);
    }


    function resizeStart(e) {
        var offset = positionManager.offset(status.name);
        resizingStatus.oriOffset = positionManager.offset(status.name);
        resizingStatus.oriClientX = e.clientX;
        resizingStatus.oriClientY = e.clientY;
        $('html').bind('mousemove', resizeDoing);
        $('html').bind('mouseup', resizeEnd);
        e.preventDefault();
    }

    function resizeDoing(e) {
        var movingLeft = e.clientX - resizingStatus.oriClientX;
        var movingTop = e.clientY - resizingStatus.oriClientY;
        var screenWidth = resizingStatus.oriOffset.width + movingLeft;
        var screenHeight = resizingStatus.oriOffset.height + movingTop;
        layer.css('width', screenWidth);
        layer.css('height', screenHeight);
        var realWidth = screenWidth / resizeMod.scale;
        var realHeight = screenHeight / resizeMod.scale;
        var size = {
            width: realWidth,
            height: realHeight
        };
        positionManager.move(status.name, size);
        data.get(status.page).getItem(status.name).setPosition(size);
        mod.onpositionchange && mod.onpositionchange(status.page, status.name);
    }

    function resizeEnd(e) {
        resizingStatus = {};
        $('html').unbind('mousemove', resizeDoing);
        $('html').unbind('mouseup', resizeEnd);
    }


    function edit(e) {
        var target = e.target;
        previewMod.editCurrent();
    }


    btnMove.bind('mousedown', moveStart);
    btnResize.bind('mousedown', resizeStart);
    layer.bind('mousedown', function (e) {
        e.preventDefault();
    }).dblclick(edit).doubleTap(edit);

    var mod = {
        init: function () {
            if (status.name == 'slide') {
                layer.hide();
                visibility = false;
            }
            else {
                visibility = true;
                layer.show();
                this.adjust();
            }
        },
        adjust: function () {
            if (visibility) {
                var offset = positionManager.offset(status.name);
                layer.css('left', offset.left);
                layer.css('top', offset.top);
                layer.css('width', offset.width);
                layer.css('height', offset.height);
            }
        }
    };

    return mod;
});