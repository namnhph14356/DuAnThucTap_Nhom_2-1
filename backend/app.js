const express =  require("express");
const userRouter = require("./routes/user");

const app = express();

app.use("/api", userRouter);

app.get('/', (req, res) => {
    res.send("<h1>Hello I am from you backend server</h1>");
})

app.listen(8000, () => {
    console.log("The port is listening on port 8000");
})