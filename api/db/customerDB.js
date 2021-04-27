const { fs } = require("file-system");

const getCustomerFromDB = () => {
    const filePath = 'api/data/customers.json';

    const dataFromFile = fs.readFileSync(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        return data;
    })

    return dataFromFile;
}

const createCustomerInDB = (customerJSON) => {
    customerJSON = JSON.parse(customerJSON);
    const dataPath = 'api/data/customers.json';

    let dataFromFile = fs.readFileSync(dataPath, function(err, data) {
        if (err) console.log(err);

        let jsonFromFile = JSON.parse(data);
        jsonFromFile.push(customerJSON);

    });

    let json = JSON.parse(dataFromFile);
    json.push(customerJSON);

    fs.writeFileSync(dataPath, JSON.stringify(json));

    return true;
} 

module.exports = {
    getCustomerFromDB,
    createCustomerInDB
}