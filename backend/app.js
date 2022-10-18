import express from "express";
import userRouter from "./routes/user";

const app = express();

app.use(userRouter);

app.get('/', (req, res) => {
    res.send("<h1>Hello I am from you backend server</h1>");
})

app.listen(8000, () => {
    console.log("The port is listening on port 8000");
})