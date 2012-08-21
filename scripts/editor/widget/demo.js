define(['lib/zepto','lib/wind'], function ($,Wind) {
    var mod = {
        editorConfig: {display: 'dialog', dialog: 'demo'},
        propList: [{key: '-val-demo', title: 'demo'}],
        render: function (item, itemData) {
            if(itemData.getValue()) {
                var data = JSON.parse(itemData.getValue());
            } else {
                var data = {html:"",script:""}
            }
            item.empty().html(data.html);
            var action = eval(Wind.compile("async","function(item){"+data.script+"}" ))();
            action.start();

        },
        preview: function (item, itemData) {
            if(itemData.getValue()) {
                var data = JSON.parse(itemData.getValue());
            } else {
                var data = {html:"",script:""}
            }         
            item.empty().html(data.html);
        }
    };
    return mod;
});