# 🛍️ Product Management App (MERN Stack)

A full-stack **CRUD** application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) that allows you to manage products—add, edit, delete, search, and view product details.


## 🚀 Tech Stack

### Frontend
- React.js – For building interactive user interfaces using components.
- React Router DOM – Handles page navigation (e.g., listing, add, edit, view product pages).
- Axios – For making HTTP requests to your backend API (e.g., fetch, add, update, delete products).
- Material UI – Used for UI components like Button, TextField, Box, and layout styling.
- React Icons – Provides SVG icons like view/edit/delete (e.g., MdEdit, MdDelete, MdVisibility).
- React DataTable Component – For displaying the product list in a table with pagination and search functionality.

### Backend

- Node.js – JavaScript runtime to run backend code.
- Express.js – Web framework for handling routing and middleware logic (e.g., API endpoints).
- MongoDB – NoSQL database used to store product data.
- Mongoose – ODM (Object Data Modeling) library for MongoDB, used to define the Product schema and perform database operations.
- dotenv – Loads environment variables from .env file (e.g., MongoDB connection URI, port).

---
### Project URLs

| Part     | URL                                                    |
| -------- | ------------------------------------------------------ |
| Frontend | [http://localhost:5173](http://localhost:5173)         |
| Backend  | [http://localhost:5000](http://localhost:5000)         |
| API Base | [http://localhost:5000/api](http://localhost:5000/api) |

### Setup Instractions 

1. frontend Setup
- cd app
- npm install
- npm run dev

This will start the frontend on: http://localhost:5173

2. Backend Setup
- cd server
- npm install 

This will start the backend on: http://localhost:5000

### How to Use
- Go to http://localhost:5173
- Use the "Add Product" button to create new products.
- Use the search bar to filter products by name.
- Click on View, Edit, or Delete to perform actions on a product.

## notes
- Make sure MongoDB is running before starting the backend.
- The frontend uses Axios to connect to the backend API via http://localhost:5000/api.
