# Authentication System API

## Description
Authentication System API is an authentication REST API that takes care of signup, signin, update account, forgot password, reset password, refresh token, get users, get user, delete user.

## Installation
Clone the repository and cd into the project directory  
Run `npm install` or `yarn install` to install all project dependencies  
Create .env file and add your database details - Check `.env.example` file  
Run `npm run develop` or `yarn develop` to start local server which will run on localhost:1337  

## Usage
### API Endpoints
- POST `/api/auth/login` to login into your account with access token and create your session 
- POST `/api/auth/forgot-password` to request link to change password
- PUT `/api/auth/reset-password` to update account password 
- PUT `/api/auth/refresh-token` to get new access token every 10minutes to keep user authenticated if session is still active 
- GET `/api/auth/logout` to logout of your account and destroy your session
- POST `/api/users` to create user's account
- GET `/api/users` to get all users
- GET `/api/users/:userId` to get a user's data by id
- PUT `/api/users/:userId` to update a user's data by id
- DELETE `/api/users/:userId` to delete user's account by id

## Built With
Node/Express - The web framework used  
MongoDB - DataBase Management System  
Redis - For session management  

## Contributing: 
To contribute, raise an issue and it will be reviewed

## Author
[Amarachi Goodness](https://amarachigoodness74.vercel.app)

## License
This project is licensed under the ISC License
