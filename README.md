# User Authentication with Social Media Links

## Overview
This project provides a login and signup system with the added feature of allowing users to provide and display their social media links. Built using Node.js, Express.js, and MongoDB, the application ensures secure user authentication and seamless integration of user profile information.

## Features
- **Signup and Login**: Users can create an account and log in using their email and password.
- **Social Media Links**: Upon signup, users can provide their social media links (e.g., Twitter, LinkedIn) that will be displayed on their profile page.
- **Secure Authentication**: User passwords are hashed for security using bcrypt.
- **Email Verification**: Users need to verify their email address before their account becomes active.
- **Forgot Password**: Users can reset their password by receiving a reset link via email.
- **Database Storage**: User data, including social media links, is securely stored in a MongoDB database.
- **User Profiles**: After logging in, users can view and update their profile information, including social media links.

## Technologies Used
- **Node.js**: JavaScript runtime for server-side scripting.
- **Express.js**: Web application framework for building the API endpoints.
- **MongoDB**: NoSQL database for storing user data.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating JSON Web Tokens for authentication.
- **Nodemailer**: Library for sending email verification and password reset links.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ashutoshjha23/User-Authentication-with-Social-Media-Links.git
    cd User-Authentication-with-Social-Media-Links
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:
    ```dotenv
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and go to `http://localhost:8080` to access the application.
2. Use the signup page to create a new account.
3. After logging in, you can update your profile with social media links.
4. If you forget your password, use the forgot password link on the login page to receive a reset link via email.

## Contributing
Feel free to fork the repository and submit pull requests. For any issues or feature requests, please open an issue on the GitHub repository page.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
