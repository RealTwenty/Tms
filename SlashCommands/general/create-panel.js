const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../config.json");

const emojis = {
  nitro: "<:nitro:1016119241050697828>",
  giftcards: "<:robux:1016118771951345744>",
  accounts: "<:Invite:1016119694727577650>",
  servers: "<:s_discord:1016120402826760232>",
	Available: "<:online:1016120775113183295>",
	Unavailable: "<:dnd:1016121323510050887>",
	Deprecated: "<:offline:1016120821036613642> "
}

module.exports = {
    name: "panel",
    description: "create a ticket panel for users to open tickets.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "channel",
            description: "The channel you want to send the panel to.",
            required: "true",
            type: "CHANNEL",
            channelTypes: ["GUILD_TEXT"]
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel("channel");

        // if(interaction.member.id !== interaction.guild.ownerId) return interaction.reply({ 
        //     embeds: [
        //         new MessageEmbed()
        //         .setColor("RED")
        //         .setTitle("Error")
        //         .setDescription("Hello, sorry to inform you, but only the server owner can use this command!")
        //     ],
        //     ephemeral: true
        // });

        const embed = new MessageEmbed()
                .setTitle("Request a Middleman / Claims")
                .setDescription(`**__MM Rules/Guidelines__**\n**Before you create a ticket, Here are the rules you take notice of:**\n\n> Make sure the user you are trading with is in the server.\n> Do not ping any Middleman, await patiently for one to come.\n> Make sure the other trader agrees on using Middleman.\n> Timewasters/Trolling/Not vouching the middleman will lead to a **<@&1016116348918714528>** And Check Out Our <#1013922369947050095> And <#1013922362497974393>\n\n**__What we don't middleman__**\n> ${emojis.nitro} Nitro\n> ${emojis.giftcards} Roblox Giftcards\n> ${emojis.accounts} Accounts \n> ${emojis.servers} Discord Servers \n\n**__Availability.__**\n\n${emojis.Available} Availiable\n${emojis.Unavailable}Unavailable\n${emojis.Deprecated}Deprecated`)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))


        const embed_image = new MessageEmbed()
            .setImage("https://media.discordapp.net/attachments/1007463149970137101/1011070713244962906/ezgif.com-gif-maker_26.gif")

            

        const green = new MessageButton()
            .setStyle('SUCCESS')
            .setLabel(config.buttons.button1.label)
            .setCustomId('green')
			      .setEmoji('985596636992503818')

        const red = new MessageButton()
            .setStyle('DANGER')
            .setLabel(config.buttons.button2.label)
            .setCustomId('red')
             .setEmoji('989004512159215678')

        let row = new MessageActionRow().addComponents(green).addComponents(red)

        interaction.followUp({ content: "Successfully sent the panel to <#" + channel + ">", ephemeral: true });
        channel.send({ embeds: [embed_image] });
        channel.send({ embeds: [embed], components: [row] });
    },
};