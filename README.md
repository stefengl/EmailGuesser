# Coding Challenge - Email Guesser
submitted on 24th May 2022 by Stefan Englmeier


# Getting started
After installing Node.js and NPM navigate to the UI folder using either cmd, powershell or bash and npm install and npm start, then open another instance navigate to api, npm install and npm start

Browser should open and display localhost:3000


# Design doc

## Backend
For the backend I decided to go with a Node.js solution and its widely known express module to create the API and HTTP endpoint required.
Although the setup is a bit more complex I decided to go with TypeScript because it allows me to write code with static types.
For testing I decided to go with Jest.
The application follows the 'Inversion of Control' principle to be as flexible as possible. Each part of the application is easily exchangable.
For example lets say we decide on using an actual database for the data access then we would only have to inject another implementation of the abstraction into the EmailGuesserService.
To handle failed requests or custom edge cases where email derivation is impossible I raise custom errors and catch these on the routes/presentation layer to prepare specific responses.

# Frontend
On the frontend I went with React and TypeScript. I kept the UI very simplistic so you will find most the logic inside the default AppComponent.
Since it is only a single http request I decided to use the Promised based fetch API of the browser.
