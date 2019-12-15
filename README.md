# E-commerce

## Admin routes
- - -
Sign in with the following email address and password to access admin routes:
- email: admin@admin.com
- password: admin123


## User routes
- - -
|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|-------------|
|1.| /users/register | POST | None | name: string, email: string, password: string | Create a new user |
|2.| /users/login    | POST | None | email: string, password: string | Log in from an existing account |
|3.| /users/googleSignIn | POST | googleidtoken: string | None | Sign in using a Google account |
|4.| /users/user | GET | access_token: string | None | Find a user by id |

**1. Register**
----
  Returns an access token.

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   None

* **Data Params**

  name: string; email: string; password: string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**

    ```js
    {
      "message": "Successfully registered!",
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjBiNDYxMTkzZDBhNzU3ZGYwZDFiNyIsIm5hbWUiOiJyaXNhbnRvIiwiZW1haWwiOiJyaXNhbnRvQG1haWwuY29tIiwiaWF0IjoxNTc2MDU1OTA1fQ.kMeV1433Rj7zM5WxuphgCkbEN2JBDn6Dohi6SxZSD2g",
      "user": {
          "id": "5df0b461193d0a757df0d1b7",
          "name": "risanto",
          "email": "risanto@mail.com"
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
      ```js
      "messages": [
          "Email address has already been used!",
          "Your password is too short! Its length must be beween 5-15 characters."
      ]
      ```
}`

**2. Log in**
----
  Returns an access token.

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Data Params**

  email: string; password: string;

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Successfully loged in!",
      "user": {
          "_id": "5de61836a9b2f15a0417e25a",
          "name": "johndoe",
          "email": "johndoe@mail.com",
          "password": "$2a$07$738j0cnEzruvXrWCrN...",
          "__v": 0
      },
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ..."
    }
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**3. Sign in with Google**
----
  Returns an access token.

* **URL**

  /users/googleSignIn

* **Method:**

  `POST`
  
*  **URL Params**

   None

*  **Header Params**

   googleidtoken: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ "message": "Successfully registered!", "access_token": "bar" }`

    OR

  * **Code:** 200 <br />
    **Content:** `{ "message": "Successfully logged in!", "access_token": "bar" }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{
    "messages": [
        "Wrong email/password!"
    ]
}`

**4. Fetch a user**
----
  Returns currently active user.

* **URL**

  /users/user

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "_id": "5de61836a9b2f15a0417e25a",
      "name": "johndoe",
      "email": "johndoe@mail.com",
      "password": "$2a$07$738j0cnEzruvXrWCrN61I...",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`


