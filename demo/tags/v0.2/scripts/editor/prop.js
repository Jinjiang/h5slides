define(['editor/prop/index'], function (propSet) {
    function get(key) {
        return propSet[key];
    }
    function reg(key, Prop) {
        propSet[key] = Prop;
    }

    var mod = {
        get: get,
        reg: reg
    };

    return mod;
});