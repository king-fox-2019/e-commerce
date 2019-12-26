# e-commerce
## Class User

​    {
​        attribute:{
​            username,
​            email,
​            password,
​            role : { buyer / seller }
​        },
​        endPoint:{
​            post /register =>registration,
​            post /login =>login,
​            get / => userProfile
​        }   
​    }

Class Product
    {
        attribute:{
            name,
            quantity,
            price,
            image
        },
        endPoint:{
            user authentication, role as seller only
            ======================================
​            post / => createProduct ( req.body.query ),

            user authentication, all role
            ======================================
            get / => viewAllProduct ,
            post /? => filterProduct( pake query )


            user authorization, role as Seller
            ============================
            put /:idProduct => editProduct
            patch /:idProduct =>editProduct,
            delete /:idProduct =>deleteProduct
        }
    }

Class Cart
    {
        attributes:{
            _idCart,
            idUser (FK),
                username
            idProduct (FK)
                name
                price
                sell quantity
                total price
        },
        endPoint:{

            user authentication, role as buyer
            =========================
​            get / => viewCart 
​            get /:idCart =>viewCart/One

            user authorization, role as buyer
            =========================
            post /addToCart (initiate creating cart when cart is empty),
            patch /editCart (change cart content, like amount or cancel at all),
            delete /deleteCart (when cart is empty or customer has completed transaction)
        }
    }







## 3. Cart

#### a. Create Cart

- **Endpoint**

  ```http
  	POST /carts
  ```

- **Middlewares**

  authentication('buyer')

  productStockChecking

  productStockUpdate

- **Header**

  access_token

- **Body**

  BuyerId: Schmea.Types.ObjectId **(Required)** **(req.decodedUser)**

  ProductId: Schmea.Types.ObjectId **(Required)**

  quantity: Number **(Required) (min 1)**

  createdAt: Schmea.Types.ObjectId **(Required)** **(auto-generate)**

- **Response**

  ```javascript
  
  ```
  
- **Error**

  - Error Empty Username

    ```javascript
    
    ```

 

#### b. View Cart by User

- **Endpoint**

  ```http
  	GET /carts
  ```

- **Middlewares**

  authentication('buyer')

- **Headers**

  access_token

- **Body**

  not-required

- **Response**

- **Error**

  - Error Empty Username

    ```javascript
    
    ```

#### c. Delete Cart

- **Endpoint**
```javascript
  DELETE /carts/:id	  
    ```
  

* 

























# E-COMMERCE

An application that provide a platform for customer and seller commercial transaction

## 1. User

#### a. User Register

- **Endpoint**

  ```http
  POST /users/register
  ```

- **Body**

  username : String **(Required)**

  email : String **(Required)**

  password: String **(Required)**

  role : { 'buyer' / 'seller' } **(Required)**

- **Response**

  ```javascript
  {
      "_id": "1111111111111111",
      "username": "jap",
      "email": "jap@jap.com",
      "password": "hashed password"
      "role": "seller"
  },
  {
      "_id": "2222222222222222",
      "username": "hendy",
      "email": "hendy@hendy.com",
      "password": "hashed password"
      "role": "buyer"
  },  
  ```

- **Error**

  - Error Empty Username

    ```javascript
    {
        "code": 400,
        "message": [
            "name field required to be filled"
        ]
    }
    ```

  - Error Empty Email

    ```javascript
    {
        "code": 400,
        "message": [
            "email field required to be filled"
        ]
    }
    ```

  - Error Empty Password

    ```javascript
    {
        "code": 400,
        "message": [
            "password field required to be filled"
        ]
    }
    ```

  - Error Empty Role

    ```javascript
    {
        "code": 400,
        "message": [
            "role field required to be filled"
        ]
    }
    ```

  - Error Validation Username Unique

    ```javascript
    {
        "code": 400,
        "message": [
            "username is already registered!"
        ]
    }
    ```

  - Error Validation Email Unique

    ```javascript
    {
        "code": 400,
        "message": [
            "email is already registered!"
        ]
    }
    ```



#### b. User Login

- **Endpoint**

  ```http
  POST /users/login
  ```


