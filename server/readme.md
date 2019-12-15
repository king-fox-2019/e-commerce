# E-commerce API Documentation

Dokumentasi RESTFUL API e-commerce.

## Base URL

```http
http://api.ecommerce.prograami.com/
```

## List Endpoint

### Admins

#### New Admin

```http
POST /admins
```

Digunakan untuk mendaftarkan admin baru kedalam sistem. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| :----------- | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Request Body

| Key      | Tipe Data | Required | Keterangan                  |
| -------- | --------- | -------- | --------------------------- |
| name     | string    | true     | Nama Administrator          |
| email    | string    | true     | Alamat Email Administrator  |
| password | string    | true     | Password minimal 6 karakter |

##### Response

```http
HTTP STATUS CODE: 201
```

```json
{
    "code": 201,
    "status": "success",
    "message": "new admin has been registred!",
    "admin": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com",
        "status": "active"
    }
}
```

------

#### Get Admins List

```http
GET /admins
```

Digunakan untuk mendapatkan list semua admin dalam sistem e-commerce. Endpoint ini hanya bisa diakses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| :----------- | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "admin": [
    	{
            "_id": "jas9bh39sjasbd.....",
            "name": "JhonDoe",
            "email": "JhonDoe@email.com",
            "status": "active"
    	},
		{
            "_id": "jas9bhbcyia712bd.....",
            "name": "JhonDoe2",
            "email": "JhonDoe2@email.com",
            "status": "susspend"
    	}
    ]
}
```
------
#### Get Admin Profile

```http
GET /admins/profile
```

Digunakan untuk mendaftarkan profile admin yang digunakan login kedalam sistem. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| :----------- | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "profile": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com",
        "status": "active"
    }
}
```

----------

#### Get Admin Data By Admin ID

```http
GET /admins/:id
```

Digunakan untuk mendaftarkan data admin berdasarkan Admin ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| :----------- | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
| :id  | string    | true     | admin ID   |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "admin": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com",
        "status": "active"
    }
}
```

----------

#### Edit Admin Data By Admin ID

```http
PATCH /admins/:id
```

Digunakan untuk mengubah data admin (***name, email***) berdasarkan admin ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| :----------- | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
| :id  | string    | true     | admin ID   |

##### Request Body

| Key   | Tipe Data | Required | Keterangan                 |
| ----- | --------- | -------- | -------------------------- |
| name  | string    | true     | Nama Administrator         |
| email | string    | true     | Alamat Email Administrator |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "message": "admin profile has been updated!",
    "admin": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com",
        "status": "active"
    }
}
```

----------

#### Deactive Admin By Admin ID

```http
DELETE /admins/:id
```

Digunakan untuk mengubah menonaktifkan status user admin berdasarkan admin ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| :----------- | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
| :id  | string    | true     | admin ID   |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "message": "admin accout has been deactive!",
    "admin": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com",
        "status": "deactive"
    }
}
```

----------

### Customers

#### New Customer

```http
POST /new customers
```

Digunakan untuk mendaftarkan cuatomer baru kedalam sistem. 

##### Request Header

| Key      | Tipe Data | Required | Keterangan          |
| -------- | --------- | -------- | ------------------- |
| name     | string    | true     | Nama Customer       |
| email    | string    | true     | Alamat Email        |
| phone    | string    | true     | Nomor Handphone     |
| password | string    | true     | Minimal 6 Character |

##### Response

```http
HTTP STATUS CODE: 201
```

```json
{
    "code": 201,
    "status": "success",
    "message": "new user has been registred !!!",
    "admin": {
        "_id": "jas9bh39sjasbd.....",
        "name": "JhonDoe",
        "email": "JhonDoe@email.com",
        "phone": "08123456789",
        "status": "active"
    }
}
```

------------------------------------

#### Get Customer List

```http
GET /customers
```

Digunakan untuk mendapatkan list semua customer dalam sistem e-commerce. Endpoint ini hanya bisa diakses dengan auth level admin.

##### Request Header

| Key          | Tipe Data | Required | Keterangan                     |
| ------------ | --------- | -------- | ------------------------------ |
| access_token | string    | true     | access_token dengan role admin |

##### Response

```http
HTTP STATUS CODE: 200
```

```json
{
    "code": 200,
    "status": "success",
    "customers": [
    	{
            "_id": "jas9bh39sjasbd.....",
            "name": "JhonDoe",
            "email": "JhonDoe@email.com",
            "phone": "08123456789",
            "status": "active"
    	},
		{
            "_id": "jas9bh39sjasbd.....",
            "name": "JhonDoe",
            "email": "JhonDoe@email.com",
            "phone": "08123456789",
            "status": "active"
    	}
    ]
}
```

----------------------------------

#### Get Customer Profile

```http
GET /customer/profile
```

Digunakan untuk mendaftarkan profile customer yang digunakan login kedalam sistem. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

-----------------------------------

#### Edit Customer Data By Customer ID

```http
PATCH /customer/:id
```

Digunakan untuk mengubah data customer(***name, email***) berdasarkan customer ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Body

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------

#### Deactive Customer By Customer ID

```http
DELETE /customer/:id
```

Digunakan untuk mengubah menonaktifkan status user customer berdasarkan admin ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------

### Categories

#### New Category

```http
POST /new category
```

Digunakan untuk mendaftarkan category baru kedalam sistem. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Body

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |
|      |           |          |            |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

------------------------------------

#### Get Category List

```http
GET /category
```

Get All Categories

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

---------------------------------------

#### Get Category Data By Category ID

```http
GET /category/:id
```

Get Category Data by Category _id

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------

#### Edit Category Data By Category ID

```http
PATCH /category/:id
```

Digunakan untuk mengubah data category berdasarkan category ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Body

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------

#### Deactive Category By Category ID

```http
DELETE /category/:id
```

Digunakan untuk mengubah menonaktifkan category berdasarkan admin ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------------------------------------

### Products

#### New Products

```http
POST /new products
```

Digunakan untuk mendaftarkan products baru kedalam sistem. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Body

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |
|      |           |          |            |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

------------------------------------

#### Get Products List

```http
GET /Products
```

Get All Categories

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

---------------------------------------

#### Get Products Data By Products ID

```http
GET /products/:id
```

Get products Data by products_id

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------

#### Edit Products Data By Products ID

```http
PATCH /products/:id
```

Digunakan untuk mengubah data products berdasarkan products ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Body

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

----------

#### Deactive Products By Products ID

```http
DELETE /products/:id
```

Digunakan untuk mengubah menonaktifkan products berdasarkan admin ID. Endpoint ini hanya bisa di akses dengan auth level admin.

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

--------------------------------------

### Shopping Cart

#### Edit Cart

```http
PATCH /cart
```

Edit Cart (Yang Sedang Login)

##### Request Header

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Params

| Key  | Tipe Data | Required | Keterangan |
| :--- | --------- | -------- | ---------- |
|      |           |          |            |

##### Request Body

| Key  | Tipe Data | Required | Keterangan |
| ---- | --------- | -------- | ---------- |
|      |           |          |            |
|      |           |          |            |

##### Response

```http
HTTP STATUS CODE: 200
```

```json

```

