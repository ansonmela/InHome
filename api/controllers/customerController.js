const { getCustomers } = require('../services/customerService.js');

const getCustomersController = async (req, res, next) => {
    let resData;
    
    try {
        resData = await getCustomers();
        res.send(JSON.parse(resData));
        next();
    } catch (e) {
        console.log(e.message);
    }
    
    return resData;
}


module.exports = {
    getCustomersController
}