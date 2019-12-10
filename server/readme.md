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


