const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRouters = require('./routes/product.route');
const networkRouters = require('./routes/network.route');
const newsRouter = require('./routes/news.route');
let headerMiddleware = require('./middleware/header');
let authRoutes = require('./routes/auth.route');
let testRoutes = require('./routes/user.route');

const app = express();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to db with mongoose
const db = require("./models");

// Get user role model
const Role = db.role;


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


function initial() {
  Role.estimatedDocumentCount(async (err, count) => {
    if (!err && count === 0) {
      let userRole = new Role({ name: "user" });
      let adminRole = new Role({ name: "admin" });
      let moderatorRole = new Role({ name: "moderator" });
      try {
        await userRole.save()
        await adminRole.save()
        await moderatorRole.save()
        console.log("added user, admin, and moderator to roles collection");
      } catch (err) {
        console.log("error", err);
      }
    }
  })
}

app.use('/api/v1/product', productRouters);
app.use('/api/v1/network', networkRouters);
app.use('/api/v1/news', newsRouter);
app.use(headerMiddleware);
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});