# furniture e-commerce web application

#### Video Demo: https://youtu.be/uPzus4b51Jo

#### Description:
Using react HTML and CSS, I developed an e-commerce web application. As a backend, I used Firestore from Firebase. Moreover, I applied the Redux toolkit to manage data more effectively in a global context. This method makes it easy to manipulate data coming from the backend.

Javascript is used to implement all logic.

In addition, I created a rating system, a favorite feature, and an authentication method based on email and password or Google. On a variety of devices, the website is responsive.

First of all, we will discuss all the files that I created for this project. I divided my project into many files called components to make it easier for me to create a high-quality website without too much repeat of code.

The folder component was the first thing I built, and I put all my components in it. I made the navbar component which is a JSX file with all the JSX code and the logic that is needed by the navigation bar. In addition, I made the CSS for that component in a separate file. After that, I designed the home page component and styled it in its own CSS file. I created the footer and I put it in the app component that includes my main components. The home component is placed with another component in the page folder. In this folder, I placed all the pages of my web app like the products page that contains all the products that come from the backend. In addition, it contains the favorite page that shows all the favorite products of the user depending on the data of that user stored in the backend.

The detail page in the page folder shows all the details of a specific product after the user clicks on the card component.

The login page handles the login of registered users, and the register component handles the registration of newly registered users. Each of these components has its own CSS file.

The firebase file contains the js file that handles the backend logic.

The app folder holds all the redux files for global data management.

The Lottie folder contains a Jason file for a loading animation during data fetching.

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
