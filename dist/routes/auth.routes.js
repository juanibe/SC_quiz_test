"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.Router();
router.post("/", auth_controller_1.authController.register);
router.post("/:id", auth_controller_1.authController.login);
exports.default = router;
