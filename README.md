# **ChatGPT Integration**

API of chatGPT can make our software far more better. In this project I used ChatGPT API to generate response. It is a full-stack web application consisting of a client-side frontend and a server-side backend.

## Branches and Features

### 1. `feature#/authentication-authorization`

- **Description:** Basic starter code for a full-stack MERN software with authentication and authorization features.
- **Key Features:**
  - User sign-up functionality.
  - User log-in system.
  - Password recovery mechanism.

### 2. `feature#/initiating-chatgpt-api`

- **Description:** Implementation of the ChatGPT API for natural language conversations.
- **Key Features:**
  - User-friendly UI for a seamless chatting experience.
  - Persistence of previous messages.
  - Ability to provide a prompt and receive a ChatGPT-generated response.

### 3. `feature#/function-calling`

- **Description:** Introduction of function calling in ChatGPT with a focus on a specific function.
- **Key Features:**
  - Basic setup of a function in ChatGPT.
  - Example function: Retrieving weather information by providing a location parameter.

## Setup
1. **Clone the Repository**
   ```bash
   git clone https://github.com/fahimsahriar/chat-gpt-mern
   

2. **Navigate to the Client Folder**

    ```bash
    cd client

3. **Install Dependencies**

    ```bash
    npm install

4. **Navigate to the Server Folder**

    ```bash
    cd ../server

5. **Install Backend Dependencies**

    ```bash
    npm install

6. **Start Both Backend & Frontend Server**

    ```bash
    npm start
## **Technologies Used**

### **Frontend**

- React
- React Router DOM
- Axios
- Tailwind CSS
- Testing Library (Jest, react-testing-library)

### **Backend**

- Node.js
- Express
- MongoDB (with Mongoose)
- JWT (JSON Web Tokens) for authentication
- Bcrypt for password hashing
- Dotenv for environment variables
- Joi for request validation
- Cors for enabling CORS (Cross-Origin Resource Sharing)
- Nodemon for automatic server restarts during development

## **Contributing**

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create your feature branch (git checkout -b feature/YourFeature)
- Commit your changes (git commit -am 'Add some feature')
- Push to the branch (git push origin feature/YourFeature)
- Open a pull request

## **License**

This project is licensed under the ISC License. See the [LICENSE](https://chat.openai.com/c/LICENSE) file for details.
