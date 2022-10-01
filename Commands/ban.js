


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
  name: "ban",
  description: "ban command",
  run: async (client, message, args) => {
    const guild = message.guild;
    const id = args[0]
    const reason = args[2];
    const member =
      message.mentions.members.first() ||
      guild.members.cache.get(id);
      const time = args[1];
      const parseTime = parseInt(time);

    const infperms = new MessageEmbed()
      .setColor("DARK_RED")
      .setDescription(
        "Sorry, you dont have permissions to execute this command!"
      )
      .setAuthor("Permission Error");

    if (!message.member.permissions.has("BAN_MEMBERS"))
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

      if(!time) {
        const time = `Permanent`
      }

      if(!member) {
        const noban = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('Error')
        .setDescription('Please Tell Me Who to ban.')
        message.reply({ embeds: [noban] })
      }

      const banembed = new MessageEmbed()
      .setColor("DARK_AQUA")
      .setAuthor(`Ban Hammer Has Spoken!`)
      .setDescription(
        `User Got Banned ${member.user.username}#${member.user.discriminator} \n \n Banned by ${message.author.username}#${message.author.discriminator}`
      );
    member.ban({ reason, parseTime });

    message.reply({ embeds: [banembed] });
  },
}; 