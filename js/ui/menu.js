/**
    @fileOverview
    menu class
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    主菜单的构造器
    @constructor
 */
function Menu() {
    var labelName = $('#menu-title');
    var btnPlay = $('#menu-btn-play');
    var btnRestart = $('#menu-btn-restart');
    var that = this;
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
        var title = prompt('Please Input a Presentation Title', oldTitle);
        that.notify('title', title);
    });
    btnPlay.click(function () {
        that.notify('play');
    });
    btnRestart.click(function () {
        if (confirm('Are you sure to delete the current data and restart a new Presentation?')) {
            that.notify('restart');
        }
    });
    that.setTitle = setTitle;
}


reg(Menu);



