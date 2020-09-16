"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const routes_1 = require("./routes");
require('express-async-errors');
const app = express_1.default();
require("./database");
// Settings
app.set('port', 3000);
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Routes
app.use("/auth", routes_1.AuthRoutes);
app.use("/users", auth_middleware_1.authMiddleware, routes_1.UserRoutes);
app.use("/questions", auth_middleware_1.authMiddleware, routes_1.QuestionRoutes);
app.use(error_middleware_1.errorMiddleware);
app.listen(app.get('port'), () => {
    console.log("App listening on port 3000");
});
