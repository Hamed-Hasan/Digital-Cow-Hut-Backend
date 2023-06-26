# Digital Cow Hut Backend

The Digital Cow Hut Backend is a powerful and scalable backend system built for managing the operations of a digital cow marketplace. It provides an advanced platform that facilitates seamless buying and selling of cows online, offering a range of features to enhance user experience and streamline transactions.

## Live Link: https://digital-cow-hut-backend-auth.vercel.app/api/v1

## Application Routes:
**Auth--User--**


- https://digital-cow-hut-backend-auth.vercel.app/api/v1/auth/login (POST)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/users/auth/signup (POST)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/auth/refresh-token (POST)


**Auth--Admin--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/admins/create-admin (POST)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/admins/login (POST)


**--Need-Token-User--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/users (GET)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/users/64993dc7b725e2b116aeeb3f (Single GET)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/users/6499652ceca4fdb756c3a915 (PATCH)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/users/6499652ceca4fdb756c3a915 (DELETE)


**--Need-Token-Cows--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/cows/ (POST) name & age unique as error 'Internal Server Error'

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/cows/ (GET)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/cows/649972c22eeea66ab3c36adb (Single GET) 

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/cows/649972c22eeea66ab3c36adb (PATCH) name & age unique is Exist as error 'Internal Server Error'

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/cows/649972c22eeea66ab3c36adb (DELETE) 


**--Need-Token-Orders--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/orders (POST) Need to cow Id & buyer Id. in the cow must be put unique seller. in buyer must have to enough money. otherwise you may get Error!

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/orders (GET)


## Bonus Part


**--Admin--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/admins/create-admin (POST) Need data for admin

**--Need-Token-My Profile--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/orders (GET)

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/users/my-profile (PATCH)


**--Need-Token-Specific Order--**

- https://digital-cow-hut-backend-auth.vercel.app/api/v1/orders/64995b4291f850ea85498fd1 (GET)


## Key Features

- **Advanced Order Creation**: Users can create orders to purchase cows from available listings. The system performs various checks, including verifying cow availability, buyer funds, and validating the input data to ensure accurate and reliable transactions.
- **Transaction Management**: The backend handles the entire transaction process. It updates the cow's status to "sold out," deducts the cost from the buyer's budget, and adds the same amount to the seller's income. This ensures accurate financial tracking and proper status updates.
- **Order History and Tracking**: Users can view their order history, allowing them to track previous purchases and review transaction details such as the cow purchased, buyer information, and transaction timestamps. This feature enhances transparency and provides a comprehensive overview of past transactions.
- **Error Handling and Exception Management**: The backend includes robust error handling mechanisms to gracefully handle exceptions. It provides meaningful error messages to clients, ensuring a smooth user experience and effective troubleshooting.
- **API Documentation**: The project offers clear and comprehensive API documentation, providing detailed information about endpoints, request/response formats, and authentication requirements. This documentation simplifies integration with the backend and allows developers to quickly understand and utilize the provided APIs.
- **TypeScript**: The entire backend codebase is written in TypeScript, a statically typed superset of JavaScript. TypeScript enhances code reliability, improves developer productivity, and provides better code maintainability through static type checking.

## Technologies Used

- **Node.js**: The backend is built on the Node.js platform, which provides a robust and scalable runtime environment for JavaScript-based applications.
- **Express.js**: Express.js is utilized as the web application framework to handle routing, request handling, and middleware management.
- **MongoDB**: The MongoDB database management system is employed to store and retrieve data efficiently, offering flexibility and scalability for handling cow and user data.
- **Mongoose**: Mongoose, an Object-Document Mapping (ODM) library, is used to simplify database interactions, schema modeling, and data validation.
- **TypeScript**: The entire backend codebase is written in TypeScript, providing static typing, better code organization, and improved developer experience.



## Installation and Usage

1. Clone the repository: `git clone git@github.com:Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-Hamed-Hasan.git`
2. Install dependencies: `npm install`
3. Configure environment variables.
4. Build the project: `npm run build`
5. Start the server: `npm start`
6. Access the API endpoints as documented in the API documentation.

