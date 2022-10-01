const { Client, CommandInteraction } = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "remove",
    description: "remove a member to a ticket",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Member = message.mentions.members.first() || args[0];
        if(message.member.roles.cache.has(config.ticket_moderater_role_id) || message.member.permissions.has("ADMINISTRATION")) {
        message.channel.permissionOverwrites.edit(Member.id, {
                        VIEW_CHANNEL: false,
        });

        message.reply({ content: `Successfully removed ${Member} from this channel` });
          
        } else {
        return message.reply({ content: "You do not have an admin role. You cannot use this command." })
          
        }
    },
};