const fs = require('fs');
const path = require('path');

const save = {
    configPath: path.join(__dirname, '..','config.json'),
    getConfig: function() {
        Editor.log()
        const config = fs.readFileSync(this.configPath);
        const data = JSON.parse(config) || {};
        return data;
    },

    setOutput: function(path) {
        const data = this.getConfig();
        data.outputPath = path;
        fs.writeFileSync(this.configPath, JSON.stringify(data));
        Editor.log("保存成功:", path);
    },

    getOutput: function() {
        const data = this.getConfig();
        const path = data.outputPath || "";
        return path;
    }
}

module.exports = save;