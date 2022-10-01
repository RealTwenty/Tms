const { Client, CommandInteraction } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "add",
    description: "add a member to a ticket",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "member",
        description: "Add a member to an active ticket",
        required: "true",
        type: "USER"
      }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const Member = interaction.options.getMember("member");

        if(interaction.member.roles.cache.has(config.ticket_moderater_role_id)) {
        interaction.channel.permissionOverwrites.edit(Member.id, {
                        SEND_MESSAGES: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
        });

        interaction.followUp({ content: `Successfully added ${Member} to this channel` });
          
        } else {
        return interaction.followUp({ content: "You do not have an admin role. You cannot use this command." })
          
        }
    },
};