const { getCustomerFromDB, 
        createCustomerInDB, 
        updateCustomerInDB, 
        createCustomerOrderInDB, 
        customerOrderUpdateInDB 
    } = require('../db/customerDB');

const getCustomers = async () => {
    try {
        return getCustomerFromDB()
    } catch (e) {
        throw new Error(e.message);
    }
}

const createCustomerService = async (id, customerName) => {
    let newCustomerJSON = {
        id: id,
        name: customerName
    }

    newCustomerJSON = JSON.stringify(newCustomerJSON);

    try {
        return createCustomerInDB(newCustomerJSON);
    } catch (e) {
        throw new Error(e.message);
    }
}


const updateCustomerService = async (id, customerName) => {
    try {
        return updateCustomerInDB(id, customerName);
    } catch (e) {
        throw new Error(e.message);
    }
}


const createCustomerOrderService = async (customerID, itemID, quantity) => {

    try {
        return createCustomerOrderInDB(customerID, itemID, quantity);
    } catch (e) {
        console.log(e.message);
    }

}

const customerOrderUpdateService = async (orderID, orderQuantity, itemID) => {
    try {
        return customerOrderUpdateInDB(orderID, orderQuantity, itemID);
    } catch (e) {
        console.log(e.message);
    }
}


module.exports = {
    getCustomers,
    createCustomerService,
    updateCustomerService,
    createCustomerOrderService,
    customerOrderUpdateService
}