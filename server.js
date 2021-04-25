import customers from './db/db';
import bodyParser from 'body-parser';

const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/api/v1/customers', function(req, res) {
   res.status(200).send({
       success: 'true',
       message: 'customers retrieved successfully',
       customers: customers
   })
});




const PORT = 3000;


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});