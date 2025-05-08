import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
        if (error) {
            return res.status(403).json({ message: "Token is not valid" });
        }

        req.userId = payload.userId;
        next();
    });
};

export default verifyToken;
