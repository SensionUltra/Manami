module.exports = {
  name: "messageDelete",
  run: async (message) => {

      if (message.author.bot) return;
      const snipes = message.client.snipes.get(message.channel.id) || [];
      snipes.unshift({
        content: message.content,
        author: message.author,
        image: message.attachments.first()
          ? message.attachments.first().proxyURL
          : null,
        date: new Date().toLocaleString("en-GB", {
          dataStyle: "full",
          timeStyle: "short",
        }),
      });
      snipes.splice(10);
      message.client.snipes.set(message.channel.id, snipes);
  }, 
};
