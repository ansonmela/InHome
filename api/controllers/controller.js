const { getCustomers, 
        createCustomerService, 
        updateCustomerService, 
        createCustomerOrderService, 
        customerOrderUpdateService,
        deleteCustomerOrderItemService,
        recommendationService 
    } = require('../services/customerService.js');

const getAllCustomers = async (req, res, next) => {
    let resData;
    
    try {
        resData = await getCustomers();
        res.send(resData);
    } catch (e) {
        console.log("controller", e.message);
    }
    
    return resData;
}


const createCustomer = async(req, res, next) => {
    let newCustomerName = req.body.name;

    try {
        await createCustomerService(newCustomerName);
    } catch (e) {
        console.log("controller", e.message);
    }

    res.sendStatus(201);
    
}

const updateCustomer = async (req, res, next) => {
    const customerID = req.params.customer_id;
    const customerNameToUpdate = req.body.name;

    try {
        await updateCustomerService(customerID, customerNameToUpdate);
    } catch (e) {
        console.log(e.message);
    }

    res.sendStatus(204);
}

const createCustomerOrder = async (req, res, next) => {
    const customerID = req.body.customerID;
    const itemID = req.body.itemID;
    const quantity = req.body.quantity;

    try {
        await createCustomerOrderService(customerID, itemID, quantity);
    } catch (e) {
        console.log(e.message);
    }

    res.sendStatus(201);
}

const customerOrderUpdate = async (req, res, next) => {
    const orderID = req.params.order_ID;
    const orderQuantity = req.body.order_quantity;
    const itemID = req.params.item_ID;

    if (orderQuantity === 0) {
        res.send({ error: "Updated order quantity cannot be 0"});
    } else {
        try {
            await customerOrderUpdateService(orderID, orderQuantity, itemID);
        } catch (e) {
            console.log(e.message);
        }
        
        res.sendStatus(204);
    }
}

const deleteCustomerOrderItem = async (req, res, next) => {
    const orderID = req.params.order_ID;
    const itemID = req.params.item_ID;

    let response;

    try {
        response = await deleteCustomerOrderItemService(orderID, itemID);
    } catch (e) {
        console.log("CONTROLLER", e.message);
    }

    if (response) {
        res.sendStatus(200);
    } else {
        res.send({error: "item to be deleted was not found"});
    }
}


const recommendation = async (req, res, next) => {
    let response;

    try {
        response = await recommendationService();
    } catch (e) {
        console.log("CONTROLLER", e.message);
    }

    res.send(response);
}


module.exports = {
    getAllCustomers,
    createCustomer,
    updateCustomer,
    createCustomerOrder,
    customerOrderUpdate,
    deleteCustomerOrderItem,
    recommendation
}