const Discord = require('discord.js');
const config = require('./config.json');
const helper = require('./helper.js');
const message = require('./message.json');

const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

function helperCallback(option, message, theme) {
  switch (option) {
    case 'message':
      helper.sendMessage(message);
      break;
    case 'gif':
      helper.sendGif(theme, message);
      break;
  }
}

function surprise(callback) {
  (function loop() {
    var now = new Date();
    if (now.getHours() === 8 && now.getMinutes() === 30) {
      callback('gif', message.goodMorning, 'wakeup');
    } else if (now.getHours() === 12 && now.getMinutes() === 0) {
      callback('gif', message.lunch, 'lunch');
    } else if (now.getHours() === 17 && now.getMinutes() === 0) {
      callback('message', message.standup);
    } else if (now.getHours() === 18 && now.getMinutes() === 0) {
      callback('gif', message.goodNight, 'sleepy');
    }
    now = new Date();
    var delay = 60000 - (now % 60000);
    setTimeout(loop, delay);
  })();
}

surprise(helperCallback);