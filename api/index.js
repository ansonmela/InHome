const controller = require('../api/controllers/controller');
const fs = require('file-system');
const express = require('express');
var app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/customer/get', controller.getAllCustomers);
app.post('/customer/create', controller.createCustomer);
app.put('/customer/update/:id', controller.updateCustomer);
app.post('/customer/order/create', controller.createCustomerOrder);
app.put('/customer/order/update/item/:order_ID/:item_ID', controller.customerOrderUpdate);
app.delete('/customer/order/delete/item/:order_ID/:item_ID', controller.deleteCustomerOrderItem);
app.get('/recommendation', controller.recommendation);


const PORT = 3000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

