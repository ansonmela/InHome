import bodyParser from 'body-parser';

const customerController = require('../api/controllers/customerController');
const fs = require('file-system');
const express = require('express');
const app = express();

let customerRoute = express.Router();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

customerRoute.get('/', customerController.getCustomersController);

app.use(customerRoute);


const PORT = 3000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});


module.exports = customerRoute;