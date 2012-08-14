define(['lib/zepto', 'data', 'editor/widget'], function ($, data, widgetManager) {

    /**
        @fileOverview
        播放器入口
        @author Jinjiang<zhaojinjiang@yahoo.com.cn>
     */




    /**
        对当前的幻灯片数据进行播放，在播放过程中，可以控制翻页或结束播放
        当播放至最后一页时，播放器会自动结束
     */
    function Player() {
        var player = $('#player-wrapper');
        var root = $('#player');
        var helper = $('#player-helper');
        var that = this;

        var sectionList;
        var pageNum;
        var pageLength;
        var currentSection;
        var nextSection;
        var prevSection;

        var actionList;
        var actionNum;
        var actionLength;
        var currentAction;
        var nextAction;
        var prevAction;

        var playing = false;
        var helperVisibility = false;
        var touchMode = "createTouch" in document;
        var compatibleMode = !window.HTMLVideoElement || window.innerWidth < 350;
        var eventBinding = false;

        /**
            调整画面尺寸
         */
        function resize() {
            var playerSize = {
                width: player.width(),
                height: player.height()
            };
            var slideSize = {
                width: 1000,
                height: 750
            };
            var scale = Math.min(playerSize.width / slideSize.width, playerSize.height / slideSize.height);
            root.css('-webkit-transform', 'scale(' + scale + ')').
                css('-moz-transform', 'scale(' + scale + ')').
                css('-ms-transform', 'scale(' + scale + ')').
                css('-o-transform', 'scale(' + scale + ')').
                css('-webkit-transform', 'scale(' + scale + ')');
            var widthDiff = playerSize.width - slideSize.width;
            if (widthDiff < 0) {
                root.css('margin', '0 ' + (widthDiff / 2) + 'px');
            }
            else {
                root.css('margin', 'auto');
            }
        }

        /**
            将幻灯片数据由json转换成html并作为dom插入到#player
            @param {object} data
         */
        function parse(data) {
            var length = data.getLength();
            var defaultLayout = 'normal';
            var design = data.getTheme();

            // that.notify('loadcss', defaultTransition);

            root.empty().attr('data-design', design);
            player.attr('data-background-design', design);

            function setMap(item, map) {
                if (map && item) {
                    $.each(map, function (k, v) {
                        item.css(k, v);
                    });
                }
            }

            // 插入每一张幻灯片
            for (var i = 1; i <= length; i++) {
                var page = data.get(i);
                var section = $('<section></section>').appendTo(root);

                // 设置布局信息和切换动画的信息
                var layout = page.getLayout() || defaultLayout;
                section.attr('data-layout', layout);

                // var transition = slide.transition || defaultTransition;
                // section.attr('data-transition', transition);

                // 生成幻灯片基本结构
                var layoutHtml =
                        '<div class="header"></div>' +
                        '<div class="content"></div>';
                section.html(layoutHtml);

                var header = section.find('.header');
                var content = section.find('.content');

                var titleHtml = '<div data-item="title"></div>';
                var subtitleHtml = '<div data-item="subtitle"></div>';
                var subtitle2Html = '<div data-item="subtitle2"></div>';
                var contentHtml = '<div data-item="content"></div>';
                var content2Html = '<div data-item="content2"></div>';

                // 根据不同的布局拼凑不同的html代码
                if (layout == 'double') {
                    contentHtml = contentHtml + content2Html;
                }
                if (layout == 'double-subtitle') {
                    contentHtml = subtitleHtml + contentHtml + subtitle2Html + content2Html;
                }

                header.html(titleHtml);
                content.html(contentHtml);

                $.each({
                    title: true,
                    subtitle: true,
                    subtitle2: true,
                    content: true,
                    content2: true,
                    slide: true
                }, function (k, v) {
                    var item = section.find('[data-item="' + k + '"]');
                    var itemData = page.getItem(k);
                    setMap(item, itemData.getPosition());
                    setMap(item, itemData.getStyle());
                    widgetManager.render(
                        item,
                        itemData
                    );
                });

            }

            // 初始化变量
            sectionList = root.find('section');
            pageLength = sectionList.length;
        }

        /**
            开始播放幻灯片
            @param {integer} initPageNum
         */
        function play(initPageNum) {
            player.addClass('play');

            // 初始化页数容错
            if (arguments.length > 0) {
                initPage = parseInt(initPageNum);
            }
            pageNum = initPageNum || 1;
            if (pageNum < 1) {
                pageNum = 1;
            }
            if (pageNum > pageLength) {
                pageNum = 1;
            }

            // 找到当前幻灯片
            currentSection = $(sectionList[pageNum - 1]).addClass('current');
            prevSection = currentSection.prev().addClass('prev');
            nextSection = currentSection.next().addClass('next');
            player.attr('data-background-layout', player.attr('data-background-design') + '_' + currentSection.attr('data-layout'));

            // 找到当前动画
            actionList = currentSection.find('[data-action]');
            actionLength = actionList.length;
            currentAction = nextAction = prevAction = $('<div></div>');

            if (actionLength > 0) {
                actionNum = 0;
                nextAction = $(actionList[0]);
            }
            else {
                actionNum = -1;
            }

            // 绑定各种鼠标键盘触摸事件
            if (!eventBinding) {
                bind();
            }
        }

        /**
            切换幻灯片
            @param {integer} newPageNum
            @param {boolean} hasLastAction 翻页的方向(true为反向，即保留上一页的所有页面内动画结果)
         */
        function nav(newPageNum, hasLastAction) {
            newPageNum = parseInt(newPageNum) || 0;

            // 页码容错
            if (newPageNum == pageNum) {
                return;
            }
            if (newPageNum < 1) {
                return;
            }

            // 如果目标超过了最后一页，则表示没有更多幻灯片了，演示结束
            if (newPageNum > pageLength) {
                end();
                return;
            }

            pageNum = newPageNum || 0;

            // 清除动画
            actionList.removeClass('shown current next prev');

            // 清除页面
            currentSection.removeClass('current');
            prevSection.removeClass('prev');
            nextSection.removeClass('next');

            // 设置新页面
            currentSection = $(sectionList[pageNum - 1]).addClass('current');
            prevSection = currentSection.prev().addClass('prev');
            nextSection = currentSection.next().addClass('next');
            player.attr('data-background-layout', player.attr('data-background-design') + '_' + currentSection.attr('data-layout'));

            // 设置新动画
            actionList = currentSection.find('[data-action]');
            actionLength = actionList.length;
            currentAction = nextAction = prevAction = $('<div></div>');

            if (actionLength > 0) {
                if (hasLastAction) {
                    actionNum = actionLength;
                    actionList.each(function (i, action) {
                        action = $(action);
                        if (i == actionLength - 1) {
                            currentAction = action.addClass('current');
                        }
                        else if (i == actionLength - 2) {
                            prevAction = action.addClass('prev');
                        }
                        else {
                            action.addClass('shown');
                        }
                    })
                }
                else {
                    actionNum = 0;
                    nextAction = $(actionList[0]).addClass('next');
                }
            }
            else {
                actionNum = -1;
            }
        }

        /**
            播放动画
            @param {boolean} isBackward 动画的方向(true为反向)
         */
        function action(isBackward) {

            // 判断特殊情况：无动画、在最后一帧动画向后播放、在第一帧动画向前播放
            if (actionNum == -1) {
                if (isBackward) {
                    nav(pageNum - 1, true);
                    return;
                }
                else {
                    nav(pageNum + 1);
                    return;
                }
            }
            else if (actionNum == 0 && isBackward) {
                nav(pageNum - 1, true);
                return;
            }
            else if (actionNum == actionLength && !isBackward) {
                nav(pageNum + 1);
                return;
            }

            // 清除动画
            currentAction.removeClass('current');
            nextAction.removeClass('next');
            prevAction.removeClass('prev');

            // 设置新动画
            if (isBackward) {
                actionNum--;
            }
            else {
                actionNum++;
                prevAction.addClass('shown');
            }

            currentAction = $(actionList[actionNum - 1]).addClass('current');
            nextAction = $(actionList[actionNum]).addClass('next');
            prevAction = $(actionList[actionNum - 2]).addClass('prev').removeClass('shown');

            if (currentAction[0].scrollIntoView) {
                currentAction[0].scrollIntoView();
                player[0].scrollLeft =
                player[0].scrollTop = 0;
            }
        }

        /**
            绑定各种播放事件
         */
        function bind() {

            /**
                绑定键盘事件
             */
            function bindKB(e) {
                $('html').bind('keydown', function (event) {
                    if (!playing) {
                        return;
                    }
                    var keyCode = event.keyCode;
                    switch (keyCode) {
                    case 33:
                        event.preventDefault();
                        nav(pageNum - 1, true);
                        break;
                    case 34:
                        event.preventDefault();
                        nav(pageNum + 1);
                        break;
                    case 35:
                        event.preventDefault();
                        nav(pageLength);
                        break;
                    case 36:
                        event.preventDefault();
                        nav(1);
                        break;
                    case 37:
                        event.preventDefault();
                        action(true);
                        break;
                    case 38:
                        event.preventDefault();
                        action(true);
                        break;
                    case 39:
                        event.preventDefault();
                        action();
                        break;
                    case 40:
                        event.preventDefault();
                        action();
                        break;
                    case 13:
                        event.preventDefault();
                        nav(pageNum + 1);
                        break;
                    case 27:
                        event.preventDefault();
                        end();
                        break;
                    case 71:
                        event.preventDefault();
                        nav(prompt('请输入您想要到达的页码：', pageNum));
                        break;
                    case 72:
                        event.preventDefault();
                        help();
                        break;
                    case 229:
                        event.preventDefault();
                        alert('请切换输入法到英文输入状态，以保证\n快捷键可以生效。谢谢。');
                        break;
                    default:
                        ;
                    }
                })
            }

            /**
                绑定鼠标事件
             */
            function bindMouse() {

            }

            /**
                绑定触摸事件
             */
            function bindTouch() {
                player.swipeLeft(function (e) {
                    action();
                });
                player.swipeRight(function (e) {
                    action(true);
                });
                player.longTap(function () {
                    end();
                })
                player.bind('touchstart', function (e) {
                    e.preventDefault();
                })
            }

            bindKB();
            bindTouch();
            bindMouse();
            eventBinding = true;
        }

        /**
            启动帮助信息功能
            未来会以一个插件的形式存在
         */
        function help() {
            var ul;
            var helperData;

            if (helperVisibility) {
                helper.hide();
                helperVisibility = false;
            }
            else {
                helper.empty();
                helperData = {
                    '回车': '后一个动画',
                    '上': '前一个动画',
                    '下': '后一个动画',
                    '左': '前一个动画',
                    '右': '后一个动画',
                    'PageUp': '前往前一页',
                    'PageDown': '前往后一页',
                    'Home': '前往第一页',
                    'End': '前往最后一页',
                    'G': '快速翻到任意页',
                    'H': '显示/隐藏帮助信息',
                    'ESC': '结束播放'
                };
                ul = $('<ul></ul>').appendTo(helper);
                $.each(helperData, function (key, value) {
                    $('<li></li>').text(key + ' → ' + value).appendTo(ul);
                });
                helper.show();
                helperVisibility = true;
            }
        }

        /**
            播放新的幻灯片
         */
        function init() {
            parse(data);
            play();
            if (touchMode) {
                player.addClass('touch');
                alert('请用 ← 或 → 滑动播放\n滑动到最后一张幻灯片可结束播放');
            }
            playing = true;
            document.body.className = 'playing';
            resize();
            $(window).bind('resize', resize);
        }

        /**
            结束幻灯演示
         */
        function end() {
            if (!that.previewMode) {
                alert('播放已结束，现在开始再次从头播放。');
                nav(1);
                return;
            }
            sectionList = null;
            pageNum = null;
            pageLength = null;
            currentSection = null;
            nextSection = null;
            prevSection = null;

            actionList = null;
            actionNum = null;
            actionLength = null;
            currentAction = null;
            nextAction = null;
            prevAction = null;

            root.empty();
            playing = false;
            player.removeClass('play touch');
            $('body').removeClass('playing');
            $(window).unbind('resize', resize);
        }

        this.play = init;
        this.end = end;
    }

    var player = new Player();

    return {
        init: function () {
        },
        play: function () {
            player.previewMode = false;
            player.play();
        },
        preview: function () {
            player.previewMode = true;
            player.play();
        },
        end: function () {
            player.end();
        }
    };
});