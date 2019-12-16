# e-commerce

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `username=[string]` <br />
  `email=[string]` <br />
  `password=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5edc025ea7741e11ecf19",
            "username": "john",
            "email": "john@mail.com",
            "password": "$2a$10$AtPx6DnLKlnCkjJPBIH7wuCQHVbgdl.2O3NsmMXcnVszILKOEbf22",
            "cart": "[]",
            "createdAt": "2019-12-15T08:24:32.268Z",
            "updatedAt": "2019-12-15T08:24:32.268Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "email/username already registered" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Log In**

- **URL**
  <_/users/login_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjVlZGMwMjVlYTc3NDFlMTFlY2YxOSIsImVtYWlsIjoiam9obkBtYWlsLmNvbSIsImlhdCI6MTU3NjM5ODM4OCwiZXhwIjoxNTc2Mzk4OTg4fQ.FqgruQlO2zaV2YflLBghYg5PrfqAhkMhbVJX39n9ho0"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Email and/or password incorrect" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**URL**
  <_/users_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Data Params**
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5edc025ea7741e11ecf19",
            "username": "john",
            "email": "john@mail.com",
            "password": "$2a$10$AtPx6DnLKlnCkjJPBIH7wuCQHVbgdl.2O3NsmMXcnVszILKOEbf22",
            "cart": "[
              {
                "_id": "5df611a105b0f34db720e171",
                "ProductId": "5df5f4cac7737245c662db3d"
                "quantity": "2"
              },
              {
                "_id": "8as23rwd87od2o3r238r9y9e",
                "ProductId": "8rafe2a7g72gr7734r6g73"
                "quantity": "1"
              }
            ]",
            "createdAt": "2019-12-15T08:24:32.268Z",
            "updatedAt": "2019-12-15T08:24:32.268Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Please log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**URL**
  <_/users/cart_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
   **Required:**

  `products=[array]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5edc025ea7741e11ecf19",
            "username": "john",
            "email": "john@mail.com",
            "password": "$2a$10$AtPx6DnLKlnCkjJPBIH7wuCQHVbgdl.2O3NsmMXcnVszILKOEbf22",
            "cart": "[
              {
                "_id": "5df611a105b0f34db720e171",
                "ProductId": "5df5f4cac7737245c662db3d"
                "quantity": "2"
              },
              {
                "_id": "8as23rwd87od2o3r238r9y9e",
                "ProductId": "8rafe2a7g72gr7734r6g73"
                "quantity": "1"
              }
            ]",
            "createdAt": "2019-12-15T08:24:32.268Z",
            "updatedAt": "2019-12-15T08:24:32.268Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Item not available" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Please log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**URL**
  <_/users/cart_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `None`

- **Data Params**
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "Cart successfully deleted"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Cart not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Please log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all products**

- **URL**
  <_/products_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "_id": "5df5f4cac7737245c662db3d",
            "name": "A5 leather binder notebook",
            "price": 299000,
            "stock": 10,
            "image": "https://storage.googleapis.com/ecommerce-vn/1576400066239notebook.jpg",
            "description": "Top grain cow leather with high quality metal ring binder\nPaper Size: A5 (21*14.8 cm) 120 pages\nLeather cover size : 18.5*23cm ( 7.2\" x 9\" )\nLeft : two leather compartment to hold your ticket and notes\nRight : a pen holder",
            "category": "Stationery",
            "UserId": "5df50ef4b9dd11096ee269d6",
            "createdAt": "2019-12-15T08:54:34.854Z",
            "updatedAt": "2019-12-15T08:54:34.854Z",
            "__v": 0
        },
        {
            "_id": "5df5f599c7737245c662db3e",
            "name": "Large Geometric Dodecahedron Glass Vase",
            "price": 450000,
            "stock": 20,
            "image": "https://storage.googleapis.com/ecommerce-vn/1576400276014vases.jpg",
            "description": "Stylish Dodecahedron shaped geometric glass vase.\nThis large vase is created especially for a lush bouquet of flowers, it helps to create a central bouquet on the wedding table or occupy the central bridge in your living room. 5 corners of the vase will help harmoniously arrange all the flowers equally.",
            "category": "Furniture",
            "UserId": "5df50ef4b9dd11096ee269d6",
            "createdAt": "2019-12-15T08:58:01.299Z",
            "updatedAt": "2019-12-15T08:58:01.299Z",
            "__v": 0
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Post a product**

- **URL**
  <_/products_>

- **Method:**
  `POST`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params**
  **Required:**
  `name=[string]` <br />
  `description=[string]` <br />
  `price=[number]` <br />
  `stock=[number]` <br />
  `image=[file]` <br />
  `category=[string]`

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5f4cac7737245c662db3d",
            "name": "A5 leather binder notebook",
            "price": 299000,
            "stock": 10,
            "image": "https://storage.googleapis.com/ecommerce-vn/1576400066239notebook.jpg",
            "description": "Top grain cow leather with high quality metal ring binder\nPaper Size: A5 (21*14.8 cm) 120 pages\nLeather cover size : 18.5*23cm ( 7.2\" x 9\" )\nLeft : two leather compartment to hold your ticket and notes\nRight : a pen holder",
            "category": "Stationery",
            "UserId": "5df50ef4b9dd11096ee269d6",
            "createdAt": "2019-12-15T08:54:34.854Z",
            "updatedAt": "2019-12-15T08:54:34.854Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 401 <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get a product**

- **URL**
  <_/products/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5f599c7737245c662db3e",
            "name": "Large Geometric Dodecahedron Glass Vase",
            "price": 450000,
            "stock": 20,
            "image": "https://storage.googleapis.com/ecommerce-vn/1576400276014vases.jpg",
            "description": "Stylish Dodecahedron shaped geometric glass vase.\nThis large vase is created especially for a lush bouquet of flowers, it helps to create a central bouquet on the wedding table or occupy the central bridge in your living room. 5 corners of the vase will help harmoniously arrange all the flowers equally.",
            "category": "Furniture",
            "UserId": "5df50ef4b9dd11096ee269d6",
            "createdAt": "2019-12-15T08:58:01.299Z",
            "updatedAt": "2019-12-15T08:58:01.299Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Product not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete a product**

- **URL**
  <_/products/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "message": "Product successfully deleted."
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Product not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Update a product**

- **URL**
  <_/products/{id}_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `access_token=[string]`

- **Data Params** <br />
  **Options:**
  `name=[string]` <br />
  `description=[string]` <br />
  `price=[number]` <br />
  `stock=[number]` <br />
  `image=[file]` <br />
  `category=[string]`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
        {
            "_id": "5df5f599c7737245c662db3e",
            "name": "Geometric Dodecahedron Flower Vase",
            "price": 430000,
            "stock": 15,
            "image": "https://storage.googleapis.com/ecommerce-vn/1576400276014vases.jpg",
            "description": "Stylish Dodecahedron shaped geometric glass vase.\nThis large vase is created especially for a lush bouquet of flowers, it helps to create a central bouquet on the wedding table or occupy the central bridge in your living room. 5 corners of the vase will help harmoniously arrange all the flowers equally.",
            "category": "Furniture",
            "UserId": "5df50ef4b9dd11096ee269d6",
            "createdAt": "2019-12-15T08:58:01.299Z",
            "updatedAt": "2019-12-15T08:58:01.299Z",
            "__v": 0
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Product not found" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`