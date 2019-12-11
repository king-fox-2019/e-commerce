# E-Commerce

___________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

## User Routes:

| **ROUTE**            | METHOD | Description                         |
| -------------------- | :----: | ----------------------------------- |
| /users/login         |  POST  | Sign in user                        |
| /users/register      |  POST  | Sign up user                        |
| /users/cart          |  GET   | Get all items on cart               |
| /users/product       |  GET   | Get all user's products             |

## Product Routes:

| ****ROUTE**** | METHOD | Description                               |
| ------------- | :----: | ----------------------------------------- |
| /products/    |  GET   | Get all product list                      |
| /products/add |  POST  | Create/Add a new product                  |
| /products/:id | DELETE | Delete product (owner's only)             |
| /products/:id | PATCH  | Update product information (owner's only) |

## Errors:

| Code | Name                  | Description                                         |
| ---- | --------------------- | --------------------------------------------------- |
| 400  | Bad request           | Invalid submitted data                              |
| 403  | Forbidden             | Unauthorized                                        |
| 404  | Not Found             | Resource could not found                            |
| 409  | Conflict              | Request could not be completed due to conflict data |
| 500  | Internal Server Error | Something went wrong in our server                  |

### **User**

##### 	**Login**

- ##### url

  users/login

- ##### Method

  `POST`

- ##### Required

  | Form     | input required |
  | -------- | -------------- |
  | email    | [String]       |
  | password | [String ]      |

- ##### Success Response

  will redirect/show to home page

  gain access_token 

  ###### Code: 200


- ##### Error Response:

  - **Code:** 403 Forbidden

    **Content:** `{error: Password Incorrect}`

  - **Code:** 404 Not Found

    **Content:** ``{error: Your username not match to any user's account }``

##### ****Register****

- ##### url

  users/register

- ##### Method

  `POST`

- ##### Required

  | Form         | input required |
  | ------------ | -------------- |
  | name         | [String]       |
  | email        | [String]       |
  | phone_number | [String]       |
  | password     | [String ]      |

- ##### Success Response

  user data created

  will redirect/show to home page

  gain access_token 

  ###### Code: 201


- ##### Error Response:

  - **Code:** 400 Bad request

    **Content:** `{error: name/email/phone_number/password should not be empty}`

  - **Code:** 409 Conflict

    **Content:** ```{error: Email is taken, please use another email or login to existing account }```


##### ********Cart********

- ##### url

  users/cart

- ##### Method

  `GET`

- ##### Required

  access_token

- ##### Success Response

  will show user's cart

  ###### Code: 200


- ##### Error Response:

  - **Code:** 500 Internal Server Error

    **Content:** `{error: Internal Server Error}``

##### ********User's Product********

- ##### url

  users/product

- ##### Method

  `GET`

- ##### Required

  access_token

- ##### Success Response

  will show user's selled items

  ###### Code: 200


- ##### Error Response:

  - **Code:** 500 Internal Server Error

    **Content:** `{error: Internal Server Error}``



#### **Product**

##### **Get All Products**

- ##### url

  /products

- ##### Method

  `GET`

- ##### Success Response:

  Showing all products  [need improve]****************************************

  ```
  [
      {
          "featured_image": "asdasdasdasd",
          "_id": "5decf50e35b90a125105f85d",
          "title": "123",
          "content": "mari belajar berhitung",
          "author": {
              "_id": "5dec988fea40921ce2fea07e",
              "name": "putri"
          },
          "createdAt": "2019-12-08T13:05:18.487Z",
          "updatedAt": "2019-12-08T13:05:18.487Z",
          "__v": 0
      },
      {
          "featured_image": "https://storage.googleapis.com/andreas-												projects/1575818124537-images.png",
          "_id": "5ded138dfc91a62189d25d49",
          "title": "123",
          "content": "mari belajar berhitung",
          "author": {
              "_id": "5dec988fea40921ce2fea07e",
              "name": "putri"
          },
          "createdAt": "2019-12-08T15:15:25.935Z",
          "updatedAt": "2019-12-08T15:15:25.935Z",
          "__v": 0
      }
  ]
  ```

  ​

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error
    **Content:** `{error: Internal Server Error}``

#### **Add Product**

- ##### url

  /products/add

- ##### Method

  `POST`

- ##### Require

  access_token

- ##### Success Response:

  Product created:  [need improve]****************************************

  ```
  {
      "featured_image": "https://storage.googleapis.com/andreas-projects/1575865522513-images.png",
      "_id": "5dedccb987666e09ffd61dba",
      "title": "Node.JS",
      "content": "mari belajar ngoding",
      "author": "5dec988fea40921ce2fea07e",
      "createdAt": "2019-12-09T04:25:30.529Z",
      "updatedAt": "2019-12-09T04:25:30.529Z",
      "__v": 0
  }
  ```

  ​

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error

    **Content:** `{error: Internal Server Error}``

#### **Delete Product**

- ##### url

  /product/:id

- ##### Method

  `DELETE`

- ##### Require

  access_token

- ##### Success Response:

  Product deleted

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error

    **Content:** `{error: Internal Server Error}``

  - **Code:** 403 Forbidden

    **Content:** `{error: It's not yours}``

#### **Update Product Data**

- ##### url

  /products/:id

- ##### Method

  `PATCH`

- ##### Require

  access_token

- ##### Success Response:

  Product data updated

  ###### Code: 200

- ##### Error Response:

  - **Code:** 500 Internal Server Error
    **Content:** `{error: Internal Server Error}``
  - **Code:** 403 Forbidden
    **Content:** `{error: It's not yours}``