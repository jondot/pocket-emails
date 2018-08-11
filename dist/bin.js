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
const email_templates_1 = __importDefault(require("email-templates"));
const fp_1 = require("lodash/fp");
const nodemailer_mailgun_transport_1 = __importDefault(require("nodemailer-mailgun-transport"));
const pocket_promise_1 = __importDefault(require("pocket-promise"));
const config_1 = __importDefault(require("./config"));
const config = config_1.default();
const pocket = new pocket_promise_1.default(fp_1.pick(['consumer_key', 'access_token'])(config.pocket));
const email = new email_templates_1.default({
    message: config.mailgun.message,
    transport: nodemailer_mailgun_transport_1.default({
        auth: {
            api_key: config.mailgun.api_key,
            domain: config.mailgun.domain
        }
    }),
    views: {
        options: {
            extension: 'ejs',
        }
    },
    // uncomment below to send emails in development/test env:
    send: config.mailgun.send,
    preview: config.mailgun.preview
});
const createArchiveActions = fp_1.map(({ item_id }) => ({ action: 'archive', item_id }));
const createItems = fp_1.flow(fp_1.values, fp_1.map(fp_1.pick(['item_id', 'resolved_title', 'resolved_url', 'excerpt', 'word_count'])), fp_1.reverse);
const main = () => __awaiter(this, void 0, void 0, function* () {
    consola_1.default.info("Fetching items from Pocket...");
    const items = createItems((yield pocket.get()).list);
    consola_1.default.debug('Response:', items);
    consola_1.default.info(`Fetched ${items.length} item(s).`);
    if (items.length === 0) {
        consola_1.default.warn(`No items found.`);
        return;
    }
    consola_1.default.info("Sending email...");
    const sendResult = yield email.send({ template: config.template, locals: { items } });
    consola_1.default.info("Sent.");
    consola_1.default.debug('Response:', sendResult);
    if (config.pocket.archive) {
        consola_1.default.info("Archiving items...");
        const resActions = yield pocket.send({ actions: createArchiveActions(items) });
        consola_1.default.info(`Archived ${items.length} item(s).`);
        consola_1.default.debug('Response:', resActions);
    }
    consola_1.default.success("Done.");
});
main();
//# sourceMappingURL=bin.js.map