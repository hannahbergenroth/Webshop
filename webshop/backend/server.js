const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

require("dotenv").config();

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected!"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.use(passport.initialize());

require("./config/passport")(passport);

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

const users = require("./routes/api/users");
app.use("/api/users", users);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
