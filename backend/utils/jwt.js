const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user.id
        },
        JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )
    return token;
}

const decodedToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded.id;
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, decodedToken }