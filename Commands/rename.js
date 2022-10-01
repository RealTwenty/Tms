const { Client, CommandInteraction } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "rename",
    description: "Changes a channel name",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.channel
        const newName = args[1] || args[0]
        if(!newName) return message.reply("Please provide a new name for the ticket")
          channel.edit({
            name: newName
          })
          .then(() => message.reply("Succesfully changed the ticket name!"))
          .catch(() => message.reply("Something went wrong unexpectedly!"))
        }
};