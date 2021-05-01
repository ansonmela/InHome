const { fs } = require("file-system");

const customersFilePath = 'api/data/customers.json';
const ordersFilePath = 'api/data/orders.json';
const orderLinesFilePath = 'api/data/order_lines.json';


const getCustomerFromDB = () => {
    const dataFromFile = fs.readFileSync(customersFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }

        return data;
    })

    return dataFromFile;
}

const createCustomerInDB = (customerJSON) => {
    customerJSON = JSON.parse(customerJSON);

    let dataFromFile = fs.readFileSync(customersFilePath, function(err, data) {
        if (err) console.log(err);

        let jsonFromFile = JSON.parse(data);
        jsonFromFile.push(customerJSON);

    });

    let json = JSON.parse(dataFromFile);
    json.push(customerJSON);

    fs.writeFileSync(dataPath, JSON.stringify(json));

    return true;
}

const updateCustomerInDB = (id, customerName) => {
    id = parseInt(id);

    let dataFromFile = fs.readFileSync(customersFilePath, function(err, data) {
        if (err) console.log(err);

        return data;
    })

    dataFromFile = JSON.parse(dataFromFile);

    for (const customer of dataFromFile) {
        if (customer.id === id) {
            customer.name = customerName;
            break;
        }
    }

    fs.writeFileSync(dataPath, JSON.stringify(dataFromFile));
}

const createCustomerOrderInDB = (customerID, itemID, quantity) => {
    let ordersFromFile = fs.readFileSync(ordersFilePath, function(err, data) {
        if (err) console.log(err);

        return data;
    });

    ordersFromFile = JSON.parse(ordersFromFile);

    let lastElement = ordersFromFile[ordersFromFile.length - 1];
    let nextOrderID = lastElement.id + 1;

    ordersFromFile.push({id: nextOrderID, user_id: customerID});

    fs.writeFileSync(ordersFilePath, JSON.stringify(ordersFromFile));


    let orderLinesFromFile = fs.readFileSync(orderLinesFilePath, function(err, data) {
        if (err) console.log(err);

        return data;
    });

    orderLinesFromFile = JSON.parse(orderLinesFromFile);

    orderLinesFromFile.push({order_id: nextOrderID, item_id: itemID, qty: quantity});

    fs.writeFileSync(orderLinesFilePath, JSON.stringify(orderLinesFromFile));
}

const customerOrderUpdateInDB = (orderID, orderQuantity, itemID) => {
    orderID = parseInt(orderID);
    itemID = parseInt(itemID);

    let orderLinesFromFile = fs.readFileSync(orderLinesFilePath, function(err, data) {
        if (err) console.log(err);
        return data;
    });

    orderLinesFromFile = JSON.parse(orderLinesFromFile);

    for (var i = 0; i < orderLinesFromFile.length; i++) {
        if (orderLinesFromFile[i].order_id === orderID && orderLinesFromFile[i].item_id === itemID) {
            orderLinesFromFile[i].qty = orderQuantity;
            break;
        }
    }

    fs.writeFileSync(orderLinesFilePath, JSON.stringify(orderLinesFromFile));
}



module.exports = {
    getCustomerFromDB,
    createCustomerInDB,
    updateCustomerInDB,
    createCustomerOrderInDB,
    customerOrderUpdateInDB
}