#!/usr/bin/env node
require('dotenv').config({ debug: true, path: "./.env.local" })
import { getEmails } from './email'


require("yargs")
  .usage("$0 <cmd> [args]")
  .command(
    "slack email [channel]",
    "fetches slack emails from channel",
    () => {},
    getEmails
  )
  .help()
  .showHelpOnFail(true)
  .demandCommand(1, "")
  .parse();
