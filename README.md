## Dragon Nest - Ecommerce

by : Edwin Satya Yudistira

#### Access

```http
server: http://localhost:3000/
client: http://localhost:8080/
Access: http://dragon-nest.edwinsatya.online/
```

#### Routes

Bellows are routes that used in the sever

- base routes USER url : http://localhost:3000/users/

  - POST : /signup

    - description : create new user

    - body :

      ```
      {
          name : String
          email : String
          password : String
      }
      ```

    - headers : none

    - response :

      - Success:

        Status Code : 201

        ```
        {
         "_id": "5dbf3cff9fde4d02bad97caf",
            "name": "karina",
            "email": "karina@gmail.com",
            "password": "$2a$10$rrpFvMcOj.nYGPA3EnV.puWXwa5DatjVwajcuRbpu.HPKE0NoTW/K",`
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : "Email already exits"}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - POST : /login

    - description : login user

    - body :

      ```
      {
          email : String
          password : String
      }
      ```

- headers : none
- response :

  - Success:
    Status Code : 200
    ````
          {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjY0ZDAzOTIzNGY3Mzg0NDM1NWEyYSIsImVtYWlsIjoiZWR3aW5AZ21haWwuY29tIiwibmFtZSI6ImVkd2luIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTc2NzE3MDg3fQ.s_G7B07AdB7y7KiOcOVyeOuiRPm3obIMvr4Fm5Eo3eA",
              "response": {
                  "_id": "5df64d039234f73844355a2a",
                  "name": "edwin",
                  "email": "edwin@gmail.com",
                  "password": "$2a$10$xLtZWCUQS87og4lTvKj6X.WtiFUvo./u8Eg6Qwk9d16FiDWndmNpO",
                "createdAt": "2019-12-15T15:10:59.729Z",
            "updatedAt": "2019-12-16T10:52:14.650Z",
                "role": "admin",
            "cash": 2500
            },
        "message": "Success Login"
          }
          ```

    ````
  - Error :

    Status Code : 400
      
     ```
    {"Message" : "Email already exits"}

    ````

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

    ````

  - GET: /

    - description : get value cash

    - body : none

    - headers : token

    - response :

      - Success:

        Status Code : 200

        ```
        {
          "_id": "5df1eb25508ff5236c5ad6cf",
            "name": "kirito",
            "email": "kirito@gmail.com",
            "password": "$2a$10$A0IHTDvAtXmL7.OV96llaOwFkAhZmEkw0pTWYHwvVcpJtVrAqSLBy",
            "createdAt": "2019-12-12T07:24:21.301Z",
            "updatedAt": "2019-12-18T10:16:44.019Z",
            "role": "customer",
            "cash": 6800
        }
        ```

      - Error :

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

    PATCH: /

    - description : add value cash

    - body :

      ```
      {
      	cash: '10000'
      }
      ```

  * headers : token

  * response :

    - Success:

      Status Code : 200

      ```
      {
        "_id": "5df1eb25508ff5236c5ad6cf",
          "name": "kirito",
          "email": "kirito@gmail.com",
          "password": "$2a$10$A0IHTDvAtXmL7.OV96llaOwFkAhZmEkw0pTWYHwvVcpJtVrAqSLBy",
          "createdAt": "2019-12-12T07:24:21.301Z",
          "updatedAt": "2019-12-18T10:16:44.019Z",
          "role": "customer",
          "cash": 10000
      }
      ```

    - Error :

      status Code : 500

      ```
      {"message": "internal server errpr"}
      ```

