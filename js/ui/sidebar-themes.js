/**
    @fileOverview
    aside theme list
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    侧边栏中主题列表的构造器
    @constructor
 */
function Themes() {
    var root = $('#panel-themes');
    var list = $('#panel-themes-list');

    var current;
    var that = this;

    function initData(themeArray) {
        list.empty();
        $.each(themeArray, function (index, theme) {
            var imageSrc = 'css/theme/' + theme.key + '/logo.png';
            var li = $('<li><img /></li>').
                attr('title', theme.title).
                attr('data-key', theme.key);
            li.find('img').
                attr('src', imageSrc).
                attr('alt', theme.title);
            list.append(li);
        });
    }

    /**
        设置当前选中项
     */
    function setCurrent(key) {
        list.find('li').each(function (index, item) {
            item = $(item);
            if (item.attr('data-key') == key) {
                if (current) {
                    current.removeClass('current');
                }
                item.addClass('current');
                current = item;
            }
        });
        that.notify('loadcss', 'theme_' + key);
    }

    list.delegate('li', 'click', function () {
        var key = $(this).attr('data-key');
        that.notify('theme', key);
    });

    this.initData = initData;
    this.current = current;
    this.setCurrent = setCurrent;
}


reg(Themes);



