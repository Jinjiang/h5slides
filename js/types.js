define(['types/text', 'types/img'], function (text, img) {

    // for each type
    //   init(): initiation
    //   preview(data, dom): preview in editor
    //   showEditor(key, page, data, dom): handler when click item in editor
    //   build(data, dom): prepare to display in player
    //   show(data, dom): handler when show the current page in player
    //   hide(data, dom): handler when show another page in player

    return {
        text: text,
        img: img
    };
});