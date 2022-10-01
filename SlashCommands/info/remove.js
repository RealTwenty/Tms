const { Client, CommandInteraction } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "remove",
    description: "remove a member to a ticket",
    type: 'CHAT_INPUT',
    options: [
      {
        name: "member",
        description: "Remove a member from an active ticket",
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
                        VIEW_CHANNEL: false,
        });

        interaction.followUp({ content: `Successfully removed ${Member} from this channel` });
          
        } else {
        return interaction.followUp({ content: "You do not have an admin role. You cannot use this command." })
          
        }
    },
};