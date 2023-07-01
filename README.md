### cd backend

# BookStore

## Installation

Install my-project with npm

```bash
  git clone https://github.com/hayelom123/book-store.git
  //add .env variables
  cd backend npm i
  npm start

```

## Create product

.env //create environment variable in backend folder with the following variables

```bash
  NODE_ENV
  HOST
  PORT
  MONGODB_URL
  cloud_name
  api_key
  api_secret
  JWT_SECRET
  JWT_ACCESS_EXPIRATION_MINUTES
  JWT_REFRESH_EXPIRATION_DAYS
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES

```

## Create product

then create some books
like the following

http://localhost:8000/api/book [post]//create or upload new product

```
 //types for data post
  title  //string
  description //string
  discountRate //number
  coverImage //file
  price   //number
```

![Alt text](image.png)
