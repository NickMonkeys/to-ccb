Editor.Panel.extend({
    style: '',

    template: `
    <div>
        <div>导出路径：
            <ui-input id="file" type='file' placeholder="输入ccb导出路径"></ui-input>
            <ui-button id="btnOpen">保存</ui-button>
        </div>
    </div>
    `,

    $: {
        btnOpen: '#btnOpen',
        file: '#file',
    },

    data: {},

    ready() {
        this.$btnOpen.addEventListener('confirm', () => {
            const outupPath = this.data.outupPath;
            Editor.Ipc.sendToMain('to-ccb:setOutput', outupPath);
        })
        this.$file.addEventListener('change', () => {
            this.data.outupPath = this.$file.value;
        })

        Editor.Ipc.sendToMain('to-ccb:page_loaded');
    },

    messages: {
        "to-ccb:panel_init" (event, args) {
            Editor.log('panel init:', args);
            this.$file.value = args.path;
        }
    }
});