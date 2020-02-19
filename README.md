# e-commerce

DEPLOY GCS

SERVER #BASE_URL
> [http://minipc-sportstation.anggabanny.online/](http://minipc-sportstation.anggabanny.online/)

CLIENT
> [http://sportstations.anggabanny.online/](http://sportstations.anggabanny.online/)

  

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
|`PATCH`|`/user/:id`|Update Role From Customer To Admin| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`PATCH`|`/user/money/topup`|Top Up Money| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`PATCH`|`/user/money/:id/transfer`| Transfer Money| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>|<p  align="center">❌</p>
|`DELETE`|`/user/:id`|Delete User| [ℹ️details](#user-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>|<p  align="center">❌</p>

## 2. Product Router
|Method|PRODUCT|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|
|`GET`|`/product`|Get all Article| [ℹ️details](#article-route) | <p  align="center">❌</p>|<p  align="center">❌</p>
|`POST`|`/product`|Create Product| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">✔️</p>
|`POST`|`/product/tag`|Find Product By Tag| [ℹ️details](#article-route) |<p align="center">✔️</p>|<p  align="center">❌</p>
|`PUT`|`/product/:id`|Update All Parameter in Product| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/product/:id`|Update Product with price only| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/product/discount`|Update Price with Discount| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`DELETE`|`/product/:id`|Delete Article| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>

## 3. Cart Router
|Method|CART|<i>detail</i>|<i>Details Status</i>|<i>Authentication</i>|<i>Authorization</i>|
|-|-|-|-|-|-|
|`GET`|`/cart`|Get all Cart| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/cart/:status`|Find By Status Cart| [ℹ️details](#article-route) | <p  align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/cart/:id/stock`|Find Stock Product | [ℹ️details](#article-route) |<p align="center">✔️</p>|<p  align="center">❌</p>
|`GET`|`/cart/:status/admin`|find by status only admin| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`POST`|`/cart/:id/cart`|Create Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>
|`PATCH`|`/cart/:id`|Update Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/cart/:id/status`|Update Status Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`PATCH`|`/cart/:id/status/admin`|Update Status Cart admin only| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">✔️</p>
|`DELETE`|`/cart/:id`|Delete Cart| [ℹ️details](#article-route) |<p  align="center">✔️</p>|<p  align="center">❌</p>

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
> [vue-moment]();
> [vue-upload-image]();

> **VUE CREATE**
> [vue]()
> [vuex]()
> [router]()
> [babel]()
> [eslint]()

# DETAIL ROUTE

## USER ROUTE

### 1. [GET] BASE_URL/user

		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token
		▶️ SUCCESS [Status 200 OK!]
		
		[
			{
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  438814
			},
		]
		
		▶️ FAILED [STATUS 401 UNAUTHORIZED]
		{
			"message":  "Json Web Token Error",
			"errors": [
				{
					"name": "JsonWebTokenError",
					"message": "jwt must be provided"
				}
			]
		}
		--------------------------------------------
		{
			"message":  "Validation Error",
			"errors":  [
				"Unauthorized, Not Admin!"
			]
		}
		
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 2. [GET] BASE_URL/user/logged/:email
		▶️ PARAMS { email : STRING }
	
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "account has found!",
			"account":  {
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  438814
			}
		}
  
		▶️ FAILED [STATUS 400 BAD REQUEST]
		{
			"message":  "Validation Error",
			"errors":  [
				"not account found!"
			]
		}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 3. [POST] /user/login

		▶️ BODY {
			email : STRING,
			password : STRING,
		}	
	
		▶️ SUCCESS [STATUS 200 OK!]
			{
			"message":  "login successfuly!",
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZjZkYzljMTU3MGJhNTNlOTAyZmZhMSIsImlhdCI6MTU3NjQ4NDgwMX0.w1ZOh2qpmVuopqNPdN-CZJL-6JC139pC5YrE66YX4sE",
			"user":  {
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  438814
			}
		}
	
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"Email or Password Wrong!"
				]
			}
			
		▶️ FAILED [STATUS 404 NOT FOUND]
			{
				"message":  "Validation Error",
				"errors":  [
					"Email Not Found!"
				]
			}
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 4. [POST] BASE_URL/user/register
		▶️ BODY {
			name : STRING,
			email : STRING,
			password : STRING,
			image : FILE
		}
		
		▶️ SUCCESS [STATUS 201 CREATED!]
		{
			"message":  "create user successfuly!",
			"user":  {
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  438814
			}
		}
		
		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"name is required",
					"email is required",
					"password is required",
					"image is required"
				]
			}
			
		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Validation Error",
				"errors":  [
					"email is Already Exist"
				]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}


### 5. [PATCH] BASE_URL/user/:id
		▶️ HEADERS {
			token : jwt_token
		}
		
		▶️ PARAMS {
			id : User_Id
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "Updated Role Success",
			"user":  {
				"role":  "admin",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  418814
			}
		}
			
		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			---------------------------------------
			{
				"message":  "Id Not Found"
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}

### 6. [PATCH] BASE_URL/user/money/topup
		▶️ HEADERS {
			token : jwt_token
		}
		
		▶️ BODY {
			money : NUMBER
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "add money success",
			"user":  {
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  418814
			}
		}
			
		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Id Not Found"
			}
			--------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}
  
### 7. [PATCH] BASE_URL/user/money/:id/transfer
		▶️ HEADERS {
			token : jwt_token
		}
		
		▶️ PARAMS {
			id : User_Id
		}
		
		▶️ BODY {
			money : NUMBER
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "transfer money success to : anggabanny",
			"user":  {
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  438814
			}
		}
			
		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------
			{
				"message":  "Id Not Found"
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}
  
  
### 8. [DELETE] BASE_URL/user/:id
		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token
		
		▶️ PARAMS {
			id : User_Id
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"user":  {
				"role":  "customer",
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576459421355-FV4687_SL_eCom.jpg"
				],
				"bookmark":  [],
				"_id":  "5df6dc9c1570ba53e902ffa1",
				"name":  "anggabanny",
				"email":  "anggabanny@member.com",
				"password":  "$2a$11$efuoLmXR1BteeOZAq.DeOOdiU/7ZftoG/KGBr1C1yv1FapmSw0adi",
				"createdAt":  "2019-12-16T01:23:40.048Z",
				"updatedAt":  "2019-12-16T01:23:40.048Z",
				"money":  438814
			},
			"message":  "Delete Success"
		}
			
		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			-----------------------------------
			{
				"message":  "Id Not Found"
			}
			----------------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}
			
		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
			{
				"message": "Internal Server Error",
			}  

  
  

## PRODUCT ROUTE

### 1. [GET] BASE_URL/product
		▶️ SUCCESS [STATUS 200 OK!]
		[
			{
				"size":  [
					{
						"sold":  0,
						"_id":  "5df5c2826c13820bf7801948",
						"size":  32,
						"stock":  20,
						"createdAt":  "2019-12-15T05:20:02.532Z",
						"updatedAt":  "2019-12-15T05:20:02.532Z"
					}
				],
				"discount":  -1,
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576387190437-DA9305_BL_eCom.jpg",
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576387191182-DA9305_BLT_eCom.jpg",
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576387191206-DA9305_D1_eCom.jpg",
				],
				"_id":  "5df5c2826c13820bf7801949",
				"name":  "adidas",
				"price":  200000,
				"discountPercent":  "0%",
				"createdAt":  "2019-12-15T05:20:02.726Z",
				"updatedAt":  "2019-12-15T05:20:02.947Z"
			}
		]

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 2. [POST] BASE_URL/product
		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token

		▶️ BODY {
			name : STRING,
			size : NUMBER,
			price : NUMBER,
			stock : NUMBER,
			image : FILE
		}
		
		▶️ SUCCESS [STATUS 201 CREATED!]
		{
			"message":  "create product successfuly!",
			"product":  {
				"size":  [
					"5df74e643587621492be1327"
				],
				"discount":  -1,
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547578-profil_avatdwdar.jpg"
				],
				"_id":  "5df74e643587621492be1328",
				"name":  "nike",
				"price":  5000,
				"discountPercent":  "0%",
				"createdAt":  "2019-12-16T09:29:08.468Z",
				"updatedAt":  "2019-12-16T09:29:08.481Z"
			}
		}

		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"name is required",
					"price is required",
					"size is required",
					"stock is required",
					"image is required"
				]
			}

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 3. [PUT] BASE_URL/product/:id
		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token

		▶️ PARAMS {
			id : Product_Id
		}

		▶️ BODY {
			name : STRING,
			size : NUMBER,
			price : NUMBER,
			stock : NUMBER,
			image : FILE
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "updated product successfuly!",
			"product":  {
				"size":  [
					"5df74e643587621492be1327"
				],
				"discount":  -1,
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
				],
				"_id":  "5df74e643587621492be1328",
				"name":  "nike",
				"price":  5000,
				"discountPercent":  "0%",
				"createdAt":  "2019-12-16T09:29:08.468Z",
				"updatedAt":  "2019-12-16T09:29:08.481Z"
			}
		}

		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"name is required",
					"price is required",
					"image is required"
				]
			}

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}
			--------------------------------------------
			{
				"message":  "Id Not Found"
			}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 4. [PATCH] BASE_URL/product/:id
		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token

		▶️ PARAMS {
			id : Product_Id
		}
		
		▶️ BODY {
			price : NUMBER,
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "updated product price successfuly!",
			"product":  {
				"size":  [
					"5df74e643587621492be1327"
				],
				"discount":  -1,
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
				],
				"_id":  "5df74e643587621492be1328",
				"name":  "nike",
				"price":  5000,
				"discountPercent":  "0%",
				"createdAt":  "2019-12-16T09:29:08.468Z",
				"updatedAt":  "2019-12-16T09:29:08.481Z"
			}
		}

		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"price is required",
				]
			}

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}
			--------------------------------------------
			{
				"message":  "Id Not Found"
			}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 5. [PATCH] BASE_URL/product/discount
		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token

		▶️ BODY {
			price : NUMBER,
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "updated product discount successfuly!",
			"product":  {
				"size":  [
					"5df74e643587621492be1327"
				],
				"discount":  450,
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
				],
				"_id":  "5df74e643587621492be1328",
				"name":  "nike",
				"price":  5000,
				"discountPercent":  "10%",
				"createdAt":  "2019-12-16T09:29:08.468Z",
				"updatedAt":  "2019-12-16T09:29:08.481Z"
			}
		}

		▶️ FAILED [STATUS 400 BAD REQUEST]
			{
				"message":  "Validation Error",
				"errors":  [
					"discount is 0% s/d 100%",
				]
			}

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}



		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 6. [DELETE] BASE_URL/product/:id
		▶️ HEADERS [ADMIN ONLY!]
			token : jwt_token

		▶️ PARAMS {
			id : Product_Id
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
		{
			"message":  "delete product succesfully",
			"product":  {
				"size":  [
					"5df74e643587621492be1327"
				],
				"discount":  450,
				"image":  [
					"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
				],
				"_id":  "5df74e643587621492be1328",
				"name":  "nike",
				"price":  5000,
				"discountPercent":  "10%",
				"createdAt":  "2019-12-16T09:29:08.468Z",
				"updatedAt":  "2019-12-16T09:29:08.481Z"
			}
		}


		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Validation Error",
				"errors":  [
					"Unauthorized, Not Admin!"
				]
			}
			--------------------------------------------
			{
				"message":  "Id Not Found"
			}


		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}


## CART ROUTE
### 1. [POST] BASE_URL/product
		▶️ HEADERS {
			token : jwt_token
		}
		
		▶️ BODY {
			size : NUMBER,
			quantities : NUMBER,
			price : NUMBER
		}
		
		▶️ SUCCESS [STATUS 201 CREATED!]
			{
				"size":  [],
				"status":  "oncart",
				"_id":  "5df75ad7bb9c8218608dbc72",
				"quantities":  3,
				"price":  3000,
				"productId":  "5df74e643587621492be1328",
				"userId":  "5df6dc9b1570ba53e902ffa0",
				"createdAt":  "2019-12-16T10:22:15.315Z",
				"updatedAt":  "2019-12-16T10:22:15.315Z"
			}

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}

		▶️ FAILED [STATUS 404 NOT FOUND]
			{
				"message":  "Id Not Found"
			}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 2. [GET] BASE_URL/cart
		▶️ HEADERS {
			token : jwt_token
		}
			
		▶️ SUCCESS [STATUS 200 OK!]
			[
				{
					"size":  [],
					"status":  "oncart",
					"_id":  "5df75ad7bb9c8218608dbc72",
					"quantities":  3,
					"price":  3000,
					"productId":  {
						"size":  [
							"5df74e643587621492be1327"
						],
						"discount":  -1,
						"discountPercent":  "0%",
					"	image":  [
							"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
							"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547578-profil_avatdwdar.jpg"
						],
						"_id":  "5df74e643587621492be1328",
						"name":  "nike",
						"price":  5000,
						"createdAt":  "2019-12-16T09:29:08.468Z",
						"updatedAt":  "2019-12-16T09:29:08.481Z"
					},
				"userId":  "5df6dc9b1570ba53e902ffa0",
				"createdAt":  "2019-12-16T10:22:15.315Z",
				"updatedAt":  "2019-12-16T10:22:15.315Z"
				}
			]

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 3. [PATCH] BASE_URL/cart/:id/status
		▶️ HEADERS {
			token : jwt_token
		}

		▶️ PARAMS {
			id : Product_Id
		}
		
		▶️ BODY {
			status : STRING,
			['oncart' >>  'process' >>  'confirm' >> 'complete']
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
			[
				"message": "update status cart process product success!",
				"cart": {
					"size":  [],
					"status":  "process",
					"_id":  "5df75ad7bb9c8218608dbc72",
					"quantities":  3,
					"price":  3000,
					"productId":  {
						"size":  [
							"5df74e643587621492be1327"
						],
						"discount":  -1,
						"discountPercent":  "0%",
					"	image":  [
							"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
							"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547578-profil_avatdwdar.jpg"
						],
						"_id":  "5df74e643587621492be1328",
						"name":  "nike",
						"price":  5000,
						"createdAt":  "2019-12-16T09:29:08.468Z",
						"updatedAt":  "2019-12-16T09:29:08.481Z"
					},
				"userId":  "5df6dc9b1570ba53e902ffa0",
				"createdAt":  "2019-12-16T10:22:15.315Z",
				"updatedAt":  "2019-12-16T10:22:15.315Z"
				}
			]

		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Id Not Found"
			}

		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

### 6. [DELETE] BASE_URL/cart/:id
		▶️ HEADERS {
			token : jwt_token
		}

		▶️ PARAMS {
			id : Cart_Id
		}
		
		▶️ SUCCESS [STATUS 200 OK!]
			[
				"message":  "delete cart product success!",
				"cart": {
					"size":  [],
					"status":  "process",
					"_id":  "5df75ad7bb9c8218608dbc72",
					"quantities":  3,
					"price":  3000,
					"productId":  {
						"size":  [
							"5df74e643587621492be1327"
						],
						"discount":  -1,
						"discountPercent":  "0%",
					"	image":  [
							"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547577-profil_avatar.jpg",
							"https://storage.googleapis.com/image-bucket-ecommerce-sportstation/1576488547578-profil_avatdwdar.jpg"
						],
						"_id":  "5df74e643587621492be1328",
						"name":  "nike",
						"price":  5000,
						"createdAt":  "2019-12-16T09:29:08.468Z",
						"updatedAt":  "2019-12-16T09:29:08.481Z"
					},
				"userId":  "5df6dc9b1570ba53e902ffa0",
				"createdAt":  "2019-12-16T10:22:15.315Z",
				"updatedAt":  "2019-12-16T10:22:15.315Z"
				}
			]


		▶️ FAILED [STATUS 401 UNAUTHORIZED]
			{
				"message":  "Json Web Token Error",
				"errors": [
					{
						"name": "JsonWebTokenError",
						"message": "jwt must be provided"
					}
				]
			}
			--------------------------------------------
			{
				"message":  "Id Not Found"
			}


		▶️ FAILED [STATUS 500 INTERNAL SERVER ERROR]
		{
			"message": "Internal Server Error",
		}

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