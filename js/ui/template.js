define(['data/index'], function (data) {
    var vm = data.vm;
    vm.templateList = ko.observableArray(data.template);
    vm.currentTemplate = ko.observable('title');
});