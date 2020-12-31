# E-Commerce

## **Register User**

Returns json data about newly registered user.

- **URL**

  /user/register

- **Method:**

  `POST`

- **Data Params**

  &nbsp; name: STRING
  &nbsp; email: STRING
  &nbsp; password: STRING

- **Success Response:**

  - **Code:** 201 <br />

    ```javascript
        {
        "_id": "5de401e04ff47e7e7d539435",
        "name": "Username",
        "email": "user@email.com",
        "password": "$2a$10$8S4ZHyFYKZmiO4enOcYpKOBnl5EY.utDcrdlSLTTs3zG5QdFMDcVS",
        "cart": [],
        "purchased": [],
        "__v": 0
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />

    ```javascript
    {
        "error": "ValidationError",
        "message": "User validation failed: name: Path `name` is required., email: Path `email` is      required."
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/register`,
        method: `post`,
        data: {
            name: Username,
            email: user@email.com,
            password: `password`
        }
    })
    .done(result => {
        console.log(result)
    })
    .fail(err => {
        console.log(err)
    })
  ```

## **Login User**

Returns json data about a single user.

- **URL**

  /users/login

- **Method:**

  `POST`

- **Data Params**

  email: STRING
  password: STRING

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    {   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzUyMjM5Nzl9.YbHSsgEs84-KLr9sVH-ZAWhkwvlZ5BUEm8-EpMpZmso" }
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "TypeError",
        "message": "Cannot read property '_id' of null"
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `<baseURL>/user/login`,
        method: `post`,
        data: {
            email: mail@mail.com
            password: secret
        }
    })
  ```

## **Get Products**

Returns json data of products.

- **URL**

  /product

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
            "_id": "5df4c4d3b52904513284e669",
            "name": "baju",
            "price": 10000,
            "stock": 15,
            "image": "https://d2h2vnfmmg5sct.cloudfront.net/catalog/product/large_image/00_414443.jpg",
            "__v": 0
        },
        {
            "_id": "5df4c524b52904513284e66a",
            "name": "celana",
            "price": 5000,
            "stock": 9,
            "image": "https://www.lafuma.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/l/f/lfv11318-6730-access-cargo-pants-bleu_1.jpg",
            "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/product`,
        method: `get`
    })
  ```

  ## **Create Product**

Add a product.

- **URL**

  /product

- **Method:**

  `POST`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
            "_id": "5df4c524b52904513284e66a",
            "name": "celana",
            "price": 5000,
            "stock": 9,
            "image": "https://www.lafuma.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/l/f/lfv11318-6730-access-cargo-pants-bleu_1.jpg",
            "__v": 0
        }
    ]
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```javascript
    {
        "error": "CastError",
        "message": "Cast to ObjectId failed for value \"5de29ccf6c5dfb4b6c492af\" at path \"_id\" for model     \"Product\""
    }
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/product`,
        method: `post`,
    })
  ```

  ## **Update Product**

Update a product and return JSON data.

- **URL**

  /product

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/todo",
          data:{
              id,name,description,status,dueDate
          }
      })
  ```

    ## **Delete Product**

Delete a product and return JSON data.

- **URL**

  /product

- **Method:**

  `DELETE`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"delete",
          url:"http://localhost:3000/product",
          data:{
              id
          }
      })
  ```

    ## **Update Cart**

Update user's cart and return JSON data.

- **URL**

  /cart

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/user/cart",
          data:{
              cart
          }
      })
  ```

## **Delete Item from Cart**

Update user's cart and return JSON data.

- **URL**

  /cart

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "deletedCount": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/user/cart?productId=<the_product_id>",
      })
  ```

## **Empty Cart**

Update user's cart and return JSON data.

- **URL**

  /cart

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "nModified": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/user/cart?empty=1",
      })
  ```

## **Get Cart**

Returns json data of cart.

- **URL**

  /cart

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
            "_id": "5df4c4d3b52904513284e669",
            "name": "baju",
            "price": 10000,
            "stock": 15,
            "image": "https://d2h2vnfmmg5sct.cloudfront.net/catalog/product/large_image/00_414443.jpg",
            "__v": 0
        },
        {
            "_id": "5df4c524b52904513284e66a",
            "name": "celana",
            "price": 5000,
            "stock": 9,
            "image": "https://www.lafuma.com/media/catalog/product/cache/18/image/9df78eab33525d08d6e5fb8d27136e95/l/f/lfv11318-6730-access-cargo-pants-bleu_1.jpg",
            "__v": 0
        }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/user/cart`,
        headers:{access_token}
    })
  ```

  ## **Empty Cart**

Update user's cart and return JSON data.

- **URL**

  /user/checkout

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "nModified": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/user/checkout",
          headers:{access_token}
      })
  ```

## **Get Transactions**

Returns json data of transactions.

- **URL**

  /transaction

- **Method:**

  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```javascript 
    [
        {
        "_id": "5df6620ca79d5a2bc778d0b4",
        "userId": "5df67e0869501b08b9e4a7e9",
        "productId": "5df67e1b69501b08b9e4a7ec",
        "quantity": "1",
        "status": "done",
        "__v": 0
    },
    {
        "_id": "5df6620ca79d5a2bc778d0b6",
        "userId": "5df5cf933d50ba13035eaf8c",
        "productId": "5df6620ca79d5a2bc778d0b5",
        "quantity": "10",
        "status": "not done",
        "__v": 0
    }
    ]
    ```

- **Sample Call:**

  ```javascript
    $.ajax({
        url: `http://localhost:3000/transaction`,
        method: `get`
    })
  ```

  ## **Change Transaction status**

Update transaction's status and return JSON data.

- **URL**

  /transaction

- **Method:**

  `PUT`

- **Success Response:**

  - **Code:** 201<br />
    **Content:**

    ```javascript 
    {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
    
    ```

     **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

  ```javascript
  {
        "n": 0,
        "ok": 1,
        "nModified": 0
    }
  ```

- **Sample Call:**

  ```javascript
    $.ajax({
          method:"put",
          url:"http://localhost:3000/transaction",
          data:{productId,quantity},
          headers:{access_token}
      })
  ```