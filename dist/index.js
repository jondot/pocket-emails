#!/usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('hello');
const config = require("../config.json");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var auth = require("pocket-auth");
            var consumerKey = config.consumer_key;
            var redirectUri = "https://google.com";
            let code = yield auth.fetchToken(consumerKey, redirectUri, {});
            let uri = auth.getRedirectUrl(code.code, redirectUri);
            //todo: open browser and write result to file
            console.log("Visit the following URL and click approve in the next 10 seconds:");
            console.log(uri);
            setTimeout(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let r = yield auth.getAccessToken(consumerKey, code.code);
                        console.log(r);
                    }
                    catch (err) {
                        console.log("You didn't click the link and approve the application in time");
                    }
                });
            }, 10000);
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
//# sourceMappingURL=index.js.map