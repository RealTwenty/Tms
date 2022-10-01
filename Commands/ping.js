module.exports = {
    name: "ping",
    description: "returns websocket ping",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply({ content: `${client.ws.ping}ms!` });
    },
};