# Cryptocurrency Price Alert System

## Overview

The Cryptocurrency Price Alert System allows users to create alerts for specific cryptocurrencies based on price thresholds. Users receive email notifications when the price of a cryptocurrency goes above or below their specified values. The system is built using NestJS for the backend and Next.js for the frontend, with AWS services for deployment and data management.

## Features

- **User Authentication**: Users can create accounts and log in to set up alerts.
- **Price Alerts**: Users can create alerts for when a cryptocurrency's price exceeds or falls below a specified value.
- **Email Notifications**: Alerts are sent via email when the specified conditions are met.
- **Data Fetching**: Utilizes the CoinGecko API to fetch real-time cryptocurrency price data.
- **Caching**: Implemented AWS Redis caching to optimize API calls.

## Technology Stack

- **Frontend**: Next.js
- **Backend**: NestJS
- **Database**: MySQL (AWS RDS)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: SMTP
- **Containerization**: Docker
- **Deployment**: AWS Elastic Container Service (ECS)
- **Load Balancing**: AWS Elastic Load Balancer
- **Scheduling**: AWS EventBridge Scheduler and AWS Lambda
- **Caching**: AWS Redis

## Architecture

The system architecture consists of the following components:

### Frontend (Next.js):

- Handles user interactions and displays data.
- Communicates with the backend API to manage user accounts and alerts.

### Backend (NestJS):

- Manages user authentication and authorization.
- Provides endpoints for creating and managing price alerts.
- Fetches cryptocurrency price data from the CoinGecko API.

### Database (MySQL):

- Stores user information and price alerts.
- Contains two main tables:
  - **users**: Stores userId, email, and encrypted password.
  - **userAlerts**: Stores alert details linked to users.

### Email Service:

- Sends email notifications to users when their price alerts are triggered.

### AWS Services:

- **ECS**: Hosts the containerized frontend and backend applications.
- **RDS**: Manages the MySQL database.
- **Elastic Load Balancer**: Distributes incoming traffic to the backend services.
- **EventBridge Scheduler**: Triggers a Lambda function every 10 minutes to check for fulfilled alerts.
- **Lambda Function**: Executes the logic to check alerts and send email notifications.
- **Redis**: Caches API responses to reduce the number of requests to the CoinGecko API.

## Implementation Details

### User Authentication

- **JWT Authentication**: Users are authenticated using JWT tokens that expire after one hour.
- Protected routes require a valid JWT token for access.

### Database Schema

- **Users Table**:
  - `userId`: Unique identifier for each user.
  - `email`: User's email address.
  - `password`: Encrypted password using bcrypt.
- **User Alerts Table**:
  - `alertId`: Unique identifier for each alert.
  - `userId`: Foreign key linking to the users table.
  - `cryptoSymbol`: The cryptocurrency symbol (e.g., BTC, ETH).
  - `targetPrice`: The price threshold for the alert.
  - `alertType`: Indicates whether the alert is for "above" or "below" the target price.

### Services

- **UserService**: Manages user-related operations (registration, login, etc.).
- **UserAlertService**: Handles operations related to price alerts.
- **CryptoService**: Fetches cryptocurrency price data from the CoinGecko API.
- **EmailService**: Sends email notifications to users.

### Price Alert Logic

- The Lambda function checks every 10 minutes if any price alerts have been fulfilled.
- If an alert condition is met, the backend sends an email notification to the user.

### Caching

- Implemented AWS Redis caching to store frequently accessed data.
- The goal is to reduce the number of API calls to CoinGecko by serving cached data when available.

## Limitations

- The Redis caching implementation is not fully complete; it currently does not send user data from the cache.
- Limited validations are implemented; one notable validation is for the parameters when sending alerts.

## Future Improvements

- Complete the Redis caching implementation to optimize API calls.
- Enhance validation mechanisms for user inputs and alert parameters.
- Implement additional features such as user preferences for alert notifications (e.g., SMS, push notifications).

## Conclusion

The Cryptocurrency Price Alert System is a robust application that leverages modern technologies and cloud services to provide users with timely notifications about cryptocurrency price changes. The architecture is designed for scalability and efficiency, ensuring a smooth user experience.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
