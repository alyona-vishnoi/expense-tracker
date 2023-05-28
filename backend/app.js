const express = require('express');

/*CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. */
const cors = require('cors');
const { db } = require('./db/DB.JS');
const {readdirSync} = require('fs')

/* These lines of code are importing the Express.js framework and creating an instance of it. The
`express` constant is assigned the value of the `express` module, which is a function that creates
an instance of the Express application. The `app` constant is assigned the value of the instance of
the Express application created by calling the `express()` function. This instance of the Express
application is used to define routes, middleware, and other functionalities of the web application. */
const app = express()


/* `require('dotenv').config()` loads the `.env` file into the Node.js environment, which contains
environment variables that can be used in the application. */

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
/* `app.use(express.json())` is a middleware that parses incoming requests with JSON payloads. It
allows the application to access the request body as a JavaScript object. */
app.use(express.json())
app.use(cors())

//routes
/* `readdirSync('./routes')` reads the contents of the `./routes` directory synchronously and returns
an array of filenames. */
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
