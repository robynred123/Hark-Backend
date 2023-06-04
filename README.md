# 🕊 Hark Backend 🕊

This is the backend for the Hark Tech Test.
This is a node Expressjs CRUD application with one GET endpoint, which can easily be expanded to include more if needed.

## Prerequisites

This application uses [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to handle package management, as such you will need to set this up if you haven't already.

## Run Locally

To run locally clone the project and enter the directory in the terminal of your choice

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

The server will run on http://localhost:8080/

To test this is working smoothly, you can make a test GET request to http://localhost:8080/ping

If you wish to test the root GET endpoint using postman, please comment out line 19 in `server.ts`:

`res.set("Access-Control-Allow-Origin", "http://localhost:1234")`

Please be aware, that if this is commented out, requests from the front-end component will fail.

## Tests

Tests have been written using jest.

Run the tests

```
npm run test
```

## Improvements & known issues

There's many ways this can be improved, most notable improvements include:

- Additional endpoints for retrieving data separately
- Improved error handling & error messages
- 404 handler in case users hit an endpoint that doesn't exist
- Improved security to prevent requests from unwanted sources (if this were to be deployed)
- caching of data to prevent processing data at run time for each request

---

- bracket notation for retrieving the "date" property on weather data was returning undefined
