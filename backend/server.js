const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const campaignRoutes = require("./routes/campaignRoutes")

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get("/", (req, res) => {
    res.send(`Backend is running on ${process.env.PORT}`)
})

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);

const startServer = () => {
    app.listen(process.env.PORT, () => {
        connectDB();
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}

startServer();
