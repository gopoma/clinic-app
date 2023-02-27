# clinic-app

Web Service (REST API) that serves endpoints for a centralized medical record management system built with Node.js, Express.js, MongoDB and Mongoose in a Service Oriented Architecture (SOA).

Developers' projects built with Node.js, Express.js, MongoDB, Mongoose, Ajv, Pug, Nodemailer and html-pdf in a module MVC based Architecture.

### API Documentation

[Postman Documentation](https://documenter.getpostman.com/view/23241848/2s93CPrYGD#73ab8bc9-e8a7-4ec4-b6d7-4f9082f40d11)

### Getting Started

* In a terminal, install all the dependencies by executing the following command:

```bash
npm install
# or
yarn install
# or
pnpm install
```

* Then, create a `.env` file taking into consideration `.env.template`, filling all the assignments.

* Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

### Considerations

* We are working with JWT `token` based `HttpOnly Cookies` in Authentication.

* There are different enviroments (development and production), the main difference is in `/src/helpers/authResponse.js`, where the `secure` in all functions' implementation is depending on the environment in where we are actually working, it is supposed that when working in a development environment we are working with Postman or a proxy based HTTP client, in where `secure=false` works fine, and when working in a production enviroment we are trying to connect out Node.js application with React/Angular/Vue/Flutter/..., so `secure=true` will work, to summarise:

```bash
npm run dev # when working with just Postman

npm run start # when working with your Front End
```