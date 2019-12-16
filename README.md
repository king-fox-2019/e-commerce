# e-commerce

DEPLOY GCS

SERVER
> [Soon!]()

CLIENT
> [Soon!]()

  

# INTRODUCTION !

Sebelum memulai semuanya alangkah lebih baik jika menguji server terlebih dahulu silahkan akses `/`

untuk menguji bahwa server benar benar berjalan dengan baik, server akan mengirim

```

'Thank you, you`re have access to this rest-api : anggabanny'

```

jika tidak maka kamu akan melihat error dengan status code `500`  ``` CANNOT GET / ``` artinya ada yang tidak beres dengan server mu. mari lihat bagaimana cara mengatasinya [`disini`](#status-code)

  

# ROUTES

## 1. User Router

|Method|USER|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|<i>Verify Google</i>|
|-|-|-|-|-|-|-|
|`GET`|`/user`|Get all Users| [ℹ️details](#user-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/user/logged/:email`|Get User Sign with email| [ℹ️details](#user-route) | <p  align="center">❌</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`POST`|`/user/login`|User Login| [ℹ️details](#user-route) |<p  align="center">❌</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`POST`|`/user/register`|User Register| [ℹ️details](#user-route) |<p  align="center">❌</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`POST`|`/user/money/topup`|Top Up Money| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`PATCH`|`/user/money/:id/transfer`| Transfer Money| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`PATCH`|`/user/:id`|Update Role From Customer To Admin| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`DELETE`|`/user/:id`|Delete User| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>|<p  align="center">❌</p>

## 2. Product Router
|Method|PRODUCT|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|
|`GET`|`/product`|Get all Article| [ℹ️details](#article-route) | <p  align="center">❌</p>|<p  align="center">❌</p>
|`POST`|`/product`|Create Product| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>
|`POST`|`/product/tag`|Find Product By Tag| [ℹ️details](#article-route) |<p align="center">✔️</p>|<p  align="center">❌</p>
|`PUT`|`/product/:id`|Update All Parameter in Product| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/product/:id`|Update Article with title only| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/product/discount`|Update Price with Discount| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`DELETE`|`/product/:id`|Delete Article| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>

## 3. Cart Router
|Method|CART|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|
|`GET`|`/cart`|Get all Cart| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/cart/:status`|Find By Status Cart| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/cart/:id/stock`|Find Stock Product | [ℹ️details](#article-route) |<p align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/cart/:status/admin`|find by status only admin| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/cart/:id/cart`|Create Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>
|`PATCH`|`/cart/:id`|Update Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/cart/:id/status`|Update Status Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/cart/:id/status/admin`|Update Status Cart admin only| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`DELETE`|`/product/:id`|Delete Product| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>

# INSTALLATION

### PACKAGE with NPM SERVER SIDE
> **npm install**
> [bcryptjs]()
> [cors]()
> [express]()
> [gcs-upload]()
> [jsonwebtoken]()
> [mongoose]()
> [morgan]()

> **npm install -D**
> [chai]()
> [chai-http]()
> [dotenv]()
> [mocha]()


### PACKAGE with NPM Client SIDE
> **npm install**
> [axios]()
> [bootstrap]()
> [vue-bootstrap]()
> [sweetaler2]()
> [vue]()
> [vue-moment]();
> [vue-upload-image]();
> [vuex]();

> **VUE CREATE**
> [vuex]()
> [router]()
> [babel]()
> [eslint]()

# DETAIL ROUTE

## USER ROUTE

### 1. [GET] /user/

▶️ SUCCESS [Status 200 OK!]

[

{

"image": [

LINK_GCS

],

"_id": "5dec0478f2dfd9520361aeff",

"name": STRING,

"password": HASH_PASSWORD,

"email": EMAIL

},

]

  

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

### 2. [POST] /user/login

▶️ BODY {

email : STRING,

password : STRING

}

▶️ SUCCESS [STATUS 200 OK!]

{

"token": JWT_TOKEN

"user": {

"image": [

LINK_GCS

],

"_id": "5ded5869fb1e426b1322e82e",

"name": STRING,

"password": HASH_PASSWORD

"email": EMAIL

}}

  

▶️ FAILED [STATUS 400 BAD REQUEST]

⏩ ERROR :

{

"message": "Validation Error",

"errors": [

"Email Not Found",

]

}

------------------------------------

{

"message": "Wrong Password",

"errors": [

"Wrong Password"

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

  

### 3. [POST] /user/register

▶️ BODY {

name : STRING,

email : STRING,

password : STRING,

image : FILE

}

▶️ SUCCESS [STATUS 201 CREATED!]

{

"token": JWT_TOKEN

"user": {

"image": [

LINK_GCS

],

"_id": "5ded5869fb1e426b1322e82e",

"name": STRING,

"password": HASH_PASSWORD

"email": EMAIL

}}

▶️ FAILED [STATUS 400 BAD REQUEST]

⏩ ERROR :

{

"message": "Validation Error",

"errors": [

"email is Already Exist"

"Password Minimum Contain 4 Character",

"name is required",

"password is required",

"email is required",

"image is required"

]

}

  

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

### 4. [POST] /user/google

▶️ SUCCESS [STATUS 201 CREATED!]

{

"token": JWT_TOKEN

"user": {

"image": [

LINK_GCS

],

"_id": "5ded5869fb1e426b1322e82e",

"name": STRING,

"password": HASH_PASSWORD

"email": EMAIL

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

### 5. [POST] /register/google

▶️ BODY {

name : STRING,

email : STRING,

password : STRING,

image : FILE

}

▶️ SUCCESS [STATUS 201 CREATED!]

{

"token": JWT_TOKEN

"user": {

"image": [

LINK_GCS

],

"_id": "5ded5869fb1e426b1322e82e",

"name": STRING,

"password": HASH_PASSWORD

"email": EMAIL

}}

▶️ FAILED [STATUS 400 BAD REQUEST]

⏩ ERROR :

{

"message": "Validation Error",

"errors": [

"email is Already Exist"

"Password Minimum Contain 4 Character",

"name is required",

"password is required",

"email is required",

"image is required"

]

}

  

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

  

### 6. [DELETE] /user/:id

▶️ PARAMS { id }

▶️ SUCCESS [STATUS 200 OK!]

"user": {

"image": [

URL_GCP

],

"_id": "5dec0478f2dfd9520361aeff",

"name": STRING,

"password": HASH_PASSWORD

"email": EMAIL

},

"message": "Delete Success"

}

▶️ FAILED [STATUS 404 NOT FOUND]

⏩ ERROR :

{

"message": "Id Not Found"

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

  
  

## ARTICLE ROUTE

### 1. [GET] /article/

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [Status 200 OK!]

[

{

"image": [

URL_GCP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": {

"image": [

URL_GCP

],

"_id": "5ded5869fb1e426b1322e82e",

"name": "anggabanny",

"password": HASH_PASSWORD

"email": "angga@mail.com"

},

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

]

▶️ FAILED [STATUS 401 UNAUTHORIZED]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

  

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

### 2. [GET] /article/myarticles

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [STATUS 200 OK!]

[

{

"image": [

URL_GCP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": {

"image": [

URL_GCP

],

"_id": "5ded5869fb1e426b1322e82e",

"name": "anggabanny",

"password": HASH_PASSWORD

"email": "angga@mail.com"

},

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

]

  

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

  

### 3. [POST] /article/

▶️ HEADERS { "token" : jwt_token }

▶️ BODY {

"title": STRING,

"content": STRING,

"tag": STRING,

"image : FILE

}

▶️ SUCCESS [STATUS 201 CREATED!]

{

"message": "success create article",

"data": {

"image" [

URL_GDP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": "5ded5869fb1e426b1322e82e",

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

}

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

  

▶️ FAILED [STATUS 400 BAD REQUEST]

⏩ ERROR :

{

"message": "Validation Error",

"errors": [

"title is required",

"content is requied",

"image is required",

"tag is required"

]

}

  

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

### 4. [POST] /article/tag

▶️ BODY {

"tag": STRING,

}

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [STATUS 200 OK!]

{

"message": "find tag :skil success",

"articles": [

{

"image": [

URL_GCP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": {

"image": [

URL_GCP

],

"_id": "5ded5869fb1e426b1322e82e",

"name": STRING,

"password": HASH_PASSWORD,

"email": EMAIL

},

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

]

}

  

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

### 5. [PATCH] /article/:id

▶️ PARAMS { id }

▶️ BODY { title }

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [STATUS 200 OK!]

{

"message": "success edit title",

"data": {

"image" [

URL_GDP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": "5ded5869fb1e426b1322e82e",

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

}

  

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

-------------------------------------------------

⏩ ERROR :

{

"message": "Authentication Failed",

"errors": [

"Authentication Failed"

]

}

▶️ FAILED [STATUS 404 NOT FOUND]

⏩ ERROR :

{

"message": "Id Not Found"

}

------------------------------------

⏩ ERROR :

{

"message": "Invalid Input",

"errors": [

"Not Found"

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

⏩ SOLVE : please check your connection

  

### 6. [PUT] /todo/:id

▶️ PARAMS { id }

▶️ BODY {

title : STRING,

content : STRING,

tag : STRING,

image : FILE

}

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [STATUS 200 OK!]

{

"message": "success edit article, title : hiyaa",

"data": {

"image" [

URL_GDP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": "5ded5869fb1e426b1322e82e",

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

}

  

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

-------------------------------------------------

⏩ ERROR :

{

"message": "Authentication Failed",

"errors": [

"Authentication Failed"

]

}

▶️ FAILED [STATUS 404 NOT FOUND]

⏩ ERROR :

{

"message": "Id Not Found"

}

------------------------------------

⏩ ERROR :

{

"message": "Invalid Input",

"errors": [

"Not Found"

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

⏩ SOLVE : please check your connection

  

### 7. [PUT] /todo/:id/oldpicture

▶️ PARAMS { id }

▶️ BODY {

title : STRING,

content : STRING,

tag : STRING

}

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [STATUS 200 OK!]

{

"message": "success edit article, title : hiyaa",

"data": {

"image" [

URL_GDP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": "5ded5869fb1e426b1322e82e",

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

}

  

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

-------------------------------------------------

⏩ ERROR :

{

"message": "Authentication Failed",

"errors": [

"Authentication Failed"

]

}

▶️ FAILED [STATUS 404 NOT FOUND]

⏩ ERROR :

{

"message": "Id Not Found"

}

------------------------------------

⏩ ERROR :

{

"message": "Invalid Input",

"errors": [

"Not Found"

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

⏩ SOLVE : please check your connection

  
  

### 8. [DELETE] /todo/:id

▶️ PARAMS { id }

▶️ HEADERS { "token" : jwt_token }

▶️ SUCCESS [STATUS 200 OK!]

{

"message": "success delete article, title : hiyaa",

"data": {

"image" [

URL_GDP

],

"tag": [

STRING

],

"_id": "5ded6335bc823c6c26a357b6",

"title": "ini title",

"content": "ini content",

"author": "5ded5869fb1e426b1322e82e",

"createdAt": "2019-12-08T20:55:17.435Z",

"updatedAt": "2019-12-08T20:55:17.435Z"

}

}

  

▶️ FAILED [STATUS 401 Unauthorized]

⏩ ERROR :

{

"message": {

"name": "JsonWebTokenError",

"message": "jwt must be provided"

},

"errors": [

{

"name": "JsonWebTokenError",

"message": "jwt must be provided"

}

]

}

-------------------------------------------------

⏩ ERROR :

{

"message": "Authentication Failed",

"errors": [

"Authentication Failed"

]

}

▶️ FAILED [STATUS 404 NOT FOUND]

⏩ ERROR :

{

"message": "Id Not Found"

}

------------------------------------

⏩ ERROR :

{

"message": "Invalid Input",

"errors": [

"Not Found"

]

}

▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]

⏩ ERROR :

{

"message": "Internal Server Error",

}

⏩ SOLVE : please check your connection

  
  

# information

## STATUS CODE

  

| CODE |STATUS | DESCRIPTION | SOLVE HERE
|-|-|-|-|
|<p  align="center"><i>**``200``**|SUCCESS|Ok|smile:)</i></p>
|<p  align="center"><i>**``201``**|SUCCESS|Created| smile:)</i></p>
|<p  align="center"><i>**``204``**|SUCCESS|No Content| smile:)</i></p>
|<p  align="center"><i>**``400``**|CLIENT ERROR|Bad Request| [Here!](https://stackoverflow.com/questions/19671317/400-bad-request-http-error-code-meaning) </i></p>
|<p  align="center"><i>**``401``**|CLIENT ERROR|UnAuthorized| [Here!](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses) </i></p>
|<p  align="center"><i>**``403``**|CLIENT ERROR|Forbidden| [Here!](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses) </i></p>

|<p  align="center"><i>**``404``**|CLIENT ERROR|Not Found|[Here!](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs) </i></p>

|<p  align="center"><i>**``405``**|CLIENT ERROR|Not Allowed|[Here!](https://stackoverflow.com/questions/25878787/how-can-i-solve-http-404-and-405-error-msgs) </i></p>

|<p  align="center"><i>**``409``**|CLIENT ERROR|Conflict| [Here!](https://stackoverflow.com/questions/45063805/distinguishing-http-status-code-403-and-409-in-practice-or-400) </i></p>

|<p  align="center"><i>**``500``**|SERVER ERROR|Internal Server Error| [Here!](https://stackoverflow.com/questions/1210380/500-internal-server-error) </i></p>


> silahkan kunjungi situs ini bila anda bingung apa itu [status code]([https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html](https://bertzzie.com/knowledge/serverside-nodejs/LampiranBHTTPStatusCode.html))
<hr>

Created by [@anggabannny](https://github.com/anggabanny)