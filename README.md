# SShop Documentation

**SShop** is a simple e-commerce to sell your product over the world. SShop is designed by express, Mongoose, Vue, and other packages. If you use this API then run `npm install` to install everything you need. You must install `nodemon` before trying to use.

## Base URL

Base URL of SShop is :

`http://localhost:<port>`

The port can be added to the .env file, we use port 3000 as the default.

## ENV Template

| Variable             | Data Type                            |
| -------------------- | ------------------------------------ |
| PORT                 | number                               |
| SECRET_KEY           | string                               |
| SERVER_MONGODB_ATLAS | string / url to mongodb atlas access |

## Sign Up User

**Endpoint** : `/users/register`

**Method** : `POST`

**Request** :

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|    name    |  string   |
|   email    |  string   |
|  password  |  string   |

**Response**

- Success

  ```javascript
  {
      "message" : "Sign Up Success",
      "token": <token : string>
  }
  ```

- Error

  1. ValidationError / `400`

     ```javascript
     {
         "errors": {
      ``       "email": {
                 "message": "Email is unavailable",
                 "name": "ValidatorError",
                 "properties": {
                     "msg": "Email is unavailable",
                     "message": "Email is unavailable",
                     "type": "user defined",
                     "path": "email",
                     "value": "example@mail.com"
                 },
                 "kind": "user defined",
                 "path": "email",
                 "value": "example@mail.com"
             }
         },
         "_message": "User validation failed",
         "message": "User validation failed: email: Email is unavailable",
         "name": "ValidationError"
     }
     ```

## Sign In User

**Endpoint** : `/users/login`

**Method** : `POST`

**Request** :

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|   email    |  string   |
|  password  |  string   |

**Response**

- Success

  ```javascript
  {
      "message": "Sign In Success"
      "token": <token : string>
  }
  ```

- Error

  1. User not found/Email field empty / `400`

     ```javascript
     {
         "message": "User not found"
     }
     ```

  2. Wrong Password / `400`

     ```javascript
     {
         "message": "Wrong password"
     }
     ```

  3. Password field empty / `400`

## Create Product

Creating products can only be done by **seller** type accounts

**Endpoint** : `/products`

**Method** : `POST`

**Request** :

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|    name    |  string   |
|   price    |  number   |
|   image    |  string   |
|   stock    |  number   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success

    ```javascript
    {
        "message": "Success add product",
        "product": {
            "_id": <id: string/objectId>,
            "name": "Short Dropdead",
            "price": 425000,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3kRa_By-ubcuokOFIRcUjfpRsUaQnVY61GkhnSXgdWEAXYfEGIw&s",
            "stock": 30,
            "createdAt": "2019-12-15T12:23:25.727Z",
            "updatedAt": "2019-12-15T12:23:25.727Z"
      }
    }
    ```

  ```

  ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
       "message": "jwt must be provided"
     }
     ```

  ````

  2. ValidationError / `400`

      ```javascript
      {
          "message": "ValidationError"
      }
  ````

## Fetch Product

**Endpoint** : `/products`

**Method** : `GET`

**Request** :

- URL Parameters [optional]

| Parameters | Data Type |
| :--------: | :-------: |
|    \_id    |  string   |

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Success get products",
        "products": [
            //Server-owned products
        ]
    }
    ```

    \*if products does not exist it will return an empty array.

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }

       ```

    ```

    ```

## Update Article

Update products can only be done by **seller** type accounts

**Endpoint** : `/products/:id`

**Method** : `PUT`

**Request** :

- URL Parameters

| Parameters |     Data Type     |
| :--------: | :---------------: |
|    \_id    | string / ObjectId |

- Data Parameters

| Parameters | Data Type |
| :--------: | :-------: |
|    name    |  string   |
|   price    |  number   |
|   image    |  string   |
|   stock    |  number   |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

- Response

  - Success / `200`

    ```javascript
    {
        "message": "Success update product",
        "product": {
            "_id": <id: string/objectId>,
            "name": "Short Dropdead #2",
            "price": 425000,
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3kRa_By-ubcuokOFIRcUjfpRsUaQnVY61GkhnSXgdWEAXYfEGIw&s",
            "stock": 30,
            "createdAt": "2019-12-15T12:23:25.727Z",
            "updatedAt": "2019-12-15T12:33:45.782Z"
      }
    }
    ```

  ```

  *return new data (updated)
  ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

  2. Error Forbidden / `401`

     ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "invalid token"
       }
     ```

## Delete Product

Delete products can only be done by **seller** type accounts

**Endpoint** : `/products/:id`

**Method** : `DELETE`

**Request** :

- URL Parameters

| Parameters |     Data Type     |
| :--------: | :---------------: |
|    \_id    | string / objectId |

- Headers

| Parameters   | Data Type |
| ------------ | --------- |
| access_token | string    |

**Response** :

- Success / `200`

  ```javascript
  {
      "message": "Success delete product",
      "result": {
          "lastErrorObject": {
              "n": 1
          },
          "value": {
              "_id": <id: string / objectId>,
              "name": "Short Dropdead #2",
              "price": 425000,
              "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3kRa_By-ubcuokOFIRcUjfpRsUaQnVY61GkhnSXgdWEAXYfEGIw&s",
              "stock": 30,
              "createdAt": "2019-12-15T12:23:25.727Z",
              "updatedAt": "2019-12-15T12:33:45.782Z"
          },
          "ok": 1
      }
  }
  ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

  2. Product not found / `404`

     ```javascript
     {
         "message": "Product not found"
     }

     ```

## Create Cart User

**Endpoint** : `/cart`

**Method** : `POST`

**Request** :

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Response

  - Success

    ```javascript
    {
        "message": "Success create user cart",
        "cart": {
            "items": [],
            "_id": "5df63456a866a55f04095a01",
            "customer": "5df62483a2c9005a71d8bf73",
            "status": "Pending",
            "__v": 0
        }
    }
    ```

  - Error

    1. JsonWebTokenError / `401`

       ```javascript
       {
           "name": "JsonWebTokenError",
           "message": "jwt must be provided"
       }
       ```

    2. Internal server error

       ```javascript
       {
       	"message": "Internal Server Error"
       };
       ```

## Update Cart User

**Endpoint** : `/cart`

**Method** : `PATCH`

**Request** :

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

- Data Parameters

| Parameters |     Data Type     |
| :--------: | :---------------: |
|    qty     |      number       |
|  command   |      string       |
|    item    | string / objectId |

**Responses** :

- Success

  ```javascript
  {
      "message": 'Success add item to cart'
  }
  ```

- Error

  1. JsonWebTokenError / `401`

     ```javascript
     {
         "name": "JsonWebTokenError",
         "message": "jwt must be provided"
     }
     ```

  2. Internal server error / `500`

     ```javascript
     {
     	"message": "Internal Server Error"
     };
     ```

## Fetch Cart User

**Endpoint** : `/cart`

**Method** : `PATCH`

**Request** :

- Headers

|  Parameters  | Data Type |
| :----------: | :-------: |
| access_token |  string   |

**Responses** :

- Success

  ```javascript
  {
    items: [
      // Products
    ],
    _id: <id: string / objectId>,
    customer: <id: string / objectId>,
    status: 'Pending',
    __v: 3
  }
  ```

- Error

  1. Internal server error / `500`

     ```javascript
     {
     	"message": "Internal Server Error"
     };
     ```
