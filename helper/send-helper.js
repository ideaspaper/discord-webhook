const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../config.json');

const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

module.exports = {
  sendGif: (query, message) => {
    fetch(`https://api.tenor.com/v1/random?key=${config.tenorKey}&q=${query}&contentfilter=high&media_filter=minimal&locale=en_US&limit=1`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.results[0].media[0].gif.url;
      })
      .then((gif) => {
        let embed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setImage(gif)
        return embed;
      })
      .then((embed) => {
        webhookClient.send(message, {
          username: config.webhookName,
          embeds: [embed],
        });
      });
  },
  sendMessage: (message) => {
    webhookClient.send(message);
  },
  sendQuote: (quote, author) => {
    webhookClient.send(`> **${quote}** - _${author}_`);
  }
}