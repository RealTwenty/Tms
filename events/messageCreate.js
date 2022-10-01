const client = require("../index");
const prefix = `$`
const blacklist = require("../models/blacklist");

client.on("messageCreate", async (message) => {
  const blacklisted = await blacklist.findOne({ userID: message.author.id })
  if(blacklisted) return
  if(message.content.startsWith(prefix)) {
    const args = message.content.trim().slice(prefix.length).split(/ +/g)
    const commandName = args.shift();
    const command = client.commands.get(commandName)
    console.log(commandName)
    if(!command) return message.reply("Not a valid command!");
    
    command.run(client, message, args);
  } 
})