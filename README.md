# E-commerce

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
      "message": "Registered as a user!",
      "user": {
          "_id": "5de61836a9b2f15a0417e25a",
          "name": "johndoe",
          "email": "$2a$07$738j0cnEzr...",
          "password": "foo",
          "__v": 0
      },
      "access_token": "eyJhbGciOiJIUzI..."
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

## Admin routes
- - -

Sign in with the following email address and password to access admin routes:
- email: admin@admin.com
- password: admin123

|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|-------------|
|1.| /transactions | GET | None | access_token: string | None | Fetch all transaction history |


## Product routes
|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|-------------|
|1.| /products | GET | None | None | Fetch all products |
|2.| /products | POST | access_token: string | name: string, price: integer, qty: integer | Create a new product |
|3.| /products/:id | GET | None | None | Find a product by id |
|4.| /products/:id | PATCH | access_token: string | [name: string [, price: integer [, qty: integer | Update a product by id |
|5.| /products/:id | DELETE | access_token: string | None | Delete a product by id |



## Cart routes
|No.| Routes         | HTTP | Headers | Body | Description |
|---|----------------|------|---------|------|-------------|
|1.| /carts | POST | access_token: string | productId: ObjectId, qty: integer | Add a product to a cart |
|2.| /carts/:id/:productId | DELETE | access_token: string | None | Remove a product from cart | 
|3.| /carts/:id/:productId | PATCH | access_token: string | qty: integer | Update a product's quantity in a cart |