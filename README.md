# Wallet_app
------
## Database tables
  - User
  - Wallet
  - Transaction
## Api paths
  - [X] /api/v1/signup/ -> ***POST***
  - [X] /api/v1/signin/ -> ***POST***
  - [X] /api/v1/users/ -> ***GET***
  - [X] /api/v1/user/ -> ***GET***
  - [X] /api/v1/wallets/ -> ***GET*** : ***POST***
  - [ ] /api/v1/transactions/ -> ***POST***
  - [ ] /api/v1/transactions/?id= -> ***GET*** : ***PUT*** : ***DELETE***
  - [ ] /api/v1/transactions/?type={income || outcome}&categoryId={categoryId} ***GET***
## Used packages
  ```javascript
  "dependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/jsonwebtoken": "^8.5.9",
    "bcrypt": "^5.0.1",
    "dotenv": "^16.0.3",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "nodemon": "^2.0.20",
    "pg": "^8.8.0",
    "typeorm": "^0.3.10"
  },
  "devDependencies": {
    "@types/express": "^4.17.14",
    "@types/node": "^18.8.2",
    "ts-node": "^10.9.1",
    "typescript": "^4.8.4"
  }
  ```
