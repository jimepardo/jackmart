# Api Rest in Node.js

## Description

REST API for product management developed in Node.js and Express.

## Installation Instructions

1. Clone the repository
2. Install dependencies
```shell
npm install
```
3. Configure environment variables:
```shell
cp .env-example .env
```
- Then edit the .env file with the appropriate values for your environment.
4. Run in development mode:
```shell
npm run dev
```

## Deployment 
- https://jackmart.vercel.app/

## API Documentation

### Get All Products
- **GET** `/products`
- **Description:** Returns the list of all products.
- **Example Response:**

```shell
[
  { "id": 1, "name": "Alfombra de Bugs Bunny", "price": 150 },
  { "id": 2, "name": "Alfombra circular", "price": 1200 },
  { "id": 3, "name": "Alfombra de Los Simpsons", "price": 350 }
]

```

### Get an Specific Product
- **GET** `/products/:id`
- **Description:** Returns a specific product by its ID.
- **Parameters:** 
    - `id` (path, required): Product ID.
- **Usage Example**: `/products/5`
- **Example Response:**
```shell
{ "id": 5, "name": "Alfombra rectangular", "price": 190 }
```

### Search Products by Category
- **GET** `/products?category=keyword`
- **Description:** Returns all products that contains the category indicated.
- **Parameters:** 
    - `category` (query, required): Category product.
- **Usage Example**: `/products?category=lana`
- **Example Response:**
```shell
{ "id": 5, "name": "Alfombra rectangular", "price": 190, "category": ["lana", "azul"] }
```

### Search Products by Name
- **GET** `/products/search?name=keyword`
- **Description:** Returns products whose name contains the specified keyword.
- **Parameters:**
    - `name` (query, required): text to search within the product name.
- **Usage Example:** `/products/search?name=alfombra`
- **Example Response:**
```shell
[{ "id": 1, "name": "Alfombra de Bugs Bunny", "price": 150 },
{ "id": 2, "name": "Alfombra circular", "price": 120 }]
```

### Add a New Product
- **POST** `/products`
- **Description:** Creates a new product.
- **Body (JSON):**
```shell
{ "name": "New Product", "price": 999 }
```
- **Example Response:**
```shell
{ "id": 6, "name": "New Product", "price": 999 }
```

### Update Product
- **PUT** `/products/:id`
- **Description:** Fully updates an existing product.
- **Parameters:**
    - `id` (path, required): ID of the product to update.
- **Body (JSON):**
```shell
{ "name": "Updated Product", "price": 500 }
```
- **Example Response:**
```shell
{ "id": 1, "name": "Updated Product", "price": 500 }
```
### Partially Update a Product (PATCH)
- **PATCH** `/products/:id`
- **Description:** Partially updates an existing product.
- **Parameters:**
    - `id` (path, required): ID of the product to update.
- **Body (JSON):** Only the fields to be updated
```shell
{ "price": 600 }
```
- **Example Response:**
```shell
{ "id": 1, "name": "Alfombra ovalada verde", "price": 600 }
```

### Delete Product
- **DELETE** `/products/:id`
- **Description:** Deletes a product by its ID.
- **Parameters:**
    - `id` (path, required): ID of the product to delete.
- **Response:** 204 No Content

## Status Codes
- `200` - **OK:** Successful operation
- `201` - **Created:** Resource successfully created
- `204` - **No Content:** Resource successfully deleted
- `400` - **Bad Request:** Invalid input data
- `404` - **Not Found:** Resource not found

## Project Structure
```shell
src/
├── Controllers/
|   ├── auth.controller.js
│   └── products.controller.js
├── Middlewares/
│   └── auth.middleware.js
├── Models/
|   ├── firebase.js
|   ├── Product.js
│   └── User.js
├── Routes/
|   ├── auth.router.js
|   └── products.router.js
└── Services/
    ├── users.service.js
    └── products.service.js
```

## Technologies Used
- Node.js
- Express.js
- ES6 Modules

## Author
- Pardo, Jimena