define(['types/text', 'types/img',  'types/video', 'types/code'], function (textManager, imgManager, videoManager, codeManager) {

    // for each type
    //   unscalable
    //   init(): initiation
    //   preview(data, dom): preview in editor
    //   resize(data, dom): resize in editor when layout changed
    //   adjust(dom): resize in player when a unscalable item set current
    //   edit(key, page, data, dom): handler when click item in editor
    //   build(data, dom): prepare to display in player
    //   show(dom): handler when show the current page in player
    //   hide(dom): handler when show another page in player

    return {
        text: textManager,
        img: imgManager,
        video: videoManager,
        code: codeManager
    };
});