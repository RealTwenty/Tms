const { Client, CommandInteraction } = require("discord.js");
const config = require("../config.json");
const blacklist = require("../models/blacklist");

module.exports = {
    name: "bl",
    description: "Blacklists a user.",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.users.first();

        if(message.member.roles.cache.has(config.ticket_moderater_role_id)) {
        if(!member) return message.reply("Please mention someone to blacklist!")
        try {
        await blacklist.create({ userID: member.id })
        message.reply("Successfully blacklisted that user!")
        } catch {
        message.reply("Something went wrong!")
        }
        } else {
        return interaction.reply({ content: "You do not have an admin role. You cannot use this command." })
          
        }
    },
};