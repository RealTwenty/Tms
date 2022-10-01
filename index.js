const { Client, Collection } = require("discord.js");
const keepAlive = require("./server.js");

/* ------------------------------ Making Client ----------------------------- */
const client = new Client({
    intents: 32767,
});
module.exports = client;
/* ------------------------------ End of Client ----------------------------- */

// * Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

keepAlive();
client.login(process.env.TOKEN);


// ! Anti Crash DO NOT TOUCH
process.on('unhandledRejection', (error) => {
    console.log(`${error.stack}`)
});
process.on("uncaughtException", (error, origin) => {
    console.log(`${error.stack}`)
})
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`${error.stack}`)
});
process.on('beforeExit', (code) => {
    console.log(`${code}`)
});
process.on('exit', (code) => {
    console.log(`${code}`)
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log(`Type Error:` + type)
    ||
    console.log(`Promise Error:` + promise)
    ||
    console.log(`Reason Error:` + reason)
});
// ! ANTI CRASH DO NOT TOUCH