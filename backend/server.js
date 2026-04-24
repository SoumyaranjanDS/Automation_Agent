const express = require("express")
const dotenv = require("dotenv")
dotenv.config()

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send(`Backend is running on ${process.env.PORT}`)
})

app.use("/api/auth", authRoutes);

const startServer = () => {
    app.listen(process.env.PORT, () => {
        connectDB();
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}

startServer();
