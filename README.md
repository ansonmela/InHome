# InHome

### Getting Started

1. Download this repo to your local machine.
2. Change directory to the level with the package.json file.
3. Run ```npm install``` to install all the necessary dependencies and get your node_modules into the project to have it ready for start up.
4. Then run ```npm test``` to see the integration tests in action, the tests make a call to each endpoint to verify the proper request/response flow is acheived for this API.
5. If you want to act as the client and make your own requests to the service, run ```npm start``` and the server should start up on ```localhost:3000```. 
6. Once the server is up, open up Postman or any other API client and make requests to each of the endpoints.
7. The endpoints are: 

GET: /customer/get 
<br/>
<br/>
POST: /customer/create 
<br/>
<br/>
```
ReqBody: { "name": "Test Name" } 
``` 
<br/>
<br/>
PUT: /customer/update/:customer_id 
<br/>
<br/>

```
ReqBody: { "name": "Updated Name" } 
``` 

<br/>
POST: /customer/order/create 
<br/>

```
ReqBody: {
    "customerID": 1,
    "itemID": 1,
    "quantity": 1
} 
```

PUT: /customer/order/update/item/:order_id/:item_id 
<br/>

```
ReqBody: {
   "order_quantity": 100
   }
```
<br/>

DELETE: /customer/order/delete/item/order_id/item_id 
<br/>
<br/>
GET: /recommendation 
<br/>
    
