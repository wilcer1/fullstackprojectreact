# React App - Perfect Movies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The project is a website for cinemas.

The project is deployed to Heroku at https://perfect-movies.herokuapp.com.

If you wish to run the project on your localhost, download it, and use the following commands:
    - npm i
    installs all the node_modules
    - npm run build
    builds the project
    - npm start
    runs the project


## Technical Solution
The project uses node.js in combination with react.js to operate, and a mySQL database which stores data.
The API of the project is built using express REST API, which connects the project to the database and fetches data.
The project uses JWT Webtoken to verify and authorize logins and registers in the project.
To see the other various modules incorporated in the project, see package.json.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the express server, from the server.js file.

### `npm run potato`

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