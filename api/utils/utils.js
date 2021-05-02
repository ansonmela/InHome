const { fs } = require("file-system");

module.exports = {
    readFromFile: function(filePath, encoding) {
        let response;
        response = fs.readFileSync(filePath, encoding, function(err, data) {
            if (err) console.log("File Read Error", err);
            return data;
        })

        return JSON.parse(response);
    },
    writeToFile: function(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
}