const { fs } = require("file-system");

const getCustomerFromDB = () => {
    const dataPath = 'api/data/customers.json';

    const dataFromFile = fs.readFileSync(dataPath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        return data;
    })

    return dataFromFile;
}

module.exports = {
    getCustomerFromDB
}