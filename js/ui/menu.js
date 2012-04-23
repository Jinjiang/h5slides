/**
    @fileOverview
    头部菜单
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    头部菜单的构造器
    @constructor
 */
function Menu() {
    var labelName = $('#menu-title');
    var btnPlay = $('#menu-btn-play');
    var btnRestart = $('#menu-btn-restart');
    var that = this;

    /**
        设置标题
        @param {string} title
        @param {boolean} isCustomized 标题是否是用户自定义的，否则是自动生成的
     */
    function setTitle(title, isCustomized) {
        labelName.text(title || '无');
        if (isCustomized) {
            labelName.addClass('customized');
        }
        else {
            labelName.removeClass('customized');
        }
    }

    labelName.click(function () {
        var oldTitle = '';
        if (labelName.hasClass('customized')) {
            oldTitle = labelName.text();
        }
        var title = prompt('请输入演示的标题', oldTitle);
        that.notify('title', title);
    });
    btnPlay.click(function () {
        that.notify('play');
    });
    btnRestart.click(function () {
        if (confirm('你确定丢掉当前所有数据重新开始制作新的幻灯演示吗？')) {
            that.notify('restart');
        }
    });

    that.setTitle = setTitle;
}


reg(Menu);



