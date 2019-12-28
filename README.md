## 1. User

#### a. Register User

- **Endpoint**

  ```http
  POST /user/register
  ```

  

- **Body**

  username : String **(Required)**

  email: String **(Required)**

  password : String **(Required)**

  

- **Response**

  ```javascript
  {
      "id": "5de5e211c125415306b335ab",
      "username": "syiriltest",
      "email": "syiriltest@gmail.com",
      "avatar": "https://api.adorable.io/avatars/285/syiriltest@gmail.com.png"
  }
  ```

- **Error**

  - ValidationError

    1. Username Empty

    ```javascript
    {
        "code": 400,
        "message": [
            "Username cannot be empty"
        ]
    }
    ```

    2. Email Empty

    ```javascript
    {
        "code": 400,
        "message": [
            "Email cannot be empty"
        ]
    }
    ```

    3. Password Empty

    ```javascript
    {
        "code": 400,
        "message": [
            "Password cannot be empty"
        ]
    }
    ```

    4. Unique Email Validation

    ```javascript
    {
        "code": 400,
        "message": [
            "Email is already registered"
        ]
    }
    ```

    5. Email Format Validation

    ```javascript
    {
        "code": 400,
        "message": [
            "Please input the valid email format"
        ]
    }
    ```

    6. Password Min Length Validation

    ```javascript
    {
        "code": 400,
        "message": [
            "Your password min have 6 digits"
        ]
    }
    ```



#### b. Login User

- **Endpoint**

  ```http
  POST /user/login
  ```

- **Body**

  email : String **(Required)**

  password: String **(Required)**

  

- **Response**

  ```javascript
  {
      "user": {
          "username": "example",
          "email": "example@gmail.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTQxMDhmYWU5N2NkMjdmOTNkYWZlMSIsImlhdCI6MTU3NTIyOTA5Nn0.KnE2R1kav3RuWM8wKTVkSWMA3fhLLZUiTU1qr1jJtUY"
  }
  ```

- **Error**

  - Validation Error

    1. Email is not registered on website

    ```javascript
    {
        "code": 400,
        "message": "There is no user with that email!"
    }
    ```

    2. Wrong Password

    ```javascript
    {
        "code": 400,
        "message": "Your password is wrong"
    }
    ```



#### c. Get One User

- **Endpoint**

  ```http
  GET /user/:id
  ```

- **Params**

  id : String **(Required)**

  

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  {
      "id": "5de411d096ab75285edc4c79",
      "username": "test",
      "email": "test@gmail.com"
  }
  ```

- **Error**

  ```javascript
  {
      "code": 404,
      "message": "There is no user with that id"
  }
  ```
  
  

#### d. Get All User

- **Endpoint**

  ```http
  GET /user
  ```

- **Headers**

  access_token : String **(Required)**

  

- **Response**

  ```javascript
  [
      {
          "id": "5de4108fae97cd27f93dafe1",
          "email": "example@gmail.com",
          "username": "example"
      },
      {
          "id": "5de411d096ab75285edc4c79",
          "email": "test@gmail.com",
          "username": "test"
      }
  ]
  ```

- **Error**

  - Authenticate Failed

    ```javascript
    {
        "code": 400,
        "message": "jwt must be provided"
    }
    <!-- ``` -->