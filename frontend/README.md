# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## CODE DOCUMENTATION:

The app consists of a frontend and a backend. The frontend provides the user interface, and the backend handles API requests and communicates with a MongoDB database for data storage.

Frontend Code:
The frontend code is responsible for the app's appearance and user interaction. It uses HTML, CSS, and JavaScript.

To run the frontend code:

Open the index.html file in a web browser.
Backend Code
The backend code handles API requests and communicates with the database. It uses Node.js, Express, MongoDB, and the Vonage API for phone number validation.

To run the backend code:

Install Node.js on your system.
Install dependencies by running npm install in the backend directory.
Set environment variables in a .env file:
MONGO_URL: MongoDB connection URL
VONAGE_API_KEY: Vonage API key
VONAGE_API_SECRET: Vonage API secret
Start the server by running node app.js in the backend directory.
API Documentation:

Number Validation API (Endpoint: /validate)

Method: POST
Request Body:
number: Number to validate
Response:
status_message: Validation status ("Success" or error message)
country_code: Country code associated with the number
country_prefix: Country prefix associated with the number
country_name: Name of the country associated with the number
Item Management APIs:

Add Item (Endpoint: /add)

Method: POST
Request Body:
name: Name of the item
description: Description of the item
mobile: Mobile number associated with the item
category: Category of the item
Response: Success message if the item is added successfully
Update Item (Endpoint: /update)

Method: POST
Request Body:
id: ID of the item to update
updatedName: Updated name of the item
updatedDescription: Updated description of the item
updatedMobile: Updated mobile number associated with the item
updatedCategory: Updated category of the item
Response: Success message if the item is updated successfully
Delete Item (Endpoint: /delete)

Method: DELETE
Request Body:
id: ID of the item to delete
Response: Success message if the item is deleted successfully
Fetch All Items (Endpoint: /all-items)

Method: GET
Response: Array of objects representing the items in the system
## Code Efficiency and Areas for Improvement:

Backend:

Implement input validation on request body parameters.

Frontend:

Implement client-side form validation.
Improve the UI design and user experience.
