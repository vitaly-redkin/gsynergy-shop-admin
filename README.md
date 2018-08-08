The code in this repository is a simple React application written as a
GSynergy Web App challenge.

This project was bootstrapped with [Create React App (CRA)](https://github.com/facebookincubator/create-react-app).

To run the project you can issue such commands in the console:

1. npm start
This command runs standard CRA script to run the application in the development mode. You can open it the browser as http://localhost:3000

2. npm run-script start-x
This command runds NodeJS server with Express to serve a PRODUCTION version of the application
built with "npm run build" command. You can open it the browser as http://localhost:8080

To run tests just run "npm test" command.

The application uses such "third-party" NPM packages:
- reactstrap (React Bootstrap 4 implementation)
- apollo-boost, graphql, graphql-tag, react-apollo (Apollo Client for GraphQL)
- react-ga (React Google Analytics wrapper)

When started the application generates its own demo data of 100 products and 10 categories.
Each product may already belong to one or more categories - the product card tooltip shows the list.

You can drag and drop product to the category - the product category list in the tooltip is updated and the category product count increases. You cannot add the same product to the same category twice - there are several checks to prevent it from happenning.

The application was tested with Chrome 67 and FireFox 61 on Windows. The application DOES NOT work on IE 11 - some array polyfills are probably required to make it compatible.

The applicatioh has been deployed to [Heroku](https://gsynergy-web-app-challenge.herokuapp.com/). Please note it uses a free dyno there, so the application may be "sleepy" and you may have to click Refresh couple of times and wait a bit.
