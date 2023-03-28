'use strict';

const toCCB = require("./lib/toCCB");
const save = require("./lib/save");

const LANG_DATA = {
    "zh": ["新建", '转为ccb'],
    "en": ["Create", 'to ccb'],
};

const LANG_TYPE = {
    Create: 0,
    ToCCB: 1,
}

const filterData = LANG_DATA[Editor.lang];


module.exports = {
    load() {
        // hook 菜单
        if (!Editor.Menu["__hooked__"]) {
            Editor.Menu["__hooked__"] = true;
            Editor.Menu = hookMenu(Editor.Menu, this.hookMenuFunc.bind(this));
        }
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'openSetting' () {
            Editor.log('Hello World!', Editor.T('a'));
            Editor.Panel.open('to-ccb');
        },
        'setOutput' (event, path) {
            save.setOutput(path);
        },
        'page_loaded' () {
            const path = save.getOutput();
            const param = {
                path: path,
            };
            Editor.Ipc.sendToPanel('to-ccb', 'to-ccb:panel_init', param);
        }
    },
    
    hookMenuFunc(template) {
        const firstMenu = template[0];
        if(firstMenu.label === filterData[LANG_TYPE.Create]) {
            const line = { type: 'separator' };
            const toCCBMenu = {
                label: filterData[LANG_TYPE.ToCCB],
                click: this.toCCB.bind(this),
            };
            template.splice(1, 0, line, toCCBMenu);
        }
    },

    toCCB() {
        Editor.log("toCCB()");
        let currentSelection = Editor.Selection.curSelection('asset');
        if (currentSelection.length > 0) {
            Editor.success("---开始进行转化----")
            let selectionUUid = currentSelection[0];
            let selectionUrl = Editor.assetdb.uuidToUrl(selectionUUid);
            Editor.log("url :" + selectionUrl);
            toCCB.startTrans(selectionUrl);
        }else{
            Editor.warn("---无可操作对象----");
        }
    },
};

function hookMenu(orginMenu, hookFunc) {
    Editor.log(orginMenu, hookFunc);
    const menu = function () {
        hookFunc(...arguments);
        return new orginMenu(...arguments);
    };
    let menuProps = Object.getOwnPropertyNames(orginMenu);
    for (let prop of menuProps) {
        const object = Object.getOwnPropertyDescriptor(orginMenu, prop);
        if (object.writable) {
            menu[prop] = orginMenu[prop];
        }
    }
    menu.prototype = orginMenu.prototype;
    return menu;
}
