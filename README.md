# E-commerce

## Features

### User:
  - Register
  - Sign In
  - Sign Out

### Products:
  - Show all products
  - Add product
  - Edit product
  - Delete product

### Cart:
  - Show all product
  - Add product
  - Delete product


## Base URL

```http
http://localhost:PORT
```

## User Routes

------------------------------------

### Signin

Signin yourself in order to obtain the `access token`

### Endpoint

```http
POST /user/signin
```

#### Body
- email: String
- password: String

#### Response

#### Success

##### Status 201: Created

```json
{
  "access_token": "eyJhbGcixiJIU...",
  "email": "myEmail@mail.com"
}
```
#### Error

##### Status 401: Email is not registered

```json
{
  "message": "Email is not registered"
}
```

##### Status 401: Invalid email/password

```json
{
  "message": "Invalid email/password"
}
```

##### Status 500: Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```
------------------------------------

### Sign Up

Get yourself registered

### Endpoint

```http
POST /user/signup
```
#### Body
- username: String
- email: String
- password: String

#### Response

#### Success

##### Status 201: Successfully created

```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```
#### Error

#### Status 400: Bad request

```json
{
  "message": "Bad request"
}
```

##### Status 500: Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```
------------------------------------

### Google Login

Login more easily through your Google account

### Endpoint

```http
POST /signin/google
```

#### Body
- email: String
- password: String

#### Response

#### Success

##### Status 200: Created

```json
{
    "access_token": "eyJhbGcixiJIU...",
    "email": "myEmail@mail.com"
}
```
#### Error

##### Status 401: Invalid email

##### Status 500: Internal Server Error

------------------------------------
____________________________________

## Product Routes

------------------------------------

### Show All Products

Show all products

### Endpoint

```http
GET /products
```
#### Headers

access_token: String ***Required***

#### Response

#### Success

##### Status 200:

```json
[
  {
    "_id": "5dwe5t32dr6a0dc3e0d3034po",
    "name": "Phone case",
    "price": 50000,
    "image": "https://storage.googleapis.com/...",
  },
  {
    "_id": "5xrt5t32dr6a0dc3e0d3023ci",
    "name": "Laptop",
    "price": 9875000,
    "image": "https://storage.googleapis.com/...",
  },
  ..

]
```

#### Error

##### Error 400: Invalid access token

```json
{
  "message": "Invalid access token"
}
```

##### Status 500: Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```

------------------------------------

### Show One Product

Show a product

### Endpoint

```http
GET /products/:productId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200:

```json
{
  "_id": "5dwe5t32dr6a0dc3e0d3034po",
  "name": "Phone case",
  "description": "Really nice case"
  "price": 50000,
  "image": "https://storage.googleapis.com/...",
}
```
#### Error

##### Error 400: Invalid access token

##### Status 500: Internal Server Error

------------------------------------

### Edit Product

Edit your article

### Endpoint

```http
PATCH /products/:productId
```
#### Header

access_token: String ***Required***

#### Body

- name: String (required)
- description: String (required)
- price: String (required)
- image: String (required)

#### Response

#### Success

##### Status 200:

```json
{
    "message": "Updated"
}
```
#### Error

##### Error 400: Invalid access token

##### Error 403: Forbidden access

##### Status 500: Internal Server Error

------------------------------------

### Delete Product

Delete your article

### Endpoint

```http
DELETE /products/:productId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200: Deleted

```json
{
    "message": "Deleted"
}
```
#### Error

##### Error 400: Invalid access token

##### Status 500: Internal Server Error

-----------------------------------------

## Cart Routes

### Show All Products

Show all products

### Endpoint

```http
GET /cart
```
#### Headers

access_token: String ***Required***

#### Response

#### Success

##### Status 200:

```json
[
  {
    "_id": "5ere5t32dr6a0dc3e0d3034po",
    "userId": "5ewe5t76dr6a0dcP80d9824xd",
    "productId": "5fre5t82dr6a0dc3e0d909erw",
    "amount": 1,
  },
  {
    "_id": "5xrt5t32dr6a0dc3e0d3023ci",
    "userId": "5xb5t55dr6a0dc3e0d3034po",
    "productId": "5uue4t82dr6a0dc3e0d728lop",
    "amount": 2,
  },
  ..

]
```

#### Error

##### Error 400: Invalid access token

```json
{
  "message": "Invalid access token"
}
```

##### Status 500: Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```
------------------------------------------------

### Add Cart

Add item to cart

### Endpoint

```http
POST /cart
```
#### Headers

access_token: String ***Required***

#### Response

#### Success

##### Status 201:

```json

  {
    "_id": "5ere5t32dr6a0dc3e0d3034po",
    "userId": "5ewe5t76dr6a0dcP80d9824xd",
    "productId": "5fre5t82dr6a0dc3e0d909erw",
    "amount": 1,
  }

```

#### Error

##### Error 400: Invalid access token

```json
{
  "message": "Invalid access token"
}
```

##### Status 500: Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```
------------------------------------------------

### Delete Cart

Delete your cart

### Endpoint

```http
DELETE /cart/:cartId
```
#### Header

access_token: String ***Required***

#### Response

#### Success

##### Status 200: Deleted

```json
{
    "message": "Deleted"
}
```
#### Error

##### Error 400: Invalid access token

```json
{
  "message": "Invalid access token"
}
```

##### Status 500: Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```