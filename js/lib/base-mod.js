/** Module Prototype Factory */




function reg(Mod) {
    Mod.prototype.notify = function (data, type) {
        if ($.isFunction(this.eventNotifier)) {
            this.eventNotifier(data, type);
        }
    };
    Mod.prototype.bind = function (notifier) {
        if ($.isFunction(notifier)) {
            this.eventNotifier = notifier;
            return true;
        }
        return false;
    };
    Mod.prototype.unbind = function () {
        this.eventNotifier = null;
    };
}



