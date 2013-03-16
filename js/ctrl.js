define(function () {
    var STAGE_WIDTH = 640;
    var STAGE_HEIGHT = 480;
    var MIN_UNIT = 20;

    var currentMenu;

    function toggleMenu(menu) {
        if (menu.attr('data-shown')) {
            hideMenu(menu);
        }
        else {
            showMenu(menu);
        }
    }

    function showMenu(menu) {
        menu.attr('data-show', 'true');

        setTimeout(function () {
            menu.attr('data-shown', 'true');
            currentMenu = menu;
        }, 13);
    }

    function hideMenu(menu) {
        currentMenu = null;

        menu.removeAttr('data-shown');
        menu.removeAttr('data-extended');

        setTimeout(function () {
            menu.removeAttr('data-extend');
        }, 513);
        setTimeout(function () {
            menu.removeAttr('data-show');
        }, 513);
    }

    function toggleMoreMenu(menu) {
        if (menu.attr('data-extended')) {
            hideMoreMenu(menu);
        }
        else {
            showMoreMenu(menu);
        }
    }

    function showMoreMenu(menu) {
        menu.attr('data-extend', 'true');

        setTimeout(function () {
            menu.attr('data-extended', 'true');
        }, 13);
    }

    function hideMoreMenu(menu) {
        menu.removeAttr('data-extended');

        setTimeout(function () {
            menu.removeAttr('data-extend');
        }, 513);
    }

    function startDrag(e, dragTo, finish) {
        var ori = {};
        var win = $(window);
        var target = $(e.target);
        var type = e.type;
        var offset = {};

        function readXY(e, dest) {
            try {
                if (type == 'touchstart') {
                    e = e.originalEvent.touches[0];
                }
                dest.x = e.clientX;
                dest.y = e.clientY;
            }
            catch (ex) {
                console.log(e);
            }
        }

        function move(e) {
            var cur = {};

            e.preventDefault();

            readXY(e, cur);
            offset.x = cur.x - ori.x;
            offset.y = cur.y - ori.y;

            if (!draggingFlag) {
                if (Math.abs(offset.x) + Math.abs(offset.y) > 5) {
                    draggingFlag = true;
                }
            }
            else {
                dragTo(offset);
            }
        }

        function end(e) {
            var cur = {};
            var offset = {};

            if (draggingFlag) {
                e.preventDefault();
                finish(offset);
                setTimeout(function () {
                    draggingFlag = false;
                }, 13);
            }

            target.css('cursor', '');

            if (type == 'touchstart') {
                win.unbind('touchmove', move);
                win.unbind('touchend', end);
            }
            else {
                win.unbind('mousemove', move);
                win.unbind('mouseup', end);
            }
        }

        draggingFlag = false;

        readXY(e, ori);

        target.css('cursor', 'move');

        if (type == 'touchstart') {
            win.bind('touchmove', move);
            win.bind('touchend', end);
        }
        else {
            e.preventDefault();
            win.bind('mousemove', move);
            win.bind('mouseup', end);
        }
    }

    function adjustChanges(status, changes, mode, verticalAlign) {
        var left = status.left + (changes.left || 0);
        var top = status.top + (changes.top || 0);
        var width = status.outerWidth + (changes.width || 0);
        var height = status.outerHeight + (changes.height || 0);

        var widthExtra = status.outerWidth - status.width;
        var heightExtra = status.outerHeight - status.height;

        if (verticalAlign == 'bottom') {
            top = STAGE_HEIGHT - status.bottom - status.outerHeight + (changes.top || 0);
        }

        if (left < 0) {
            left = 0;
        }
        if (top < 0) {
            top = 0;
        }
        if (width < MIN_UNIT) {
            width = MIN_UNIT;
        }
        if (height < MIN_UNIT) {
            height = MIN_UNIT;
        }
        if (left + width > STAGE_WIDTH) {
            if (mode == 'move') {
                left = STAGE_WIDTH - width;
            }
            else {
                width = STAGE_WIDTH - left;
            }
        }
        if (top + height > STAGE_HEIGHT) {
            if (mode == 'move') {
                top = STAGE_HEIGHT - height;
            }
            else {
                height = STAGE_HEIGHT - top;
            }
        }

        return {
            left: left,
            top: top,
            width: width,
            height: height
        };
    }

    function initCtrl(root) {
        var btnStart;
        var menu;
        var btnMore;
        var btnResize;

        var verticalAlign = root.attr('data-key') == 'title' ? 'bottom' : 'top';

        var draggingFlag = false;

        function appendCtrl(root) {
            var templateSrc = (root.attr('data-key') == 'title') ?
                    $('#ctrl-template-title') :
                    $('#ctrl-template');
            var template = $.trim(templateSrc.text());
            var ctrlRoot = $(template);

            root.append(ctrlRoot);
            ctrlRoot.find('a').click(function (e) {
                e.preventDefault();
            });

            btnStart = root.find('.ctrl-start');
            menu = root.find('.ctrl-menu');
            btnResize = root.find('.ctrl-resize');

            if (menu.find('li').length > 3) {
                btnMore = menu.find('li:nth-child(3) a');
            }
            else {
                btnMore = $();
            }
        }

        function startMove(e) {
            var status = {
                left: parseInt(root.css('left')) || 0,
                top: parseInt(root.css('top')) || 0,
                bottom: parseInt(root.css('bottom')) || 0,
                width: parseInt(root.css('width')) || 0,
                height: parseInt(root.css('min-height')) || 0,
                outerWidth: root.outerWidth(),
                outerHeight: root.outerHeight()
            };

            startDrag(e, function (offset) {
                var changes = {
                    left: offset.x,
                    top: offset.y
                };

                var result = adjustChanges(status, changes, 'move', verticalAlign);

                root.css('left', result.left + 'px');
                if (verticalAlign == 'top') {
                    root.css('top', result.top + 'px');
                }
                else {
                    root.css('bottom', STAGE_HEIGHT - result.top - result.height + 'px');
                }
            }, function (offset) {
                ;
            });
        }
        function startResize(e) {
            var status = {
                left: parseInt(root.css('left')) || 0,
                top: parseInt(root.css('top')) || 0,
                bottom: parseInt(root.css('bottom')) || 0,
                width: parseInt(root.css('width')) || 0,
                height: parseInt(root.css('min-height')) || 0,
                outerWidth: root.outerWidth(),
                outerHeight: root.outerHeight()
            };

            startDrag(e, function (offset) {
                var changes = {
                    width: offset.x,
                    height: offset.y
                };

                var result = adjustChanges(status, changes, 'resize', verticalAlign);

                root.css('width', result.width + 'px');
                root.css('min-height', result.height + 'px');
                if (verticalAlign == 'bottom') {
                    root.css('bottom', STAGE_HEIGHT - result.top - result.height + 'px');
                }
            }, function (offset) {
                ;
            });
        }

        appendCtrl(root);

        btnStart.click(function (e) {
            e.preventDefault();
            if (!draggingFlag) {
                toggleMenu(menu);
            }
        });
        btnMore.click(function (e) {
            e.preventDefault();
            toggleMoreMenu(menu);
        });
        btnResize.click(function (e) {
            e.preventDefault();
        });
        btnStart.bind('mousedown', startMove);
        btnStart.bind('touchstart', startMove);
        btnResize.bind('mousedown', startResize);
        btnResize.bind('touchstart', startResize);
    }

    function mousedown(e) {
        var target = $(e.target);
        var menu = target.closest('.ctrl-menu');

        if (currentMenu && (!menu || !currentMenu.is(menu))) {
            hideMenu(currentMenu);
        }
        if (menu && menu.length) {
            currentMenu = menu;
        }
    }

    return {
        init: function (stage) {
            stage.find('[data-key]').each(function () {
                initCtrl($(this));
            });

            $(window).bind('mousedown', mousedown);
        }
    };
});