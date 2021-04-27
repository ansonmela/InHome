const { getCustomers, createCustomerService } = require('../services/customerService.js');

const getAllCustomers = async (req, res, next) => {
    let resData;
    
    try {
        resData = await getCustomers();
        res.send(JSON.parse(resData));
    } catch (e) {
        console.log(e.message);
    }
    
    return resData;
}


const createCustomer = async(req, res, next) => {
    console.log("REQ BODY", req.body);
    let lastElement;

    try {
        let resFromFile = await getCustomers();
        lastElement = JSON.parse(resFromFile).pop();
    } catch (e) {
        console.log(e.message);
    }

    let newID = lastElement.id + 1;

    let newCustomerName = req.body.name;
    console.log(newCustomerName);

    try {
        await createCustomerService(newID, newCustomerName);
    } catch (e) {
        console.log("controller");
        console.log(e.message);
    }

    res.sendStatus(201);
    
}


module.exports = {
    getAllCustomers,
    createCustomer
}