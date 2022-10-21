const express =  require("express");
const morgan = require("morgan");
require("dotenv").config();
const userRouter = require("./routes/user");
require("./db");

const app = express();
app.use(express.json());
app.use(morgan("dev"))
app.use("/api/user", userRouter);


// app.post('/sign-in', (req, res, next) => {
//     const {email, password} = req.body;
//     if (!email || !password) return res.json({ error: 'Email/password missing!' });
//     next();
// },
//     (req, res) => {
//         res.send("<h1>Hello I am from you backend server</h1>");
//     }
// );

app.listen(8000, () => {
    console.log("The port is listening on port 8000");
})