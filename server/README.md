# E-commerce

E-commerce is a simple website to buy item via online market.

Fitur:

1. Get items list 
2. Add items to cart (customer only)
3. Checkout a cart 
4. Check delivery fee
5. Get history transaction
6. Confirm item(s) received by customer
7. Create, update, delete items list(admin only)
8. Get all customers history transaction

 Here's the documentation:

## User

- **/click/users/signup**

| Method | Header | Params | Data                                                         |
| ------ | ------ | ------ | ------------------------------------------------------------ |
| `POST` | `none` | `none` | name: `string`<br>email: `string` <br>password: `string`<br>role: `string` |

​		- By default, role is customer

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{ newUser: {name,email, password, role}, message: 'succes sign up' `} | Status: `400` <br> Content: `{"error": ["name is required", "email is required", " invalid email format", "email already registered", "name already registered", "password required", "password min 8 char"]}` |


- **/click/users/signin**

| Method | Header | Params | Data                                       |
| ------ | ------ | ------ | ------------------------------------------ |
| `POST` | `none` | `none` | identity: `string` <br> password: `string` |

​	- identity can be name or email

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{message, token}` | Status: `400` <br> Content: `{"error": ["identity required","password required", "invalid email/password"]}` |

## Item

This end point need authentication from verified user .

- **/click/items**
  Get all items for customer and admin.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                      | Error Response                                           |
| ------------------------------------- | -------------------------------------------------------- |
| Status: `200` <br> Content: `{items}` | Status: `400` <br> Content: `{"error": ["login first"]}` |

- **/click/items/:id**
  Get one item from authenticated user with specific item`id`. 

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `GET`  | `token` | `id: string` | `none` |

| Success Response                     | Error Response                                               |
| ------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item}` | Status: `400` , `500`<br> Content: `{error: ["login first", "data not found"]}` |

- **/click/items/**
  Create items for admin only.

| Method | Header  | Params | Data                                                         |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| `POST` | `token` | `none` | name: `string`<br/>description: `string` <br/> price: `number`<br> stock: `number`<br>image: `string` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ newItem: {_id,name, description, image, price, stock, createdAt, updatedAt}, message: 'succes add item'}` | Status: `400`,`401` <br> Content: `{error: ["login first", "restricted admin only", "image is required", "name is required", "Cast to Number failed for value "NaN" at path "price"", "description is required", "price is required", "stock is required"]}` |

- **/click/items/:id**
  Update `item`.  This end point is for admin only.

| Method | Header  | Params       | Data                                                         |
| ------ | ------- | ------------ | ------------------------------------------------------------ |
| `PUT`  | `token` | id: `string` | name: `string`<br/>description: `string` <br/> price: `number`<br/> stock: `number`<br/> |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item: {_id, name, description, image, price, stock, createdAt, updatedAt}, message:"success update item"}` | Status: `400`,`401` ,`500`<br> Content: `{error: "login first","restricted admin only", "data not found"}` |


- **/click/items/:id**
  Delete `item`. This end point is for admin only.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{item: {_id, name, description, image, price, stock, createdAt, updatedAt}, message: "succes delete item"}` | Status: `400`,`401`,`500` <br> Content: `{error: "login first", "restricted admin only", "data not found"}` |

## Carts

This end point need authentication from verified user .

- **/click/carts**
  Get all carts for admin.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                          | Error Response                                               |
| ----------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{carts: []}` | Status: `401` <br> Content: `{"error": ["restricted admin only","login first"]}` |

- **/click/carts/user**
  Get all user carts for user.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                          | Error Response                                         |
| ----------------------------------------- | ------------------------------------------------------ |
| Status: `200` <br> Content: `{carts: []}` | Status: `400` <br> Content: `{error: ["login first"]}` |

- **/click/carts/:id**
  Create carts for customer only with parameter item id.

| Method | Header  | Params      | Data                                     |
| ------ | ------- | ----------- | ---------------------------------------- |
| `POST` | `token` | id:`string` | qty: `number`<br/>status: `string` <br/> |

​		- status can be "pending", "checkout","delivered"

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ newCart: {status, _id, userId, qty, subPrice, createdAt, updatedAt}, message: 'succes add item'}` | Status: `401` ,`500`<br> Content: `{error: ["login first", "restricted customer only","data not found", "stock less than qty"]}` |

- **/click/carts/user/pending**
  Get all user carts with status pending for user.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                          | Error Response                                       |
| ----------------------------------------- | ---------------------------------------------------- |
| Status: `200` <br> Content: `{carts: []}` | Status: `400` <br> Content: `{error: "login first"}` |

- **/click/carts/:id**
  Update user carts.

| Method | Header  | Params      | Data                              |
| ------ | ------- | ----------- | --------------------------------- |
| `PUT`  | `token` | id:`string` | `status: string`<br>`qty: number` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{messages: 'checkout success', 'succes update cart'}` | Status: `400` ,`500`<br> Content: `{error: "login first", "stock less than qty"}` |


- **/click/carts/:id**
  Delete `item`. 

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                             | Error Response                                       |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Status: `200` <br> Content: `{item, message: "succes delete cart"}` | Status: `400` <br> Content: `{error: "login first"}` |

## Transactions

This end point need authentication from verified user .

- **/click/carts/transaction**
  Get all user transactions.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                                             | Error Response                                           |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| Status: `200` <br> Content: `{itemId, status, _id, userId, ongkir, price, totalPrice, createdAt, updatedAt}` | Status: `400` <br> Content: `{"error": ["login first"]}` |

- **/click/carts/transaction/admin**
  Get all user transactions for admin.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                          | Error Response                                               |
| ----------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{carts: []}` | Status: `400`,`401` <br> Content: `{error: ["login first", "restricted admin only"]}` |

- **/click/carts/:id**
  Create carts for customer only with parameter item id.

| Method | Header  | Params | Data                                                         |
| ------ | ------- | ------ | ------------------------------------------------------------ |
| `POST` | `token` | `none` | ongkir: `number`<br/>price: `number` <br/>items:`string`+ `,` |

​		- items is string of item id

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{ itemId, status, _id, userId, ongkir, price, totalPrice, createdAt, updateAt}` | Status: `400` , `401`<br> Content: `{error: ["Pat price is required.", "Path `ongkir` is required.", "login first", "restricted customer only"]}` |

- **/click/carts/transaction/:id**
  Update user transaction with parameter transaction id.

| Method | Header  | Params      | Data   |
| ------ | ------- | ----------- | ------ |
| `PUT`  | `token` | id:`string` | `none` |

| Success Response                                             | Error Response                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{itemId, status, _id, userId, ongkir, price, totalPrice, createdAt, updatedAt}` | Status: `400` ,`404`<br> Content: `{error: "login first", "data not found"}` |

## Usage

Make sure you have Node.js and npm installed in your computer, and then run these commands:

```
$ npm install
$ npm run dev
```

## 

