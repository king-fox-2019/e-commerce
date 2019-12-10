# e-commerce

**Login User**
----
  Returns json data token of user

* **BASE URL**
  `http://localhost:3000`

* **URL**
  {base url}/users/login

* **Method:**

  `POST`

* **Data Params**

  **Required:**
  `email=[string]`
  `password=[string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ````javascript 
        { access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c } 
    ````
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ message : "User doesn't exist" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Email or Password is incorrect" }`

* **Sample Call:**

  ```javascript
    axios({
        method: 'post',
        url: '{baseUrl}/users/login'
    })
      .then(({data}) => {
          res.status(200).json(data.token)
      })
      .catch(next)
  ```


**Register User**
----
  Returns json data token of user

* **BASE URL**
  `http://localhost:3000`

* **URL**
  {base url}/users/register

* **Method:**

  `POST`

* **Data Params**

  **Required:**
  `username=[string]`
  `email=[string]`
  `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ````javascript 
        { access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c } 
    ````
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Name can not be empty, Email can not be empty, Email not valid, Email already registered, Password at least have 6 character" }`


* **Sample Call:**

  ```javascript
    axios({
        method: 'post',
        url: '{baseUrl}/users/register'
    })
      .then(({data}) => {
          res.status(200).json(data.token)
      })
      .catch(next)
  ```

users
  login user
  register user
products
  create
  read
    all
    one
    filtered
  update
  delete
transactions
  create
  read
  delete
carts
  create
  read
  update
  delete