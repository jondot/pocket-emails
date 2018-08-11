#!/usr/bin/env node

import consola from 'consola'
import auth from 'pocket-auth'
import loadConfigOrFail from './config'


async function main() {
  try {
    const config = loadConfigOrFail()
    const consumerKey = config.pocket.consumer_key
    if (!consumerKey) {
      consola.error('No consumer key found in configuration.')
      process.exit(1)
    }
    const redirectUri = "https://google.com";

    const code = await auth.fetchToken(consumerKey, redirectUri, {});
    const uri = auth.getRedirectUrl(code.code, redirectUri);
    consola.info("Visit the following URL and click approve in the next 10 seconds:");
    consola.info(uri);

    setTimeout(async () => {
      try {
        const r = await auth.getAccessToken(consumerKey, code.code);
        consola.success(r);
      } catch (err) {
        consola.error("You didn't click the link and approve the application in time");
      }
    }, 10000);
  } catch (err) {
    consola.error(err);
  }
}

main();

export { }