- base routes ITEM url : http://localhost:3000/items/

  - POST : /

    - description : Create Item

    - body :

      ```
      {
          name : String,
          stock : Number,
          category : String,
          price : Number,
          image : String
      }
      ```

    - headers : token

    - response :

      - Success:

        Status Code : 201

        ```
        {
            "response": {
                "_id": "5df64d039234f73844355a2a",
                "name": "overhoul",
                "stock": 10,
                "category": "newitem",
                "image": "http://naruto.jpg"
                "price": 1000
            },
            "message": "Success Create Item"
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - GET : /detail/:id:

    - description : Get Detail Item

    - body : none

    - params : req.params.id

    - headers : token

    - response :

      - Success:

        Status Code : 200

        ```
        {
            "_id": "5df6aba5fd03512ed6a6df00",
            "name": "OverHoul",
            "stock": 32,
            "category": "newitem",
            "price": 1000,
            "image": "https://storage.googleapis.com/img-dragon-nest/1576656818063-bestitem1.jpg"
            },

        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - GET : /

    - description : Get All Item

    - body : none

    - headers : token

    - response :

      - Success:

        Status Code : 200

        ```
        [
            {
                "_id": "5df6aba5fd03512ed6a6df00",
                "name": "OverHoul",
                "stock": 32,
                "category": "newitem",
                "price": 1000,
                "image": "https://storage.googleapis.com/img-dragon-nest/1576656818063-bestitem1.jpg"
            },
            {
                "_id": "5df6d0b756c99d5852e53619",
                "name": "valkyrie",
                "stock": 43,
                "category": "bestitem",
                "price": 3900,
                "image": "https://storage.googleapis.com/img-dragon-nest/1576494602426-bestitem4.jpg"
            }
        ]
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - DELETE : /:id:

    - description : Delete Item

    - body : none

    - params: req.params.id

    - headers : token

    - authorizationRole : true

    - response :

      - Success:

        Status Code : 200

        ```
        {
            "message": "Success delete item from your cart"
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - PUT : /:id:

    - description : Delete Item

    - body :

      ```
      {
          name : String,
          stock : Number,
          category : String,
          price : Number,
          image : String
      }
      ```


    - params: req.params.id

    - headers : token

    - authorizationRole : true

    - response :

      - Success:

        Status Code :  200

        ```
        {
            "response": {
                "_id": "5df64d039234f73844355a2a",
                "name": "overhoul",
                "stock": 10,
                "category": "newitem",
                "image": "http://naruto.jpg"
                "price": 1000
            },
            "message": "Success Update Item"
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

- base routes CART url : http://localhost:3000/carts/

  - POST : /

    - description : Create Cart

    - body :

      ```
      {
          count : 10,
          price : 2000,
          itemId : item in selected
      }
      ```

    - headers : token

    - response :

      - Success:

        Status Code : 201

        ```
        {
            "response": {
                "_id": "5dfad125f418327114b749eb",
                "userId": "5df1eb25508ff5236c5ad6cf",
                "itemId": "5df6aba5fd03512ed6a6df00",
                "count": 3,
                "totalPrice": 3000,
                "purchesed": false,
                "accepted": false
            },
            "message": "Success Add Item To Cart"
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - GET : /

    - description : Get Info Cart

    - body : none

    - headers : token

    - response :

      - Success:

        Status Code : 200

        ```
        [
            {
                "_id": "5df9ebae6fbc786ae281aca9",
                "userId": "5df1eb25508ff5236c5ad6cf",
                "itemId": {
                    "_id": "5df6aba5fd03512ed6a6df00",
                    "name": "OverHoul",
                    "stock": 32,
                    "category": "newitem",
                    "price": 1000,
                    "image": "https://storage.googleapis.com/img-dragon-nest/1576656818063-bestitem1.jpg"
                },
                "count": 2,
                "totalPrice": 2000,
                "purchesed": true,
                "accepted": true
            },
            {
                "_id": "5df9ebb36fbc786ae281acaa",
                "userId": "5df1eb25508ff5236c5ad6cf",
                "itemId": {
                    "_id": "5df6d0b756c99d5852e53619",
                    "name": "valkyrie",
                    "stock": 43,
                    "category": "bestitem",
                    "price": 3900,
                    "image": "https://storage.googleapis.com/img-dragon-nest/1576494602426-bestitem4.jpg"
                },
                "count": 1,
                "totalPrice": 3900,
                "purchesed": true,
                "accepted": true
            },
        ]
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - DELETE : /itemId

    - description : Delete Item From Cart

    - body : none

    - headers : token

    - params : req.params.itemId

    - response :

      - Success:

        Status Code : 200

        ```
        {
           "message": "Success Remove Item from your Cart"
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

  - PATCH : /

    - description : Checkout

    - body :

      ```
      {
      	cash: from cash user info
      }
      ```


    - headers : token

    - response :

      - Success:

        Status Code :  200

        ```
        {
            "message": "Success checkout, Your Cash Now 		18200"
        }
        ```

      - Error :

        Status Code : 400

        ```
        {"Message" : in error handler}
        ```

        status Code : 500

        ```
        {"message": "internal server errpr"}
        ```

- PATCH : / :itemId

  - description : Accept Item after checkout (customer)

  - body : none

  - params: req.params.itemId

  - headers : token

  - response :

    - Success:

      Status Code : 200

      ```
      {
          "message": "Success accept item"
      }
      ```

    - Error :

      Status Code : 400

      ```
      {"Message" : in error handler}
      ```

      status Code : 500

      ```
      {"message": "internal server errpr"}
      ```

- base routes TRANSACTION url : http://localhost:3000/transactions/

  - - GET : /

      - description : See History Transaction

      - body : none

      - headers : token

      - authorizationRole : true

      - response :

        - Success:

          Status Code : 200

          ```
          [
          	  {
                  "detailTransaction": [
                  {
                          "_id": 				"5df9ebae6fbc786ae281aca9",
                          "itemId": {
                              "_id": "5df6aba5fd03512ed6a6df00",
                              "name": "OverHoul",
                              "image": "https://storage.googleapis.com/img-dragon-nest/1576656818063-bestitem1.jpg"
                          },
                          "count": 2,
                          "totalPrice": 2000,
                          "accepted": true
                      },
                      {
                          "_id": "5df9ebb36fbc786ae281acaa",
                          "itemId": {
                              "_id": "5df6d0b756c99d5852e53619",
                              "name": "valkyrie",
                              "image": "https://storage.googleapis.com/img-dragon-nest/1576494602426-bestitem4.jpg"
                          },
                          "count": 1,
                          "totalPrice": 3900,
                          "accepted": true
                      }
                  ],
                  "_id": "5df9ebb96fbc786ae281acab",
                  "userId": {
                      "_id": "5df1eb25508ff5236c5ad6cf",
                      "name": "kirito"
                  },
                  "createdAt": "2019-12-18T09:04:57.265Z",
                  "updatedAt": "2019-12-18T09:04:57.265Z"
              },
              {
                  "detailTransaction": [
                      {
                          "_id": "5df9f1f6b2df03777cc63033",
                          "itemId": {
                              "_id": "5df6aba5fd03512ed6a6df00",
                              "name": "OverHoul",
                              "image": "https://storage.googleapis.com/img-dragon-nest/1576656818063-bestitem1.jpg"
                          },
                          "count": 1,
                          "totalPrice": 1000,
                          "accepted": true
                      }
                  ],
                  "_id": "5df9f1f8b2df03777cc63034",
                  "userId": {
                      "_id": "5df1eb25508ff5236c5ad6cf",
                      "name": "kirito"
                  },
                  "createdAt": "2019-12-18T09:31:36.777Z",
                  "updatedAt": "2019-12-18T09:31:36.777Z"
              },
          ]
          ```

        - Error :

          Status Code : 400

          ```
          {"Message" : in error handler}
          ```

          status Code : 500

          ```
          {"message": "internal server errpr"}
          ```

    - ERROR HANDLER

      ```
      if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
          status = 401;
          message = "You should log in first!";

          errors = [message];
        } else if (
          err.name === "ValidationError" ||
          err === "404"
          // err.status == 400
        ) {
          status = 400;
          // let current = null;
          for (let key in err.errors) {
            // current = err.errors[key].message;
            // if (current !== err.errors[key].message) {
            errors.push(err.errors[key].message);
            // }
          }
          // errors.push(err.message);
        } else if (err.kind === "ObjectId") {
          status = 404;
          message = `Object not found`;
          errors = [message];
        } else {
          status = err.status || 500;
          message = err.message || `Internal server error`;

          errors = [message];
        }
        res.status(status).json({
          errors
        });
      ```


    ## Usage

    Make sure you have node js has been installed in your computer, then run the folder <b>server</b> the commands bellow in your terminal.

    ```
        $ npm init -y
        $ npm install
        $ npm run dev
    ```

    Make sure you have node js has been installed in your computer, then run the folder <b>client</b> the commands bellow in your terminal.

    ```
        $ npm run serce
    ```

    or visited this web

    ```
       http://dragon-nest.edwinsatya.online/
    ```
