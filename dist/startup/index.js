"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class Server {
    constructor({ router }) {
        this._express = express_1.default();
        this._router = router;
    }
    start() {
        this._express.use(this._router);
        return new Promise(resolve => {
            this._express.listen(3000, () => {
                console.log("App running on port 3000");
                resolve();
            });
        });
    }
}
exports.default = Server;
