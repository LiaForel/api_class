const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers

app.use('/api/v1/bootcamps', bootcamps);

app.use(errorHandler);

const PORT = process.env.PORT || 5003;

const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);

// Handle unhandled promise rejections
process.on('unhandled rejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server and exit process
  server.close(() => process.exit(1));
});
