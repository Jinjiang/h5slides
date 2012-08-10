define(['data', 'status', 'editor/position', 'editor/resize', 'editor/preview'], function (data, status, positionManager, resizeMod, previewMod) {

    var layer = $('#adjust-layer');
    var slide = $('#slide');

    var btnMove = $('#adjust-move');
    var btnResize = $('#adjust-resize');

    var visibility = false;
    var touchStatus = "createTouch" in document;

    function edit(e) {
        var target = e.target;
        previewMod.editCurrent();
    }


    function bindDnd(target, onchangeHandler) {
        var host = $('html');

        var startTarget = {};
        var startEvent = {};

        function startDrag(e) {
            e.preventDefault();
            startTarget = positionManager.offset(status.name);
            if (touchStatus) {
                startEvent.x = e.touches[0].pageX;
                startEvent.y = e.touches[0].pageY;
                host.on('touchmove', moveDrag);
                host.on('touchend', endDrag);
            }
            else {
                startEvent.x = e.clientX;
                startEvent.y = e.clientY;
                host.on('mousemove', moveDrag);
                host.on('mouseup', endDrag);
            }
        }

        function moveDrag(e) {
            var move = {};

            if (touchStatus) {
                move.x = e.touches[0].pageX - startEvent.x;
                move.y = e.touches[0].pageY - startEvent.y;
            }
            else {
                move.x = e.clientX - startEvent.x;
                move.y = e.clientY - startEvent.y;
            }

            onchangeHandler(startTarget, move);
        }

        function endDrag(e) {
            if (touchStatus) {
                host.off('touchmove', moveDrag);
                host.off('touchend', endDrag);
            }
            else {
                host.off('mousemove', moveDrag);
                host.off('mouseup', endDrag);
            }
        }

        if (touchStatus) {
            target.on('touchstart', startDrag);
        }
        else {
            target.on('mousedown', startDrag);
        }
    }

    bindDnd(btnMove, function (start, move) {
        var screenLeft = start.left + move.x;
        var screenTop = start.top + move.y;
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
    });

    bindDnd(btnResize, function (start, move) {
        var screenWidth = start.width + move.x;
        var screenHeight = start.height + move.y;
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
    });

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