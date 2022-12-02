const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
require("./db");
const userRouter = require("./routes/user");
const actorRouter = require("./routes/actor");
const movieRouter = require("./routes/movie");
const reviewRouter = require("./routes/review");
const adminRouter = require("./routes/admin");

const { handleNotFound } = require("./utils/helper");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/user", userRouter);
app.use("/api/actor", actorRouter);
app.use("/api/movie", movieRouter);
app.use("/api/review", reviewRouter);
app.use("/api/admin", adminRouter);

app.use("/*", handleNotFound);

app.use(errorHandler);

// app.post(
//   "/sign-in",
//   (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.json({ error: "email/password missing!" });
//     next();
//   },
//   (req, res) => {
//     res.send("<h1>Hello I am about page</h1>");
//   }
// );

// app.listen(8000, () => {
//   console.log("the port is listening on port 8000");
// });

const uri = process.env.MONGO_URI;
const db = uri || "mongodb://0.0.0.0:27017/review_app";
mongoose.connect(db).then(() => console.log("Connect database successfully!"));
// Content
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running port ${PORT}`);
});
