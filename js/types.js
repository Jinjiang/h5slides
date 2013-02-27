define(['types/text', 'types/img',  'types/video'], function (text, img, video) {

    // for each type
    //   init(): initiation
    //   preview(data, dom): preview in editor
    //   resize(data, dom): resize in editor when layout changed
    //   showEditor(key, page, data, dom): handler when click item in editor
    //   hideEditor(key, page, dom): hide the editor from external ctrl ?
    //   build(data, dom): prepare to display in player
    //   show(data, dom): handler when show the current page in player
    //   hide(data, dom): handler when show another page in player

    return {
        text: text,
        img: img,
        video: video
    };
});