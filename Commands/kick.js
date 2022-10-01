


const {
  Client,
  MessageEmbed,
  CommandInteraction,
  Guild,
  IntegrationApplication,
  Message,
} = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "kick",
  description: "kick command",
  run: async (client, message, args) => {
    const guild = message.guild;
    const id = args[0];

    const reason = args[1];
    const member =
      message.mentions.members.first() ||
      guild.members.cache.get(id);      

    const infperms = new MessageEmbed()
      .setColor("DARK_RED")
      .setDescription(
        "Sorry, you dont have permissions to execute this command!"
      )
      .setAuthor("Permission Error");

    if (!message.member.permissions.has("KICK_MEMBERS"))
      return message
        .reply({ embeds: [infperms] })
        .then((m) => {
          setTimeout(() => m.delete(), 5000);
        })
        .catch((err) => {
          console.log(err);
        });


      if(!reason) {
        const reason = `No Reason Specified.`
      }
      

      if(!member) {
        const noban = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Error')
        .setDescription('Please Tell Me Who to kick.')
        message.reply({ embeds: [noban] })
      }

      const banembed = new MessageEmbed()
      .setColor("DARK_AQUA")
      
      .setDescription(
        `User Got Kicked ${member.user.username}#${member.user.discriminator} \n \n Kicked by ${message.author.username}#${message.author.discriminator}`
      );


    member.kick({ reason});

    message.reply({ embeds: [banembed] });
  },
}; 