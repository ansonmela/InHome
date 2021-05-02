const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const app = require('../../start');
const helpers = require('../utils/utils');


const currentCustomers = helpers.readFromFile('api/data/customers.json', 'utf-8');

const createCustomerBody = {
    "name": "James Bond" 
}

const updatedCustomerBody = {
    "name": "updated Name"
}

const createCustomerOrder = {
    "customerID": 1,
    "itemID": 1,
    "quantity": 20
}


describe ("GET all customers", () => {
    it ("should return all customers in the db", async () => {
        let res = await chai.request(app).get('/customer/get');

        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(currentCustomers);
    })
})

describe("CREATE customer", () => {
    it ("should create a customer in the db", async () => {
        let res = await chai.request(app).post('/customer/create').send(createCustomerBody);

        expect(res.status).to.equal(201);
    })
})

describe("UPDATE customer", () => {
    before(async function() {
        await chai.request(app).post('/customer/create').send(createCustomerBody);
    })

    it ("should update a customer in the db", async () => {
        const customerData = helpers.readFromFile('api/data/customers.json', 'utf-8');
        let createdID = customerData[customerData.length - 1].id;

        let res = await chai.request(app).put(`/customer/update/${createdID.toString()}`).send(updatedCustomerBody);

        expect(res.status).to.equal(204);

    })
})

describe("CREATE customer order", () => {
    it ("should create an order for a customer", async () => {
        let res = await chai.request(app).post('/customer/order/create').send(createCustomerOrder);

        expect(res.status).to.equal(201);
    })
})

describe("UPDATE customer order", () => {
    before(async function() {
        await chai.request(app).post('/customer/order/create').send(createCustomerOrder);
    })


    it ("should update an order for a customer", async () => {
        const updatedOrder = {
            "order_quantity": 100
        }

        const customerOrderData = helpers.readFromFile('api/data/order_lines.json', 'utf-8');
        const lastCreatedOrder = customerOrderData[customerOrderData.length - 1];

        let res = await chai.request(app).
                            put(`/customer/order/update/item/${lastCreatedOrder.order_id.toString()}/${lastCreatedOrder.item_id.toString()}`).
                            send(updatedOrder);

        expect(res.status).to.equal(204);

    })
})

describe("DELETE customer order", () => {
    before(async function() {
        await chai.request(app).post('/customer/order/create').send(createCustomerOrder);
    })

    it ("should delete an order for a customer", async () => {
        const customerOrderData = helpers.readFromFile('api/data/order_lines.json', 'utf-8');
        const lastCreatedOrder = customerOrderData[customerOrderData.length - 1];

        let res = await chai.request(app).delete(`/customer/order/delete/item/${lastCreatedOrder.order_id.toString()}/${lastCreatedOrder.item_id.toString()}`);

        expect(res.status).to.equal(200);
    })
})


describe("GET recommendation (top 3 items ordered by quantity)", () => {

    it ("should get the top 3 ordered items and return the result as a string and status code of 200", async () => {
        let res = await chai.request(app).get('/recommendation');

        expect(res.status).to.equal(200);
        console.log("RECOMMENDATION: ", res.text);
        expect(res.text).to.be.a('string');
    })

})