"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jsonwebtoken_1.verify(token, 'Secrey-key', (err, user) => {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        req.loggedInUser = user;
        next();
    });
};
