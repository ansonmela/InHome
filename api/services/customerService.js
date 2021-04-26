const { getCustomerFromDB } = require('../db/customerDB');

const getCustomers = async () => {
    try {
        return await getCustomerFromDB()
    } catch (e) {
        throw new Error(e.message);
    }
}


module.exports = {
    getCustomers
}