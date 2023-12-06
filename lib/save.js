const fs = require('fs');
const path = require('path');

const save = {
    configPath: path.join(__dirname, '..','config.json'),
    getConfig: function() {
        const config = fs.readFileSync(this.configPath);
        const data = JSON.parse(config) || {};
        return data;
    },

    setCcbPath: function(path) {
        const data = this.getConfig();
        data.ccbOutputPath = path;
        fs.writeFileSync(this.configPath, JSON.stringify(data));
        Editor.log("保存成功:", path);
    },

    getCcbPath: function() {
        const data = this.getConfig();
        const path = data.ccbOutputPath || "";
        return path;
    },

    setImgPath: function(path) {
        const data = this.getConfig();
        data.imgOutputPath = path;
        fs.writeFileSync(this.configPath, JSON.stringify(data));
        Editor.log("保存成功:", path);
    },

    getImgPath: function() {
        const data = this.getConfig();
        const path = data.imgOutputPath || "";
        return path;
    }
}

module.exports = save;