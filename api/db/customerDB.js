const { fs } = require("file-system");
const helpers = require('../utils/utils');

const customersFilePath = 'api/data/customers.json';
const ordersFilePath = 'api/data/orders.json';
const orderLinesFilePath = 'api/data/order_lines.json';
const itemsFilePath = 'api/data/items.json';


const getCustomerFromDB = () => {
    const dataFromFile = helpers.readFromFile(customersFilePath, 'utf-8');

    return dataFromFile;
}

const createCustomerInDB = (customerJSON) => {
    let dataFromFile = helpers.readFromFile(customersFilePath, 'utf-8');
    dataFromFile.push(customerJSON);

    helpers.writeToFile(customersFilePath, dataFromFile);

    return true;
}

const updateCustomerInDB = (id, customerName) => {
    id = parseInt(id);

    let dataFromFile = helpers.readFromFile(customersFilePath, 'utf-8');

    for (const customer of dataFromFile) {
        if (customer.id === id) {
            customer.name = customerName;
            break;
        }
    }

    helpers.writeToFile(customersFilePath, dataFromFile);
}

const createCustomerOrderInDB = (customerID, itemID, quantity) => {
    let ordersFromFile = helpers.readFromFile(ordersFilePath, 'utf-8');

    let lastElement = ordersFromFile[ordersFromFile.length - 1];
    let nextOrderID = lastElement.id++;

    ordersFromFile.push({id: nextOrderID, user_id: customerID});

    helpers.writeToFile(ordersFilePath, ordersFromFile);

    let orderLinesFromFile = helpers.readFromFile(orderLinesFilePath, 'utf-8');

    orderLinesFromFile.push({order_id: nextOrderID, item_id: itemID, qty: quantity});

    helpers.writeToFile(orderLinesFilePath, orderLinesFromFile);

}

const customerOrderUpdateInDB = (orderID, orderQuantity, itemID) => {
    orderID = parseInt(orderID);
    itemID = parseInt(itemID);

    let orderLinesFromFile = helpers.readFromFile(orderLinesFilePath, 'utf-8');

    for (var i = 0; i < orderLinesFromFile.length; i++) {
        if (orderLinesFromFile[i].order_id === orderID && orderLinesFromFile[i].item_id === itemID) {
            orderLinesFromFile[i].qty = orderQuantity;
            break;
        }
    }

    helpers.writeToFile(orderLinesFilePath, orderLinesFromFile);

}

const deleteCustomerOrderItemInDB = (orderID, itemID) => {
    orderID = parseInt(orderID);
    itemID = parseInt(itemID);
    let found = false;

    let orderLinesFromFile = helpers.readFromFile(orderLinesFilePath, 'utf-8');

    for (var i = 0; i < orderLinesFromFile.length; i++) {
        if (orderLinesFromFile[i].order_id === orderID && orderLinesFromFile[i].item_id === itemID) {
            found = true;
            orderLinesFromFile.splice(i, 1);
            break;
        }
    }

    if (found) {
        helpers.writeToFile(orderLinesFilePath, orderLinesFromFile);
        return true;
    } else {
        return false;
    }
}

const recommendationFromDB = () => {
        let orderLinesFromFile = helpers.readFromFile(orderLinesFilePath, 'utf-8');
        let itemsFromFile = helpers.readFromFile(itemsFilePath, 'utf-8');

        return {orderLines: orderLinesFromFile, items: itemsFromFile};
}



module.exports = {
    getCustomerFromDB,
    createCustomerInDB,
    updateCustomerInDB,
    createCustomerOrderInDB,
    customerOrderUpdateInDB,
    deleteCustomerOrderItemInDB,
    recommendationFromDB
}