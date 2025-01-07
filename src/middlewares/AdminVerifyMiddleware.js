
const jwt = require('jsonwebtoken');
exports.verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization; //get token from Authorization header
        console.log(token);

        if (!token) {
            return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
        }

        // Verify the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        const id = decoded.userId;
        const role = decoded.role;
        req.headers.id = id;
        req.headers.role = role;
        if (!decoded) {
            return res.status(401).json({
                status: "fail",
                msg: "Invalid token please login"
            });
        }
        next();

    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid Token" });
    }
}