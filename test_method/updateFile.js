const fs = require('fs');

const updateFileContent = (filename, newContent) => {
    fs.writeFileSync(filename, newContent);
};

module.exports = {
    updateFileContent
}