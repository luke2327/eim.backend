"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('this run!');
});
app.listen(config_1.PORT, () => {
    console.log(`server running on PORT ${config_1.PORT}`);
});
