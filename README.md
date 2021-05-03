# InHome

### Getting Started

1. Download or clone this repo to your local machine.
2. Change directory to the level with the package.json file.
3. Run ```npm install``` to install all the necessary dependencies and get your node_modules into the project to have it ready for start up.
4. Then run ```npm test``` to see the integration tests in action, the tests make a call to each endpoint to verify the proper request/response flow is achieved for this API.
5. If you want to act as the client and make your own requests to the service, run ```npm start``` and the server should start up on ```localhost:3000```. 
6. Once the server is up, open up Postman or any other API client and make requests to each of the endpoints.
7. The endpoints are: 

- **GET: /customer/get**
-**POST: /customer/create** 

    ```
    ReqBody: { "name": "Test Name" } 
    ``` 
- **PUT: /customer/update/:customer_id** 
    ```
    ReqBody: { "name": "Updated Name" } 
    ``` 
    
- **POST: /customer/order/create** 
    ```
    ReqBody: {
        "customerID": 1,
        "itemID": 1,
        "quantity": 1
    } 
    ```
- **PUT: /customer/order/update/item/:order_id/:item_id** 
    ```
    ReqBody: {
    "order_quantity": 100
    }
    ```
- **DELETE: /customer/order/delete/item/:order_id/:item_id** 
- **GET: /recommendation**

<br/>

### Pros and Cons of Recommendation Service

<br/>

#### Pros

    1. Shows the top 3 most ordered items by customers with a string that dynamically updated with each call to the service.
    2. The returned data could potentially be cached for up to a day for faster retrievals.
<br/>

#### Cons

    1. Pulls in whole data set for items and orders for each call, which could potentially be a bottleneck if multiple calls are sent at the same time. One way to mitigate this is with a cache, that would hold data for up to a day, which would essentially show the top 3 orders for the day or previous day.
    2. There could be more than 3 items with the same max number. But since we only want top 3, no criteria or logic to determine which item wins a tie. One potential solution to this would be a geographic or locale based recommendations, or a much complex algorithm that tailors top 3 based on customer interests.
