define({
    onchange: null,
    change: function () {
        this.onchange && this.onchange();
    }
});