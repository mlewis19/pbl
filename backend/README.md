# KisanKart Backend (Express + MongoDB)

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

## Endpoints

- `POST /api/auth/register` - Register {name, email, password, role}
- `POST /api/auth/login` - Login {email, password}
- `GET /api/auth/me` - Get current user (Authorization: Bearer <token>)
- `POST /api/products` - Create product (multipart form-data with 'images') (producer)
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `PUT /api/products/:id` - Update product (producer)
- `DELETE /api/products/:id` - Delete product (producer)
- `POST /api/orders` - Create order
- `GET /api/orders/me` - Get my orders
- `POST /api/payments/create-order` - Create razorpay order

## Notes

- Images are stored in `/uploads` and served statically at `/uploads/<filename>`.
- This backend uses JWT for auth.
