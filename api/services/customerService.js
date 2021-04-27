const { getCustomerFromDB, createCustomerInDB } = require('../db/customerDB');

const getCustomers = async () => {
    try {
        return getCustomerFromDB()
    } catch (e) {
        throw new Error(e.message);
    }
}

const createCustomerService = async (id, customerName) => {
    console.log("YOOOO", customerName)

    let newCustomerJSON = {
        id: id,
        name: customerName
    }

    newCustomerJSON = JSON.stringify(newCustomerJSON);

    try {
        return createCustomerInDB(newCustomerJSON);
    } catch (e) {
        console.log("service");
        throw new Error(e.message);
    }
}


module.exports = {
    getCustomers,
    createCustomerService
}