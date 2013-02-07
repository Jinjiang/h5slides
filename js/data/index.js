define(['data/storage', 'data/status', 'data/template', 'data/transition', 'data/design', 'data/vm'],
    function (storage, status, template, transition, design, vm) {
        return {
            storage: storage,
            status: status,
            template: template,
            transition: transition,
            design: design,
            vm: vm
        };
    }
);