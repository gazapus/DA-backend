const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRouters = require('./routes/product.route');
const networkRouters = require('./routes/network.route');
const newsRouter = require('./routes/news.route');
let headerMiddleware = require('./middleware/header');
let authRoutes = require('./routes/auth.route');
let userRoutes = require('./routes/user.route');

const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

var allowedOrigins = ['http://localhost:3000', `http://localhost:${PORT}`];

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Access denied from this origin'), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to db with mongoose
const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.use('/api/v1/product', productRouters);
app.use('/api/v1/network', networkRouters);
app.use('/api/v1/news', newsRouter);
app.use(headerMiddleware);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});