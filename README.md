# e-commerce

**BASE URL**

```javascript
http://localhost:3000/
```

**DEPLOY**

```javascript
ecommerce.sukmabrahmantya.com
```



## USER REGISTER

- **URL's**

  ```json
  /users/register
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `username: [string]` , `email: [string]` , `password: [string]`
  - Optional : `address: [string]`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "id": "5df62e8bb1638106bc82f9c1",
        "fullName": "Brahmantya Sukma",
        "email": "sukmabrahmantya@gmail.com",
        "nationalityId": 3306090606970003,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjYyZThiYjE2MzgxMDZiYzgyZjljMSIsImlhdCI6MTU3NjQxNDg2MH0.vN0F90kMla0ztV4YfC0kKpJP7yQ1hufUf8CA-yqRLI8"
    }
    ```

- **Error Response**

  - Validation Full Name

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: fullName: Full Name cannot be empty!"
      }
      ```

  - Validation Password

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: password: Password cannot be empty!"
      }
      ```

  - Validation Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email cannot be empty!"
      }
      ```

  - Validation Unique Email

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: email: Email already taken!"
      }
      ```

  - Validation Nationality Id

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: nationalityId: Nationality ID cannot be empty!"
      }
      ```

  - Validation Unique Nationality Id

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: nationalityId: Nationality ID already taken!""
      }
      ```

  - Validation Less Than Nationality Id

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: nationalityId: Nationality ID cannot less than 16 Digit!"
      }
      ```

  - Validation More Than Nationality Id

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "User validation failed: nationalityId: Nationality ID cannot less than 16 Digit!"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.post('users/register', payload);
  ```



## USER LOGIN

- **URL's**

  ```json
  /users/login
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `email: [string]` , `password: [string]`
  - Optional : `none`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "id": "5df6a5e630ae9280958d6730",
        "fullName": "Brahmantya Sukma",
        "email": "testing@mail.com",
        "nationalityId": 3306090606970002,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjZhNWU2MzBhZTkyODA5NThkNjczMCIsImlhdCI6MTU3NjQ0NTQyOX0.dBJTwFfPMOg4Gt-AZU9XBe4KtMN1wH8pELb7Y3sqPwQ"
    }
    ```

- **Error Response**

  - Validation Passwords and Users do not Match

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Password / Username is wrong"
      }
      ```

  - Validation User has not Registered

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Password / Username is wrong"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.post('users/login', payload);
  ```



## ITEM CREATE

- **URL's**

  ```json
  /items/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `name: [string]` ,   `price: [number]` ,   `weight: [number]` ,   `category: [string]` ,   `quantity: [number]` ,   `image: [string]`   

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 Created

  - Content :

    ```json
    {
        "_id": "5df52c018542aa851da82343",
        "name": "Emas Batik Mega Mendung",
        "weight": 10,
        "quantity": 100,
        "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02f1168e77_20181105185249-2.jpg",
        "price": 6790000,
        "category": "SB",
        "__v": 0
    }
    ```

- **Error Response**

  - Validation Name

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Product validation failed: name: Name cannot be empty!"
      }
      ```

  - Validation Weight

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Product validation failed: weight: Weight cannot be empty!"
      }
      ```

  - Validation Price

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Product validation failed: price: Price cannot be empty!"
      }
      ```

  - Validation Category

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Product validation failed: category: Category cannot be empty!"
      }
      ```

  - Validation Quantity

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Product validation failed: quantity: Quantity cannot be empty!"
      }
      ```

  - Validation Image

    - Code	: 422 Unprocessable Entity

    - Content :

      ```json
      {
          "message": "Product validation failed: image: Image cannot be empty!"
      }
      ```

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.post('items', payload);
  ```



## ITEM READ ALL

- **URL's**

  ```json
  /items/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    [
        {
            "_id": "5df52aa48542aa851da8233c",
            "name": "Emas Batik Truntum",
            "weight": 10,
            "quantity": 100,
            "image": "https://www.logammulia.com/uploads/ngc_master_item/5be008fde4683_20181105161021-1.jpg",
            "price": 7740000,
            "category": "SB",
            "__v": 0
        },
        {
            "_id": "5df52b0f8542aa851da8233d",
            "name": "Emas Batik Tumuru",
            "weight": 10,
            "quantity": 100,
            "image": "https://www.logammulia.com/uploads/ngc_master_item/5be00919366f7_20181105161049-2.jpg",
            "price": 7740000,
            "category": "SB",
            "__v": 0
        },
    ]
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.get('items', payload);
  ```



## ITEM READ EMAS BATANGAN

- **URL's**

  ```json
  /items/eb
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    [
        {
            "_id": "5df52bdf8542aa851da82342",
            "name": "Emas Batangan",
            "weight": 10,
            "quantity": 100,
            "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02efff3d47_20181105185231-2.jpg",
            "price": 6790000,
            "category": "EB",
            "__v": 0
        },
        {
            "_id": "5df52c018542aa851da82343",
            "name": "Emas Batangan",
            "weight": 10,
            "quantity": 100,
            "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02f1168e77_20181105185249-2.jpg",
            "price": 6790000,
            "category": "EB",
            "__v": 0
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.get('items/eb', payload);
  ```



## ITEM READ EMAS SERIES

- **URL's**

  ```json
  /items/sb
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    [
        {
            "_id": "5df52bdf8542aa851da82342",
            "name": "Emas Batik Sido Murti",
            "weight": 10,
            "quantity": 100,
            "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02efff3d47_20181105185231-2.jpg",
            "price": 6790000,
            "category": "SB",
            "__v": 0
        },
        {
            "_id": "5df52c018542aa851da82343",
            "name": "Emas Batik Mega Mendung",
            "weight": 10,
            "quantity": 100,
            "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02f1168e77_20181105185249-2.jpg",
            "price": 6790000,
            "category": "SB",
            "__v": 0
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.get('items/sb', payload);
  ```



## ITEM UPDATE

- **URL's**

  ```json
  /items/:id
  ```

- **URL Params**

  - Require : `id: [integer]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `name: [string]` ,   `price: [number]` ,   `weight: [number]` ,   `category: [string]` ,   `quantity: [number]` ,   `image: [string]`   

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "_id": "5df52bdf8542aa851da82342",
        "name": "Emas Batik Sido Murti",
        "weight": 10,
        "quantity": 100,
        "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02efff3d47_20181105185231-2.jpg",
        "price": 6790000,
        "category": "SB",
        "__v": 0
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.put('items/sb', payload);
  ```



## ITEM DELETE

- **URL's**

  ```json
  /items/:id
  ```

- **URL Params**

  - Require : `id: [integer]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "_id": "5df52bdf8542aa851da82342",
        "name": "Emas Batik Sido Murti",
        "weight": 10,
        "quantity": 100,
        "image": "https://www.logammulia.com/uploads/ngc_master_item/5be02efff3d47_20181105185231-2.jpg",
        "price": 6790000,
        "category": "SB",
        "__v": 0
    }
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  return axios.delete('items/sb', payload);
  ```