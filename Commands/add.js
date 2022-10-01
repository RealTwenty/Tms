const { Client, CommandInteraction } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "add",
    description: "add a member to a ticket",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Member = message.mentions.users.first();

        if(message.member.roles.cache.has(config.ticket_moderater_role_id) || message.member.permissions.has("")) {
        message.channel.permissionOverwrites.edit(Member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
        });

        message.reply({ content: `Successfully added ${Member} to this channel` });
          
        } else {
        return interaction.reply({ content: "You do not have an admin role. You cannot use this command." })
          
        }
    },
};