
const customerController = require('../api/controllers/customerController');
const fs = require('file-system');
const express = require('express');
var app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/customer/get', customerController.getAllCustomers);
app.post('/customer/create', customerController.createCustomer);


const PORT = 3000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

