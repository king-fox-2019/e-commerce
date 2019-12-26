# LAZALOPEDIA

E-commerce app trying to mimic real-life e-commerce transaction. It's actually fake so don't ever send your credit card. Using express as RESTfull API server, mongoose and mongoDB for database driver, and vue js for SPA framework.

## Base URL

##### Default local usage

```http
http://localhost:3000
```

##### Deployed Url

```http
http://lazalopedia.aliftaufik.site
```



## Errors

There are multiple errors that might happen, and this section is intended to capture all those errors, the causes, and possibly some ways to resolve the issues.

## User Routes

### Sign Up

##### Endpoint

```http
POST /signup
```

##### Body

- username **Required** **Unique** Must only contains lowercase letters, numbers, dots and/or underscores.
- email **Required** **Unique** Must be a valid email format.
- password **Required** Must have at least 6 characters.

##### Response

Status 201: Created

```json
{
  "message": "User registered",
  "data": {
    "username": "dummy",
    "email": "dummy@mail.com",
    "password": "123456"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTMzMzM3NjJhNWI5MzNjNTFkNDY2NCIsImVtYWlsIjoiZHVtbXlAbWFpbC5jb20iLCJpYXQiOjE1NzUxNzIwNTd9.9Wr2WAdXEp0nlkAJJUvqm4uXGYspxIFfZe-xTaLaUG4"
}
```

### Sign In

##### Endpoint

```http
POST /signin
```

#### Body

- username | email | emailUsername **Required** At least one of them must be included. `emailUsername` can contain `email` or `username` value, and is used for client side to make user able to Sign In using either `email` or `username`.
- password **Required**

##### Response

Status 200: OK

```json
{
  "message": "Sign in success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZTMzMzM3NjJhNWI5MzNjNTFkNDY2NCIsImVtYWlsIjoiZHVtbXlAbWFpbC5jb20iLCJpYXQiOjE1NzUxNzIwNTd9.9Wr2WAdXEp0nlkAJJUvqm4uXGYspxIFfZe-xTaLaUG4"
  }
}
```

### Check Session

This, as opposed to Sign In, is used to verify `access_token` and return it's payload. It's internally used to verify client access and redirects it based on the verification result.

##### Endpoint

```http
GET /user/checksession
```

##### Header

- access_token **Required**

##### Response

Status 200: OK

```json
{
  "data": {
    "_id": "5deb719a2eb4affc85871058",
    "username": "dummy",
    "email": "dummy@mail.com"
  }
}
```

## Item Routes
