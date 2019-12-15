# ecommerce

## Installation Package

```
$ npm install
```

# Routes User

## Register

```
POST : http://localhost:3000/user/
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @email String *required
 * @name String *required
 * @password String *required
 */
```
Response
```
/**
 * @success status(201) data(access_token)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Login

```
POST : http://localhost:3000/user/login
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Body
```
/**
 * @email String *required
 * @password String *required
 */
```
Response
```
/**
 * @success status(200) data(access_token, email)
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## show cart

```
GET : http://localhost:3000/user/
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| NO                     | NO                   |

Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(user's cart) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## add to cart

```
PUT : http://localhost:3000/user
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | NO                   |

Body
```
/**
 * @product String *required
 * @amount Number *required
 */
```

Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(user's cart) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## decrease amount

```
PUT : http://localhost:3000/user/decrease
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @product String *required
 */
```

Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(user's cart) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## delete from cart

```
PUT : http://localhost:3000/user/remove-cart
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**

 * @Product String *required
 */
```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(201) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Empty cart

```
PATCH : http://localhost:3000/user/empty
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
## Add Tag article

```
PATCH : http://localhost:3000/article/tag/:id
```

| Authenticate User only | Authorized User only |
|------------------------|----------------------|
| YES                    | YES                  |

Body
```
/**
 * @tag String *required
 */
```
Headers
```
/**
 * @token access_token *required
 */
```
Response
```
/**
 * @success status(200) data( obj(article) )
 * @error   status(error code) data(error)
 */
```
------------------------------------------------
