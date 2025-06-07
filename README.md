# Book Review API

A RESTful API for managing book reviews and search functionality.

## Project Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd book-review-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env`
- Fill in the required environment variables:
  - `MONGODB_URI`: Your MongoDB connection string
  - `JWT_SECRET`: Your JWT secret key
  - `PORT`: Application port (default: 3000)

## How to Run Locally

1. Development mode (with auto-reload):
```bash
npm run dev
```

2. Production mode:
```bash
npm start
```

The API will be available at `http://localhost:3000`

## Example API Requests

### 1. Authentication

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
    "email": "user@example.com",
    "password": "password123"
}'
```

### 2. Books Management

#### Add a New Book (Requires Authentication)
```bash
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-token>" \
-d '{
    "title": "Example Book",
    "author": "John Doe"
}'
```

#### Get All Books (With Pagination)
```bash
curl "http://localhost:3000/books?page=1&limit=10&author=doe"
```

#### Get Book Details (With Reviews)
```bash
curl "http://localhost:3000/books/648212345678901234567890"
```

#### Update Book (Requires Authentication)
```bash
curl -X PUT http://localhost:3000/books/648212345678901234567890 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-token>" \
-d '{
    "title": "Updated Book Title"
}'
```

#### Delete Book (Requires Authentication)
```bash
curl -X DELETE http://localhost:3000/books/648212345678901234567890 \
-H "Authorization: Bearer <your-token>"
```

### 3. Reviews Management

#### Add a Review (Requires Authentication)
```bash
curl -X POST http://localhost:3000/books/648212345678901234567890/reviews \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-token>" \
-d '{
    "rating": 4.5,
    "comment": "Great book!"
}'
```

### 4. Search

#### Search Books by Title or Author
```bash
curl "http://localhost:3000/search?q=example"
```

### API Response Format

All successful responses follow this format:
```json
{
    "status": "success",
    "data": {...}
}
```

Error responses follow this format:
```json
{
    "status": "error",
    "message": "Error message",
    "code": 400
}
```

### Authentication Notes
- All book management operations (add, update, delete) require authentication
- Review operations require authentication
- Regular users can only add one review per book
- Search and getting book details are public endpoints

## Database Schema

The application uses MongoDB with three main collections:

### 1. Users Collection
```javascript
{
    _id: ObjectId,
    email: String,    // Unique
    password: String  // Hashed
}
```

### 2. Books Collection
```javascript
{
    _id: ObjectId,
    title: String,     // Required
    author: String,   // Required
    avgRating: Number // Default: 0
}
```

### 3. Reviews Collection
```javascript
{
    _id: ObjectId,
    user: ObjectId,    // Reference to User
    book: ObjectId,    // Reference to Book
    rating: Number,    // Required
    comment: String    // Required
}
```

### Relationships
- A User can have multiple Reviews (one-to-many)
- A Book can have multiple Reviews (one-to-many)
- The Book's avgRating is automatically calculated based on Reviews

### Schema Notes
- All required fields are marked with `required: true`
- Passwords are hashed before storage
- Email field in Users is unique
- Reviews maintain referential integrity with Users and Books through ObjectId references
- The schema is designed to support efficient search operations for books and reviews

## Design Decisions and Assumptions

1. **Database Choice**: MongoDB was chosen for its flexibility in handling book review data and ease of implementing search functionality.

2. **Authentication**: JWT-based authentication is implemented for secure user sessions and protected routes.

3. **API Structure**: The API follows RESTful principles with clear endpoints for books and search functionality.

4. **Validation**: Zod is used for request body validation to ensure data integrity and provide clear error messages.

5. **Development Tools**: 
   - Express.js as the web framework
   - Mongoose for MongoDB ORM
   - Nodemon for development hot-reloading
   - dotenv for environment variable management

6. **Error Handling**: The API implements consistent error handling with appropriate HTTP status codes and error messages.

## Project Structure

```
book-review-api/
├── controllers/     # API controllers
├── models/         # MongoDB models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── db/            # Database configuration
└── app.js         # Main application file
