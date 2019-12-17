# e-commerce

**User routes:**
| Routes            | Method | Description                   |
|-------------------|--------|-------------------------------|
| /users/login      | POST   | get all article               |
| /users/register   | POST   | get one article by id         |
      

**Item routes:**
| Routes        | Method | Description                   |
|---------------|--------|-------------------------------|
| /item         | GET    | get all item                  |
| /item/:id     | GET    | get one item by id            |
| /item         | POST   | create new item               | 
| /item/:id     | DELETE | delete item by ID             | 
| /item/:id     | PUT    | update item by ID             |


**Cart routes:**
| Routes        | Method | Description                   |
|---------------|--------|-------------------------------|
| /cart         | GET    | get all item by id user login |
| /cart/:id     | GET    | get one item by ID cart       |
| /cart         | POST   | create new cart               |
| /cart/:id     | DELETE | delete cart by ID cart        | 
| /cart/:id     | PUT    | update cart by ID             |


**Errors:**
| Code | Name                  | Description                  |
|------|-----------------------|------------------------------|
| 400  | CastError             | id invalid                   |
| 400  | JsonWebTokenError     | invalid token                |
| 400  | ValidationError       | validation on model is false |
| 500  | Internal server error | error by server              |
