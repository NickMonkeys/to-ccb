Editor.Panel.extend({
    style: '',

    template: `
    <div>
        <div>ccb导出路径：
            <ui-input id="ccbPath" type='file' placeholder="输入ccb导出路径"></ui-input>
            <ui-button id="saveCcbPath">保存</ui-button>
        </div>
        <div>img导出路径：
            <ui-input id="imgPath" type='file' placeholder="输入img导出路径"></ui-input>
            <ui-button id="saveImgPath">保存</ui-button>
        </div>
    </div>
    `,

    $: {
        ccbPath: '#ccbPath',
        imgPath: '#imgPath',
        saveCcbPath: '#saveCcbPath',
        saveImgPath: '#saveImgPath',
    },

    data: {},

    ready() {
        // 获取输入框数据
        this.$ccbPath.addEventListener('change', () => {
            this.data.ccbPath = this.$ccbPath.value;
            Editor.log('panel change ccbPath:', this.data.ccbPath);
        })
        this.$imgPath.addEventListener('change', () => {
            this.data.imgPath = this.$imgPath.value;
            Editor.log('panel change imgPath:', this.data.imgPath);
        })

        // 保存按钮回调，去保存数据
        this.$saveCcbPath.addEventListener('confirm', () => {
            const ccbPath = this.data.ccbPath;
            Editor.log('panel saveCcbPath:', ccbPath);
            Editor.Ipc.sendToMain('to-ccb:setCcbPath', ccbPath);
        })
        this.$saveImgPath.addEventListener('confirm', () => {
            const imgPath = this.data.imgPath;
            Editor.log('panel saveImgPath:', imgPath);
            Editor.Ipc.sendToMain('to-ccb:setImgPath', imgPath);
        })

        Editor.Ipc.sendToMain('to-ccb:page_loaded');
    },

    messages: {
        "to-ccb:panel_init" (event, args) {
            Editor.log('panel init:', args);
            this.$ccbPath.value = args.ccbPath;
            this.$imgPath.value = args.imgPath;
        }
    }
});