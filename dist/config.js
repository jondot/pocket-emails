"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
exports.default = () => {
    const configPath = path_1.default.join(process.cwd(), "config.json");
    if (!fs_extra_1.default.existsSync(configPath)) {
        consola_1.default.error('No configuration file "config.json" found.');
        process.exit(1);
    }
    const config = require(configPath);
    return config;
};
//# sourceMappingURL=config.js.map