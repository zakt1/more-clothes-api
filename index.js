const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

dotenv.config()


mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => console.log("Connected to DB (mongoDB)"))
    .catch((err) => {
        console.log(err);
    });

    app.get("/api/test", () => {
        console.log(("get test successful"))
    });

app.use(express.json());
    
app.use("/api/users", userRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("Sever running at port 5000")
});