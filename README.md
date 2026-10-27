# Backend Authentication System

A RESTful authentication backend built using Node.js, Express.js, and MongoDB. It provides user registration, login, JWT-based authentication, and password recovery through email verification and secure password reset functionality.

## Features

- User registration
- User login and authentication
- Password hashing using bcrypt
- JWT token generation and verification
- Forgot password functionality
- Password reset emails using Nodemailer
- Time-limited password reset tokens
- Password reset and database updates
- REST API endpoints
- Environment variable configuration using dotenv
- Error handling and HTTP status codes
- CORS support

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Nodemailer
- dotenv
- cors

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate an existing user |
| POST | `/forgot-password` | Request a password reset email |
| GET | `/verify-token` | Verify the password reset token |
| PUT | `/change-password` | Update the user's password |

**Note:** These endpoint paths assume your Express router is mounted at the root. If you use a prefix such as `/api/auth`, include that prefix when testing the endpoints.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dominic-rozario1210/authentication-backend
   ```

2. Navigate to the project directory:

   ```bash
   cd auth-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_KEY=your_secure_jwt_secret
   USER=your_email_address
   PASS=your_email_app_password
   ```

   Use the exact environment variable names referenced by your application. Never commit real credentials or secrets to GitHub.

5. Start the server:

   ```bash
   npm run dev
   ```

   Alternatively, use `npm start` if that script is configured in your `package.json`.

## Password Reset Flow

1. The user submits their registered email address.
2. The backend generates a JWT reset token that expires after 10 minutes.
3. Nodemailer sends a password reset link to the user's email.
4. The frontend submits the token for verification.
5. The user enters a new password.
6. The backend verifies the token, hashes the new password using bcrypt, and saves it to MongoDB.

## Security

- Passwords are stored as bcrypt hashes.
- Password reset tokens have a limited validity period.
- Sensitive configuration values are stored in environment variables.
- API requests are validated before database updates.

## API Testing

Test the endpoints using Postman or another API client. Provide the required JSON request body and the `Authorization: Bearer <token>` header for token-protected endpoints.

## Future Improvements

- Add rate limiting to authentication endpoints.
- Add email verification during registration.
- Improve password policy enforcement.
- Add automated API tests.
- Deploy the backend to a production hosting platform.

## Author

Dominic Rozario