## Product routes
|No.| Routes| HTTP | Headers | Authorization | Body | Description |
|---|-------|------|---------|---------------|------|-------------|
|1.| /products | GET | All | None | None | Fetch all products |
|2.| /products | POST | access_token: string | Admin | name: string, price: integer, qty: integer | Create a new product |
|3.| /products/:id | GET | None | All | None | Find a product by id |
|4.| /products/:id | PATCH | access_token: string | Admin | [name: string [, price: integer [, qty: integer | Update a product by id |
|5.| /products/:id | DELETE | access_token: string | Admin | None | Delete a product by id |

**1. Fetch all products**
----

* **URL**

  /products

* **Method:**

  `GET`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**2. Create a new product**
----

* **URL**

  /products

* **Method:**

  `POST`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**3. Find a product by id**
----

* **URL**

  /products/:id

* **Method:**

  `POST`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**4. Update a product by id**
----

* **URL**

  /products/:id

* **Method:**

  `PATCH`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**5. Delete a product by id**
----

* **URL**

  /products/:id

* **Method:**

  `DELETE`

*  **Header Params**

   access_token: string;

* **Authorization**

  Admin

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
        "message": "Successfully deleted a product!",
        "product": {
            "_id": "5df51f6058f36e11acf4c875",
            "name": "Twas The Nightshift Before Christmas ",
            "price": 153997,
            "qty": 42,
            "description": "A short gift book of festive hospital diaries...",
            "author": "Adam Kay",
            "createdAt": "2019-12-14T17:44:00.031Z",
            "updatedAt": "2019-12-14T17:44:00.031Z",
            "__v": 0
        }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

## Cart routes
|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|-------------|
|1.| /carts/all | GET | access_token: string | None | Fetch all user's carts (both active and inactive) |
|2.| /carts | GET | access_token: string | None | Fetch user's active cart |
|3.| /carts/products/:productId/:productInputQty | POST | access_token: string | productId: ObjectId, qty: integer | Add a product to a cart |
|4.| /carts/products/:productId/:productInputQty | PATCH | access_token: string | qty: integer | Update a product's quantity in a cart |
|5.| /carts/products/:productId | DELETE | access_token: string | None | Remove a product from the active cart |
|6.| /carts/:id/checkout | PATCH | access_token: string | None | Check out an active cart |  

**1. Fetch all user's carts (both active and inactive)**
----

* **URL**

  /carts/all

* **Method:**

  `GET`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**2. Fetch user's active cart**
----

* **URL**

  /carts

* **Method:**

  `GET`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "cart": {
        "isCheckedOut": false,
        "_id": "5df381b1f81c437e98a1fd3f",
        "user": "5df0edf8fb7ab74427506f08",
        "products": [
            {
                "checkoutPrice": null,
                "_id": "5df381b1f81c437e98a1fd40",
                "product": {
                    "_id": "5df0c027193d0a757df0d1bb",
                    "name": "The Body : A Guide for Occupants",
                    "price": 260000,
                    "qty": 7,
                    "description": "Shortlisted for the CWA Gold Dagger for Non-fiction 2019, this incredible memoir from ....",
                    "imageUrl": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7841/9781784162818.jpg",
                    "author": "Professor Sue Black",
                    "__v": 0
                },
                "qty": 2
            }
        ],
        "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**3. Add a product to a cart**
----

* **URL**

  /carts/products/:productId/:productInputQty

* **Method:**

  `POST`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "cart": {
        "isCheckedOut": false,
        "_id": "5df381b1f81c437e98a1fd3f",
        "user": "5df0edf8fb7ab74427506f08",
        "products": [
            {
                "checkoutPrice": null,
                "_id": "5df381b1f81c437e98a1fd40",
                "product": {
                    "_id": "5df0c027193d0a757df0d1bb",
                    "name": "The Body : A Guide for Occupants",
                    "price": 260000,
                    "qty": 7,
                    "description": "Shortlisted for the CWA Gold Dagger for Non-fiction 2019, this incredible memoir from ....",
                    "imageUrl": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7841/9781784162818.jpg",
                    "author": "Professor Sue Black",
                    "__v": 0
                },
                "qty": 2
            }
        ],
        "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**4. Update a product's quantity in a cart**
----

* **URL**

  /carts/products/:productId/:productInputQty 

* **Method:**

  `PATCH`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "cart": {
        "isCheckedOut": false,
        "_id": "5df381b1f81c437e98a1fd3f",
        "user": "5df0edf8fb7ab74427506f08",
        "products": [
            {
                "checkoutPrice": null,
                "_id": "5df381b1f81c437e98a1fd40",
                "product": {
                    "_id": "5df0c027193d0a757df0d1bb",
                    "name": "The Body : A Guide for Occupants",
                    "price": 260000,
                    "qty": 7,
                    "description": "Shortlisted for the CWA Gold Dagger for Non-fiction 2019, this incredible memoir from ....",
                    "imageUrl": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7841/9781784162818.jpg",
                    "author": "Professor Sue Black",
                    "__v": 0
                },
                "qty": 2
            }
        ],
        "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**5. Remove a product from the active cart**
----

* **URL**

  /carts/products/:productId 

* **Method:**

  `DELETE`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "cart": {
        "isCheckedOut": false,
        "_id": "5df381b1f81c437e98a1fd3f",
        "user": "5df0edf8fb7ab74427506f08",
        "products": [
            {
                "checkoutPrice": null,
                "_id": "5df381b1f81c437e98a1fd40",
                "product": {
                    "_id": "5df0c027193d0a757df0d1bb",
                    "name": "The Body : A Guide for Occupants",
                    "price": 260000,
                    "qty": 7,
                    "description": "Shortlisted for the CWA Gold Dagger for Non-fiction 2019, this incredible memoir from ....",
                    "imageUrl": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7841/9781784162818.jpg",
                    "author": "Professor Sue Black",
                    "__v": 0
                },
                "qty": 2
            }
        ],
        "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**6. Check out an active cart**
----

* **URL**

  /carts/:id/checkout 

* **Method:**

  `PATCH`

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "cart": {
        "isCheckedOut": true,
        "_id": "5df381b1f81c437e98a1fd3f",
        "user": "5df0edf8fb7ab74427506f08",
        "products": [
            {
                "checkoutPrice": null,
                "_id": "5df381b1f81c437e98a1fd40",
                "product": {
                    "_id": "5df0c027193d0a757df0d1bb",
                    "name": "The Body : A Guide for Occupants",
                    "price": 260000,
                    "qty": 7,
                    "description": "Shortlisted for the CWA Gold Dagger for Non-fiction 2019, this incredible memoir from ....",
                    "imageUrl": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/7841/9781784162818.jpg",
                    "author": "Professor Sue Black",
                    "__v": 0
                },
                "qty": 2
            }
        ],
        "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

## Transaction routes
|No.| Routes         | HTTP | Headers | Authorization | Body | Description |
|---|----------------|------|---------|-----------|------|-------------|
|1.| /transactions | GET | access_token: string | admin | None | Fetch all transactions history from the whole site |
|2.| /transactions/user | GET | access_token: string | customer | None | Fetch current user's active transactions |
|3.| /transactions/:id | GET | access_token: string | customer | None | Fetch a specific transaction item |
|4.| /transactions/:id | PATCH | access_token: string | admin | None | Update a specific transaction item |
|5.| /transactions/:id/received | PATCH | access_token: string | customer | None | Confirm when an order is received by user |

**1. Fetch all transaction history**
----

* **URL**

  /transactions

* **Method:**

  `GET`
  
*  **Authorization**

   Admin

*  **Header Params**

   access_token: string;

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",DELETE
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
}
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`

**2. Fetch current user's active transactions**
----

* **URL**

  /transactions/user

* **Method:**

  `GET`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transactions": [
        {
            "status": "undelivered",
            "_id": "5df2859ce407db2a85d696af",
            "cart": {
                "isCheckedOut": true,
                "_id": "5df1fa4d690a923cfb40d632",
                "user": "5df0edf8fb7ab74427506f08",
                "products": [
                    {
                        "checkoutPrice": 166836,
                        "_id": "5df2830ce407db2a85d696ae",
                        "product": {
                            "_id": "5df0d267aaa740192be009d2",
                            "name": "Unnatural Causes ",
                            "price": 166836,
                            "qty": 15,
                            "description": "Thoughtful, revealing, chilling and always unputdownable...",
                            "imageUrl": "...",
                            "__v": 0
                        },
                        "qty": 1
                    },
                    {...}
                ],
                "__v": 0
            },
            "totalPrice": 1726836,
            "__v": 0
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`


**3. Fetch a specific transaction item**
----

* **URL**

  /transactions/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string;

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
    "transaction": {
        "status": "preparing",
        "_id": "5df38b5f08ed611019cb95a4",
        "cart": {
            "isCheckedOut": true,
            "_id": "5df381b1f81c437e98a1fd3f",
            "user": "5df0edf8fb7ab74427506f08",
            "products": [
                {
                    "checkoutPrice": 260000,
                    "_id": "5df381b1f81c437e98a1fd40",
                    "product": {
                        "_id": "5df0c027193d0a757df0d1bb",
                        "name": "The Body : A Guide for Occupants",
                        "price": 260000,
                        "qty": 7,
                        "description": "Shortlisted for the CWA Gold Dagger for Non-fiction 2019, this incredible memoir from the Sunday Times Bestseller...",
                        "author": "Professor Sue Black",
                        "__v": 0
                    },
                    "qty": 1
                }
            ],
            "__v": 0,
            "updatedAt": "2019-12-13T13:00:15.616Z"
        },
        "totalPrice": 260000,
        "createdAt": "2019-12-13T13:00:15.627Z",
        "updatedAt": "2019-12-14T12:09:32.825Z",
        "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{
    "messages": [
        "Unauthorized access!"
    ]
}`


**4. Update a specific transaction item**
----

* **URL**

  /transactions/:id

* **Method:**

  `PATCH`
  
*  **URL Params**

   None

*  **Header Params**

   access_token: string;

* **Body**

  status: string;

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Updated transaction status!",
      "transaction": {
          "status": "delivering",
          "_id": "5df38bbf08ed611019cb95a7",
          "cart": "5df38bb008ed611019cb95a5",
          "totalPrice": 500508,
          "createdAt": "2019-12-13T13:01:51.412Z",
          "updatedAt": "2019-12-14T10:43:57.524Z",
          "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    {
      "messages": [
          "`packaging` is not a valid enum value for path `status`."
      ]
    }
}`


**5. Confirm when an order is received by user**
----

* **URL**

  /transactions/:id/received

* **Method:**

  `PATCH`
  
*  **Authorization**

   Customer

*  **Header Params**

   access_token: string;

* **Queries**

  [active=true [, history=true

* **Body**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    ```js
    {
      "message": "Updated transaction status!",
      "transaction": {
          "status": "received",
          "_id": "5df38bbf08ed611019cb95a7",
          "cart": "5df38bb008ed611019cb95a5",
          "totalPrice": 500508,
          "createdAt": "2019-12-13T13:01:51.412Z",
          "updatedAt": "2019-12-14T13:15:58.715Z",
          "__v": 0
      }
    }
    ```
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN<br />
    **Content:** `{
    {
      "messages": [
        "You have already received this order!"
      ]
    }
}`

