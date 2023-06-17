# Digital Cow Hut Backend

The Digital Cow Hut Backend is a powerful and scalable backend system built for managing the operations of a digital cow marketplace. It provides an advanced platform that facilitates seamless buying and selling of cows online, offering a range of features to enhance user experience and streamline transactions.

## Application Routes:
**--User--**


api/v1/auth/signup (POST)
api/v1/users (GET)
api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database


**--Cows--**


api/v1/cows (POST)
api/v1/cows (GET)
api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET) Include an id that is saved in your database
api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE) Include an id that is saved in your database


**--Pagination and Filtering routes of Cows--**


api/v1/cows?pag=1&limit=10
api/v1/cows?sortBy=price&sortOrder=asc
api/v1/cows?minPrice=20000&maxPrice=70000
api/v1/cows?location=Chattogram
api/v1/cows?searchTerm=Cha
Orders
api/v1/orders (POST)
api/v1/orders (GET)

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
- **Jest**: The Jest testing framework is used for writing unit tests and integration tests to ensure code quality, reliability, and maintainability.

## Installation and Usage

1. Clone the repository: `git clone git@github.com:Programming-Hero-Web-Course4/l2a3-cow-hut-backend-assignment-Hamed-Hasan.git`
2. Install dependencies: `npm install`
3. Configure environment variables.
4. Build the project: `npm run build`
5. Start the server: `npm start`
6. Access the API endpoints as documented in the API documentation.

