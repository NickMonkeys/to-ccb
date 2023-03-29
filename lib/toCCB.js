const fs = require("fs");
const CCBModule = require("./CCBModule");
const PFModule = require("./PFModule");

const toCCB = {
    prefab: [],
    tempCCB: [],
    startTrans(selectionUrl){
        Editor.log("开始转换");
        this.tempCCB.length = 0;
        this.prefab.length = 0;
        ///加载对象
        let pfb = fs.readFileSync(Editor.url(selectionUrl, 'utf8'));
        this.prefab = JSON.parse(pfb);
        // 找出所有节点
        for (let i = 0,len = this.prefab.length; i < len; i++) {
            const pfbItem = this.prefab[i];
            const type = pfbItem["__type__"];
            if (type == "cc.Node") {
                this.createNode(pfbItem, i);
            }
        }
        // 根节点
        const root = this.tempCCB[1];
    },

    createNode(pfbNode, idx) {
        Editor.log("创建节点:", pfbNode._name);
        const ccbNode = this.copyTemp(CCBModule.CCBNode);
        if (this.tempCCB[idx]) {
            Editor.log("以及存在：Node ", idx);
            return;
        }
        // 记录节点
        this.tempCCB[idx] = ccbNode;

        // 获取基础属性
        const position = ccbNode.properties[0];
        const anchor = ccbNode.properties[1];
        const scale = ccbNode.properties[2];

        // 设置位置
        position.value[0] = pfbNode._trs.array[0];
        position.value[1] = pfbNode._trs.array[1];

        // 设置锚点
        anchor.value[0] = pfbNode._anchorPoint.x;
        anchor.value[1] = pfbNode._anchorPoint.y;

        // 设置缩放
        scale.value[0] = pfbNode._trs.array[7];
        scale.value[0] = pfbNode._trs.array[8];

        // 设置父节点
        const pfbParent = pfbNode._parent;
        if (pfbParent) {
            const parent =  this.tempCCB[pfbParent.__id__];
            if (parent) {
                parent.children.push(ccbNode);
            } else {
                Editor.log("没找到父节点:", pfbNode);
            }
        }

        // 添加组件
        const components = pfbNode._components;
        for (let index = 0; index < components.length; index++) {
            const ele = components[index];
            const pfbCom = this.prefab[ele.__id__];
            const type = pfbCom["__type__"];
            switch (type) {
                case "cc.Sprite":
                    this.addSprite(ccbNode, pfbCom);
                    break;
                case "cc.Label":
                    this.addLabel(ccbNode, pfbCom);
                    break;
                default:
                    break;
            }
        }
    },

    addSprite(ccbNode, pfbCom) {
        Editor.log("添加组件:Sprite");
        ccbNode.baseClass = "CCSprite";
        const sprite = {
            "name": "displayFrame",
            "type": "SpriteFrame",
            "value": [
                "",
                "clickme.png"
            ]
        };
        if (pfbCom._atlas) {
            const uuid = pfbCom._atlas.__uuid__;
            const url = Editor.assetdb.uuidToUrl(uuid);
            Editor.log('Atlas url:', url);
            let arr = url.split("/");
            arr = arr.splice(2);
            sprite.value[0] = arr.join('/');
        }
        if (pfbCom._spriteFrame) {
            const uuid = pfbCom._spriteFrame.__uuid__;
            const url = Editor.assetdb.uuidToUrl(uuid);
            Editor.log('SpriteFrame url:', url);
            if (pfbCom._atlas) {
                let arr = url.split("/");
                arr = arr.splice(arr.length - 1, 1);
            } else {
                let arr = url.split("/");
                arr = arr.splice(2, arr.length - 3);
            }
            sprite.value[1] = arr.join('/');
        }
        ccbNode.properties.push(sprite);
    },

    addLabel(ccbNode, pfbCom) {
        Editor.log("添加组件:Label");
        ccbNode.baseClass = "CCLabelTTF";
        const label = [
            {
                "name": "fontName",
                "type": "FontTTF",
                "value": "MarkerFelt-Thin"
            },
            {
                "name": "fontSize",
                "type": "FloatScale",
                "value": [
                    48,
                    1
                ]
            },
            {
                "name": "dimensions",
                "type": "Size",
                "value": [
                    0,
                    0,
                    0
                ]
            },
            {
                "name": "horizontalAlignment",
                "type": "IntegerLabeled",
                "value": 0
            },
            {
                "name": "verticalAlignment",
                "type": "IntegerLabeled",
                "value": 0
            },
            {
                "name": "string",
                "type": "Text",
                "value": "Hello CocosBuilder"
            }
        ];
        label[1].value[0] = pfbCom['_fontSize'];
        label[5].value = pfbCom['_string'];

        ccbNode.properties.push(...label);
    },

    copyTemp(data) {
        return JSON.parse(JSON.stringify(data));
    }
}

module.exports = toCCB;
