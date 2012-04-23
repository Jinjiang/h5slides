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


    function parse(presentation) {
        var slides = presentation.slides;
        var defaultLayout = 'normal';
        var defaultTransition = 'transition_horizontal3d';

        that.notify('loadcss', defaultTransition);

        root.empty();

        $.each(slides, function (i, slide) {
            var section = $('<section></section>').appendTo(root);

            var layout = slide.layout || defaultLayout;
            section.attr('data-layout', layout);

            var transition = slide.transition || defaultTransition;
            section.attr('data-transition', transition);

            var layoutHtml =
                    '<div class="header"></div>' +
                    '<div class="content"></div>';
            section.html(layoutHtml);

            var header = section.find('.header');
            var content = section.find('.content');

            var titleHtml = txt2Html(slide.content.title || '');
            var subtitleHtml = txt2Html(slide.content.subtitle || '');
            var subtitle2Html = txt2Html(slide.content.subtitle2 || '');
            var contentHtml = txt2Html(slide.content.content || '');
            var content2Html = txt2Html(slide.content.content2 || '');

            if (slide.content.slide) {
                section.css('background-image', 'url(' + slide.content.slide + ')');
            }

            titleHtml = '<div data-item="title">' + titleHtml + '</div>';
            subtitleHtml = '<div data-item="subtitle">' + subtitleHtml + '</div>';
            subtitle2Html = '<div data-item="subtitle2">' + subtitle2Html + '</div>';
            contentHtml = '<div data-item="content">' + contentHtml + '</div>';
            content2Html = '<div data-item="content2">' + content2Html + '</div>';


            if (layout == 'double') {
                contentHtml = contentHtml + content2Html;
            }
            if (layout == 'double-subtitle') {
                contentHtml = subtitleHtml + contentHtml + subtitle2Html + content2Html;
            }

            header.html(titleHtml);
            content.html(contentHtml);

            if (slide.style) {
                $.each(slide.style, function (itemName, styles) {
                    var item;
                    if (itemName == 'slide') {
                        item = section;
                    }
                    else {
                        item = section.find('[data-item="' + itemName + '"]');
                    }
                    $.each(styles, function (key, value) {
                        if (key == '-ppt-size') {
                            if (value && value != 'normal') {
                                item.addClass(value + '-font-size');
                            }
                        }
                        else {
                            item.css(key, value);
                        }
                    });
                });
            }
            if (slide.position) {
                $.each(slide.position, function (itemName, styles) {
                    var item;
                    if (itemName == 'slide') {
                        item = section;
                    }
                    else {
                        item = section.find('[data-item="' + itemName + '"]');
                    }
                    $.each(styles, function (key, value) {
                        item.css(key, value);
                    });
                });
            }

        });

        sectionList = root.find('section');
        pageLength = sectionList.length;
    }


    function play(initPageNum) {
        player.addClass('play');
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
        currentSection = $(sectionList[pageNum - 1]).addClass('current');
        prevSection = currentSection.prev().addClass('prev');
        nextSection = currentSection.next().addClass('next');

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

        if (location.hash.length > 1) {
            nav(parseInt(location.hash.substr(1)) || 0);
        }

        if (!eventBinding) {
            bind();
        }
    }


    function nav(newPageNum, hasLastAction) {
        newPageNum = parseInt(newPageNum) || 0;

        if (newPageNum < 1) {
            return;
        }
        if (newPageNum > pageLength) {
            end();
            return;
        }

        if (newPageNum == pageNum) {
            return;
        }

        pageNum = newPageNum || 0;

        actionList.removeClass('shown current next prev');

        currentSection.removeClass('current');
        prevSection.removeClass('prev');
        nextSection.removeClass('next');

        currentSection = $(sectionList[pageNum - 1]).addClass('current');
        prevSection = currentSection.prev().addClass('prev');
        nextSection = currentSection.next().addClass('next');

        // location = '#' + pageNum;

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


    function action(isBackward) {

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

        currentAction.removeClass('current');
        nextAction.removeClass('next');
        prevAction.removeClass('prev');

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


    function bind() {
        function bindKB() {
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
        function bindMouse() {

        }
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


    function init(presentation) {
        parse(presentation);
        play();
        if (touchMode) {
            player.addClass('touch');
            alert('请用 ← 或 → 滑动播放\n滑动到最后一张幻灯片可结束播放');
        }
        playing = true;
        document.body.className = 'playing';
    }

    function end() {
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
    }

    this.play = init;
    this.end = end;
}

reg(Player);



