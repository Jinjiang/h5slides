/**
    @fileOverview
    侧边栏
    @author Jinjiang<zhaojinjiang@yahoo.com.cn>
 */




/**
    侧边栏的构造器
    @constructor
 */
function Sidebar() {
    var panelList= $('#sidebar .panel');
    panelList.each(function (index, panel) {
        panel = $(panel);
        var header = panel.find('.header h3');
        header.click(function () {
            panel.toggleClass('expanded');
        })
    });
}



