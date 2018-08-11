#!/usr/bin/env node

import consola from 'consola'
import Email from 'email-templates'
import { flow, map, pick, reverse, values } from 'lodash/fp'
import mg from 'nodemailer-mailgun-transport'
import Pocket from 'pocket-promise'
import loadConfigOrFail from './config'
const config = loadConfigOrFail()

const pocket = new Pocket(pick(['consumer_key', 'access_token'])(config.pocket))
const email = new Email({
    message: config.mailgun.message,
    transport: mg({
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
})


const createArchiveActions = map(({ item_id }) => ({ action: 'archive', item_id }))
const createItems = flow(
    values,
    map(pick(['item_id', 'resolved_title', 'resolved_url', 'excerpt', 'word_count'])),
    reverse
)

const main = async () => {
    consola.info("Fetching items from Pocket...")
    const items = createItems((await pocket.get()).list)
    consola.debug('Response:', items)
    consola.info(`Fetched ${items.length} item(s).`)
    if (items.length === 0) {
        consola.warn(`No items found.`)
        return
    }

    consola.info("Sending email...")
    const sendResult = await email.send({ template: config.template, locals: { items } })
    consola.info("Sent.")
    consola.debug('Response:', sendResult)

    if (config.pocket.archive) {
        consola.info("Archiving items...")
        const resActions = await pocket.send({ actions: createArchiveActions(items) })
        consola.info(`Archived ${items.length} item(s).`)
        consola.debug('Response:', resActions)
    }
    consola.success("Done.")
}


main()

export { }