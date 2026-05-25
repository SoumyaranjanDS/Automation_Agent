const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const campaignRoutes = require("./routes/campaignRoutes")
const leadRoutes = require("./routes/leadRoutes")
const webhookRoutes = require("./routes/webhookRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes")

const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())

// Rate limiting
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000
});
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use('/api/', apiLimiter);
app.use('/api/auth', authLimiter);

app.get("/", (req, res) => {
    res.send(`Backend is running on ${process.env.PORT}`)
})

app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/campaigns", analyticsRoutes); // Mount analytics on campaigns
app.use("/api/leads", leadRoutes);
app.use("/api/webhooks", webhookRoutes);

const startServer = () => {
    app.listen(process.env.PORT, () => {
        connectDB();
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}

startServer();
