const { decodedToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");
    const userId = decodedToken(token);

    if (!userId) {
        return res.status(401).json({ message: "Token is not valid" });
    }

    req.user = { id: userId };
    next();
};

module.exports = auth;
