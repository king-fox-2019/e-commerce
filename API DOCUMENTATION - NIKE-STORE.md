# API DOCUMENTATION - Nike Store (student project)

<hr>
Recreate Nike Store Website for student project with VUE. 




> Base url : <BASEUrl/>



<h2>User Routes </h2>
<hr>

## Register [post]

> <BASEUrl/users/register>

- Request (application/json)

```
{
	"fullname" : "username"
	"email" : "user@mail.com",
	"password" : "123456",
}
```

- Response 200 (application/json)

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVkNThkYzllYmJmZjE5OGVlY2QwYWEiLCJmdWxsbmFtZSI6ImFkbWluaXN0cmF0b3IyIiwiZW1haWwiOiJhZG1pbmlzdHJhdG9yMkBtYWlsLmNvbSIsImlhdCI6MTU3NTgzNTg2OH0.9W3VS260F6DWOtUGYU1oN3Nn15zteQtjfuVJq6FhHW8"
}
```

- Response 400 (application/json)

```
{
      "message": "Email is already registered"
 }
```



## Login [post]

> <BASEUrl//users/login>

- Request (application/json)

```
{
	"email" : "user@mail.com",
	"password" : "123456"
}
```

- Response 200 (application/json)

```
{
      "accessToken": 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTM3OTljYjI4ZTY1MDkwYmRmMDc4MyIsImVtYWlsIjoickBtYWlsLmNvbSIsImlhdCI6MTU3NTE4ODg5Mn0.hAccVbxWBHFeU8IvMM4AGHnPyuU_Q1i1Bhjo6kvC8Fg"
}
```

- Response 401 (application/json)

```
{
      "message": "Wrong email/password"
 }
```



<h2>Products Routes </h2>
<hr>



## Show All Article (public) [get]

> <BASEUrl/products>

- Response 200 (application/json)

```
[
    {
        "images": [
            "https://storage.googleapis.com/nike-public-bucket/1576264889161-p0-air-jordan-1-satin-Black-Toe.png",
            "https://storage.googleapis.com/nike-public-bucket/1576264889169-p1-air-jordan-1-satin-Black-Toe-700.jpg",
            "https://storage.googleapis.com/nike-public-bucket/1576264889172-p2-air-jordan-1-satin-Black-Toe-700.jpg",
            "https://storage.googleapis.com/nike-public-bucket/1576264889175-p3-air-jordan-1-satin-Black-Toe-700.jpg"
        ],
        "stock": [
            {
                "_id": "5df3e81acca85d24cdd2f904",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "4",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e81ccca85d24cdd2f905",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "5",
                "stock": 0,
                "__v": 0
            },
            {
                "_id": "5df3e81dcca85d24cdd2f906",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "6",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e81fcca85d24cdd2f907",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "7",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e820cca85d24cdd2f908",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "8",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e822cca85d24cdd2f909",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "9",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e823cca85d24cdd2f90a",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "10",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e826cca85d24cdd2f90b",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "11",
                "stock": 4,
                "__v": 0
            },
            {
                "_id": "5df3e82bcca85d24cdd2f90c",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "12",
                "stock": 0,
                "__v": 0
            },
            {
                "_id": "5df3e82dcca85d24cdd2f90d",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "13",
                "stock": 0,
                "__v": 0
            },
            {
                "_id": "5df3e830cca85d24cdd2f90e",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "14",
                "stock": 10,
                "__v": 0
            }
        ],
        "_id": "5df3e4bacca85d24cdd2f8fe",
        "name": "Jordan 1 Retro High -  Satin Black Toe",
        "description": "Jordan Brand adds a twist to a classic with the Air Jordan 1 WMNS Satin “Black Toe”,  Jordan is no stranger to adding satin to the Jordan 1. In May of 2018, they released a satin rendition of the “Shattered Backboard” 1 in a similar fashion, revealing that the release would be in women’s sizing.",
        "price": 2990000,
        "__v": 0
    }
 ]
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```





## Show Product By ID  [get]

> <BASEUrl/products/:id>

- Request (application/json)

  Headers :   token 

  Params:  id ( product id )

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"
  
  
  
  
  
  Response 200 (application/json)

```
{
        "images": [
            "https://storage.googleapis.com/nike-public-bucket/1576264889161-p0-air-jordan-1-satin-Black-Toe.png",
            "https://storage.googleapis.com/nike-public-bucket/1576264889169-p1-air-jordan-1-satin-Black-Toe-700.jpg",
            "https://storage.googleapis.com/nike-public-bucket/1576264889172-p2-air-jordan-1-satin-Black-Toe-700.jpg",
            "https://storage.googleapis.com/nike-public-bucket/1576264889175-p3-air-jordan-1-satin-Black-Toe-700.jpg"
        ],
        "stock": [
            {
                "_id": "5df3e81acca85d24cdd2f904",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "4",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e81ccca85d24cdd2f905",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "5",
                "stock": 0,
                "__v": 0
            },
            {
                "_id": "5df3e81dcca85d24cdd2f906",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "6",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e81fcca85d24cdd2f907",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "7",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e820cca85d24cdd2f908",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "8",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e822cca85d24cdd2f909",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "9",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e823cca85d24cdd2f90a",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "10",
                "stock": 5,
                "__v": 0
            },
            {
                "_id": "5df3e826cca85d24cdd2f90b",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "11",
                "stock": 4,
                "__v": 0
            },
            {
                "_id": "5df3e82bcca85d24cdd2f90c",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "12",
                "stock": 0,
                "__v": 0
            },
            {
                "_id": "5df3e82dcca85d24cdd2f90d",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "13",
                "stock": 0,
                "__v": 0
            },
            {
                "_id": "5df3e830cca85d24cdd2f90e",
                "productId": "5df3e4bacca85d24cdd2f8fe",
                "number": "14",
                "stock": 10,
                "__v": 0
            }
        ],
        "_id": "5df3e4bacca85d24cdd2f8fe",
        "name": "Jordan 1 Retro High -  Satin Black Toe",
        "description": "Jordan Brand adds a twist to a classic with the Air Jordan 1 WMNS Satin “Black Toe”,  Jordan is no stranger to adding satin to the Jordan 1. In May of 2018, they released a satin rendition of the “Shattered Backboard” 1 in a similar fashion, revealing that the release would be in women’s sizing.",
        "price": 2990000,
        "__v": 0
    },
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```



## Add Product to Database  [post]

> <BASEUrl/products>

- Request (application/json)

  Headers :   token ( authorized user : admin ) 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- 

```
{
        "name": "Basketball Shoe - LeBron 17",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": [file1,file2,file3,file4],
    }
