# Pocket-Emails

A compact tool that sends digest emails from your [Pocket](http://getpocket.com) account with [Mailgun](http://mailgun.com).

## Quick Start

Clone the repo to make use of our `example`:

```
$ git clone https://github.com/jondot/pocket-emails
$ cd pocket-emails/example
$ yarn
```

Edit `config.json` with your Pocket `consumer_key` and then authenticate to get an access key:

```
$ yarn auth
< follow instructions >
```

Fill in your access key into `config.json`.

Next, fill in your Mailgun credentials.


## Extras

You can control how `pocket-emails` behave, by previewing or sending or both:

```
"send": true,
"preview": false
```

For customizing your email template look at `emails/`.


# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/init-ts-lib/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2018 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
