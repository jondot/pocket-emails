#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const consola_1 = __importDefault(require("consola"));
const pocket_auth_1 = __importDefault(require("pocket-auth"));
const config_1 = __importDefault(require("./config"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const config = config_1.default();
            const consumerKey = config.pocket.consumer_key;
            if (!consumerKey) {
                consola_1.default.error('No consumer key found in configuration.');
                process.exit(1);
            }
            const redirectUri = "https://google.com";
            const code = yield pocket_auth_1.default.fetchToken(consumerKey, redirectUri, {});
            const uri = pocket_auth_1.default.getRedirectUrl(code.code, redirectUri);
            consola_1.default.info("Visit the following URL and click approve in the next 10 seconds:");
            consola_1.default.info(uri);
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const r = yield pocket_auth_1.default.getAccessToken(consumerKey, code.code);
                    consola_1.default.success(r);
                }
                catch (err) {
                    consola_1.default.error("You didn't click the link and approve the application in time");
                }
            }), 10000);
        }
        catch (err) {
            consola_1.default.error(err);
        }
    });
}
main();
//# sourceMappingURL=auth.js.map