```

- Response 200 (application/json)

```
{
        "name": "Basketball Shoe - LeBron 17",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": ["url","url","url","url"],
        
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Delete Product By ID [delete]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token ( authorized user : admin )  

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 201 (application/json)

```
{
    "message": "product successfully deleted"
}
```

- Response 401 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Update Product  [put]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "name": "Basketball Shoe - LeBron 17 EDITED",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
    }
```

- Response 200 (application/json)

```
{
        "name": "Basketball Shoe - LeBron 17 EDITED",
        "description": "The LeBron 17 harnesses LeBron's strength and speed with containment and support for all-court domination. It features a lightweight mix of knit and heat-moulded yarns that gives each one a durable look and feel. Combined cushioning provides LeBron with the impact support and responsive energy return he needs to power through the long season."
        "price": "2909000",
        "images": ["url","url","url","url"],
        
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Add Product to Cart  [post]

> <BASEUrl/products/:id>

- Request (application/json)

  Params:  id ( product id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  


```
{
        "size": "12",
        "count": "1",
        "total_payment": "2909000",
    }
```

- Response 200 (application/json)

```
[
    {
        "payment_status": false,
        "receive_status": false,
        "date": "2019-12-14T18:14:45.399Z",
        "_id": "5df3eab8cca85d24cdd2f944",
        "Stock_id": {
            "_id": "5df3e8a5cca85d24cdd2f927",
            "productId": 
                "_id": "5df3e675cca85d24cdd2f901"
            },
            "number": "12",
            "stock": 5,
            "__v": 0
        },
        "User_id": {
            "role": "customer",
            "_id": "5df3e96bcca85d24cdd2f943",
            "fullname": "customer",
            "email": "customer@mail.com",
            "password": "$2a$10$muDEod.BO0XNk/h/1M1K4OdSfBXevcVXpGPfL6zZwpNDbyXpPoLzq",
            "__v": 0
        },
        "count": 1,
        "total_payment": 2909000,
        "__v": 0,
        "address": " ",
        "receiver": " "
    },
]
```

- Response 400 (application/json)

```
{
    "message": "stock is not enough"
}
```

- Response 404 (application/json)

```
{
    "message": "product not found"
}
```





<h2>Transaction Routes </h2>
<hr>



## Show All Transactions [get]

> <BASEUrl/transactions/all>

Headers :   token ( authorized user : admin )  

> "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

- Response 200 (application/json)

```
[
    {
        "payment_status": true,
        "receive_status": false,
        "date": "2019-12-14T18:14:45.399Z",
        "_id": "5df3eab8cca85d24cdd2f944",
        "Stock_id": {
            "_id": "5df3e8a5cca85d24cdd2f927",
            "productId": 
                "_id": "5df3e675cca85d24cdd2f901"
            },
            "number": "5",
            "stock": 1,
            "__v": 0
        },
        "User_id": {
            "role": "customer",
            "_id": "5df3e96bcca85d24cdd2f943",
            "fullname": "customer",
            "email": "customer@mail.com",
            "password": "$2a$10$muDEod.BO0XNk/h/1M1K4OdSfBXevcVXpGPfL6zZwpNDbyXpPoLzq",
            "__v": 0
        },
        "count": 9,
        "total_payment": 32310000,
        "__v": 0,
        "address": "tanah kusir 2 The home, jakarta, dki jakarta, 123456",
        "receiver": "dwitama alfred"
    },
]
```

- Response 500 (application/json)

```
{
    "message": "internal server error"
}
```





## Show Transaction By ID  [get]

> <BASEUrl/transactions/:id>

- Request (application/json)

  Headers :   token ( authorized user : admin )  

  Params:  id ( product id )

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

  

  Response 200 (application/json)

```
    {
        "payment_status": true,
        "receive_status": false,
        "date": "2019-12-14T18:14:45.399Z",
        "_id": "5df3eab8cca85d24cdd2f944",
        "Stock_id": {
            "_id": "5df3e8a5cca85d24cdd2f927",
            "productId": 
                "_id": "5df3e675cca85d24cdd2f901"
            },
            "number": "5",
            "stock": 1,
            "__v": 0
        },
        "User_id": {
            "role": "customer",
            "_id": "5df3e96bcca85d24cdd2f943",
            "fullname": "customer",
            "email": "customer@mail.com",
            "password": "$2a$10$muDEod.BO0XNk/h/1M1K4OdSfBXevcVXpGPfL6zZwpNDbyXpPoLzq",
            "__v": 0
        },
        "count": 9,
        "total_payment": 32310000,
        "__v": 0,
        "address": "tanah kusir 2 The home, jakarta, dki jakarta, 123456",
        "receiver": "dwitama alfred"
    },
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```



## Delete Transaction  [delete]

> <BASEUrl/transactions/:id

- Request (application/json)

  Params :   id ( product Id  ) 

  Headers :   token ( authorized user : admin ) 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Response 200 (application/json)

```
{
    "message": "transaction successfully deleted"
 }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Checkout Cart [post]

> <BASEUrl/products/:id>

- Request (application/json)

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

- Request (application/json)

  ```
  {
    "street" : "Tanah kusir 2",
    "city" : "Jakarta Selatan"
    "province" : "DKI Jakarta"
    "postalCode" : "123456",
    "receiver" : "customer name"
  }
  ```

  

- Response 201 (application/json)

```
   [{
        "payment_status": true,
        "receive_status": false,
        "date": "2019-12-14T18:14:45.399Z",
        "_id": "5df3eab8cca85d24cdd2f944",
        "Stock_id": {
            "_id": "5df3e8a5cca85d24cdd2f927",
            "productId": 
                "_id": "5df3e675cca85d24cdd2f901"
            },
            "number": "5",
            "stock": 1,
            "__v": 0
        },
        "User_id": {
            "role": "customer",
            "_id": "5df3e96bcca85d24cdd2f943",
            "fullname": "customer",
            "email": "customer@mail.com",
            "password": "$2a$10$muDEod.BO0XNk/h/1M1K4OdSfBXevcVXpGPfL6zZwpNDbyXpPoLzq",
            "__v": 0
        },
        "count": 9,
        "total_payment": 32310000,
        "__v": 0,
        "address": "tanah kusir 2, Jakarta Selatan, DKI jakarta, 123456",
        "receiver": "customer name"
    }
  ]
```

- Response 401 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



## Received Confirmation  [post]

> <BASEUrl/confirm/:transactionId>

- Request (application/json)

  Params:  transactionId ( transaction id )

  Headers :   token 

  > "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZGNjNWNjOTY4NzcyMDlmYjIxNWUzMCIsImVtYWlsIjoiYUBtYWlsLmNvbSIsImlhdCI6MTU3NTE4OTI2Nn0.vKKYVixOvjwKIigw7c7Xzni0j0qZh_j8VzuFQF0J7g0"

  

  

  Response 00 (application/json)

```
{
        "message": "Confirmation Received",
    }
```

- Response 400 (application/json)

```
{
    "message": "authentication failed"
}
```

- Response 404 (application/json)

```
{
    "message": "you are not authorized to perform this action"
}
```



