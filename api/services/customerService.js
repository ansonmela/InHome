const { getCustomerFromDB, 
        createCustomerInDB, 
        updateCustomerInDB, 
        createCustomerOrderInDB, 
        customerOrderUpdateInDB,
        deleteCustomerOrderItemInDB,
        recommendationFromDB 
    } = require('../db/customerDB');

const getCustomers = async () => {
    try {
        return getCustomerFromDB()
    } catch (e) {
        throw new Error(e.message);
    }
}

const createCustomerService = async (customerName) => {
    let lastElement;

    try {
        let resFromFile = await getCustomers();
        lastElement = resFromFile[resFromFile.length - 1];
    } catch (e) {
        console.log(e.message);
    }

    let newID = lastElement.id++;

    let newCustomerObject = {
        id: newID,
        name: customerName
    }

    try {
        return createCustomerInDB(newCustomerObject);
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
        throw new Error(e.message);
    }

}

const customerOrderUpdateService = async (orderID, orderQuantity, itemID) => {
    try {
        return customerOrderUpdateInDB(orderID, orderQuantity, itemID);
    } catch (e) {
        throw new Error(e.message);
    }
}

const deleteCustomerOrderItemService = async (orderID, itemID) => {
    let response = false;

    try {
        response = await deleteCustomerOrderItemInDB(orderID, itemID);
    } catch (e) {
        throw new Error(e.message);
    }
    
    if (response) {
        return true;
    } else {
        return false;
    }
}

const recommendationService = async () => {
    let dbData;

    let freqMap = {};

    try {
        dbData = await recommendationFromDB();
    } catch (e) {
        throw new Error(e.message);
    }

    const orderLines = dbData.orderLines;
    const items = dbData.items;

   for (var i = 0 ; i < orderLines.length; i++) {
       if (freqMap[orderLines[i].item_id] === undefined) {
           freqMap[orderLines[i].item_id] = 0;
       }

       freqMap[orderLines[i].item_id] += orderLines[i].qty;
   }


   const sortedKeys = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a]);

   const top3ItemIDs = [sortedKeys[0], sortedKeys[1], sortedKeys[2]];

   const top3ItemNames = [];

   for (var i = 0; i < top3ItemIDs.length; i++) {
       let currID = top3ItemIDs[i];

       for (var item of items) {
           if (currID == item.id) {
               top3ItemNames.push(item.name);
               break;
           }
       }
   }


   const recommendationString = `Our 3 most ordered items are: ${top3ItemNames[0]}, ${top3ItemNames[1]}, ${top3ItemNames[2]}. Make your orders for these hot products now!`;

    return recommendationString;
}


module.exports = {
    getCustomers,
    createCustomerService,
    updateCustomerService,
    createCustomerOrderService,
    customerOrderUpdateService,
    deleteCustomerOrderItemService,
    recommendationService
}