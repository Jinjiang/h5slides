requirejs(
    [],
    function () {
        var templateList = [
                {key: 'normal', layout: 'normal', typeMap: {title: 'text', content: 'text'}},
                {key: 'title', layout: 'title', typeMap: {title: 'text', content: 'text'}},
                {key: 'picture', layout: 'normal', typeMap: {title: 'text', content: 'picture'}}
            ];
        var designList = [
                {key: 'default', title: 'Default'},
                {key: 'revert', title: 'Revert'}
            ];

        var data = {
            design: 'default',
            title: 'Test A',
            slides: [
                {template: 'title', layout: 'title', items: {title: {type: 'text', value: 'Hello World'}, content: {type: 'text', value: 'test info'}}},
                {template: 'subtitle', layout: 'subtitle', items: {title: {type: 'text', value: 'Content'}, content: {type: 'text', value: 'this is the menu here.'}}},
                {template: 'picture', layout: 'normal', items: {title: {type: 'text', value: 'Favicon'}, content: {type: 'img', value: 'http://www.baidu.com/favicon.ico'}}}
            ]
        };

        var pageList = [
                {title: 'Hello World'},
                {title: 'Content'},
                {title: 'Favicon'}
            ]; // need build from data

        // designList **
        // tplList **
        // pageList **

        // currentDesign **
        // currentTpl **
        // currentPage **
        // currentLayout **

        // title *
        // editorVisibility *

        // currentItem
        // current<item>type
        // current<item>html
        // current<item>position

        // clickTpl *
        // clickDesign
        // clickPage *

        // addPage *
        // clonePage *
        // removePage *
        // nextPage *
        // prevPage *
        // moveUpPage *
        // moveDownPage *

        // clickSave
        // clickCancel

        // toggleTitle

        // clickStage
        // clickItem
        // dblclickItem

        var currentPage = 0;

        var vm = {
            title: ko.observable(data.title),
            titleEditorVisibility: ko.observable(false),
            designList: designList,
            tplList: templateList,
            pageList: ko.observableArray(pageList),
            currentDesign: ko.observable(data.design),
            currentPage: ko.observable(currentPage),
            currentTpl: ko.observable(data.slides[currentPage].template)
        };

        vm.currentLayout = ko.computed(function () {
            var layout;
            var currentTpl = vm.currentTpl();
            vm.tplList.forEach(function (template) {
                if (template.key == currentTpl) {
                    layout = template.layout;
                }
            });
            return layout;
        });

        vm.clickTpl = function (templateData, e) {
            vm.currentTpl(templateData.key);
        };
        vm.clickPage = function (pageData, e) {
            var $index = vm.pageList().indexOf(pageData);
            vm.currentPage($index);
        };
        vm.clickDesign = function (designData, e) {
            vm.currentDesign(designData.key);
        }

        vm.addPage = function () {
            var $index = vm.currentPage() + 1;
            vm.pageList.splice($index, 0, {title: 'new slide'});
            vm.currentPage($index);
        };
        vm.clonePage = function () {
            var $index = vm.currentPage();
            var page = vm.pageList.slice($index, $index + 1)[0];
            vm.pageList.splice($index + 1, 0, page);
            vm.currentPage($index + 1);
        };
        vm.removePage = function () {
            var $index = vm.currentPage();
            if (vm.pageList().length == 1) {
                return;
            }
            if ($index == vm.pageList().length - 1) {
                vm.currentPage($index - 1);
            }
            vm.pageList.splice($index, 1);
        };
        vm.nextPage = function () {
            var $index = vm.currentPage();
            if ($index < vm.pageList().length - 1) {
                vm.currentPage($index + 1);
            }
        };
        vm.prevPage = function () {
            var $index = vm.currentPage();
            if ($index > 0) {
                vm.currentPage($index - 1);
            }
        };
        vm.moveUpPage = function () {
            var page;
            var $index = vm.currentPage();
            if ($index > 0) {
                page = vm.pageList.splice($index, 1)[0];
                vm.pageList.splice($index - 1, 0, page);
                vm.currentPage($index - 1);
            }
        };
        vm.moveDownPage = function () {
            var $index = vm.currentPage();
            if ($index < vm.pageList().length - 1) {
                page = vm.pageList.splice($index, 1)[0];
                vm.pageList.splice($index + 1, 0, page);
                vm.currentPage($index + 1);
            }
        };

        ko.applyBindings(vm);
        window.vm = vm;
    }
);
