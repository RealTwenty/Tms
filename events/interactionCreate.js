const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");
const { config } = require("../index");
const { createTranscript } = require("discord-html-transcripts")
const Schema = require("../models/getClaimed");


client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply().catch(() => { });

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply();
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    const ID = Math.floor(Math.random() * 90000) + 10000;

    if (interaction.isButton()) {
        const { guild, customId, member } = interaction;

        if (!["green", "red", "close", "claim"].includes(customId)) return;


        const closeBtn = new MessageButton()
            .setCustomId("close")
            .setLabel("Save & Close Ticket")
            .setStyle("DANGER")
            .setEmoji("<a:PurpleArrow:872295371487973378>")

        const claimBtn = new MessageButton()
            .setCustomId("claim")
            .setStyle("SUCCESS")
            .setEmoji("<a:rules:985596688620199936>")
            .setLabel("Claim")

        const Buttons = new MessageActionRow().addComponents(closeBtn, claimBtn);

        const Embed = new MessageEmbed()
            .setAuthor({ name: `${guild.name} | Ticket: ${ID}`, iconURL: guild.iconURL({ dynamic: true }) })
            .setColor("GREEN")
            .setDescription("**Welcome To Lost Values Middleman Service / Claims**\n\n• The Other Traders User/ID\n• The Trade\n• Do not Ping MM \n\n**Lost Values Claims** \n • Your username:\n • What are you claiming:\n • Gamepass(If your claiming Robux):\n • Show your invites (use bot command):")
					
            .setFooter({ text: `The buttons below are staff only.` })

        switch (customId) {
            case "green":
                await guild.channels.create(`🎟️-MM-${interaction.user.username}`, {
                    type: "GUILD_TEXT",
                    parent: "1024094093908918343",
                    permissionOverwrites: [
                        {
                            id: member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                        },
                        {
                            id: guild.roles.everyone,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                        },
                        {
                          id: config.ticket_moderater_role_id,
                          allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                        }
                    ]
                }).then(async (channel) => {


                    channel.send({ embeds: [Embed], components: [Buttons], content: "<@&1013922347679481876>" });
                    await channel.send({ content: `${member} here is your ticket!` })
								
									
                    interaction.reply({ content: `${member} your ticket has been created: ${channel}`, ephemeral: true });

                }); break;
            case "red":
                await guild.channels.create(`🎟️-Claims-${interaction.user.username}`, {
                    type: "GUILD_TEXT",
                    parent: "1024094093908918343",
                    permissionOverwrites: [
                        {
                            id: member.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                        },
                        {
                            id: guild.roles.everyone,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                        },
                        {
                          id: config.ticket_moderater_role_id,
                          allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "ATTACH_FILES"]
                        }
                    ]
                }).then(async (channel) => {


                    channel.send({ embeds: [Embed], components: [Buttons], content: "<@&1016115625879404624>" });
                    await channel.send({ content: `${member} here is your ticket!` })
                  
                    interaction.reply({ content: `${member} your ticket has been created: ${channel}`, ephemeral: true });

                });
                break;
            case "close":
                if (!member.roles.cache.find((r) => r.id === config.ticket_moderater_role_id)) return interaction.reply({
                    content: "You cannot use this buttons as you do not have the administrator permissions",
                    ephemeral: true
                })
                const attachment = await createTranscript(interaction.channel, {
                    limit: -1,
                    returnBuffer: false,
                    fileName: `${interaction.channel.name} - ${interaction.user.username}.html`
                });

                const Message = await guild.channels.cache.get(config.transcripts_channel_id).send({
                    embeds: [new MessageEmbed().setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) }).setTitle(`Transcript Data: ${interaction.channel.name} \nId: ${interaction.user.id}`)],
                    files: [attachment]
                });

                interaction.reply({
                    embeds: [new MessageEmbed().setDescription(`The transcript is now saved. [Transcript](${Message.url})`).setFooter({ text: "This channel will be deleted in 10 sec" })]
                });

                setTimeout(() => {
                    interaction.channel.delete()
                }, 10 * 1000)

                Schema.findOne({ _id: interaction.channel.id }, async(error, docs) => {
                    if(error) throw error;
                    if(docs) {
                        docs.delete();
                    } else {
                        console.log("No data was found for this channel...")
                    }
                });

                break;
            case "claim":

                if (!member.roles.cache.find((r) => r.id === config.ticket_moderater_role_id)) return interaction.reply({
                    content: "You cannot use this buttons as you do not have the administrator permissions",
                    ephemeral: true
                });

                Schema.findOne({ _id: interaction.channel.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        return interaction.reply({ content: `This ticket is already claimed by: <@${data._id}>`, ephemeral: true })
                    } else {
                        new Schema({ 
                            _id: interaction.channel.id,
                            User: interaction.member.id
                        }).save();

                        Embed.addField("Claimed By:", `<@${interaction.member.id}>`)
                        Embed.setFooter({ text: "Ticket Claimed by a moderator!"})

                        return interaction.reply({ content: `You have successfully claimed this ticket`, embeds: [Embed] })
                    }
                })

                break;
        }
    };
});