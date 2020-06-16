const getMessage = require('./helper/message-helper').getMessage;
const getQuote = require('./helper/quote-helper').getQuote;
const sendGif = require('./helper/send-helper').sendGif;
const sendMessage = require('./helper/send-helper').sendMessage;
const sendQuote = require('./helper/send-helper').sendQuote;

function main() {
  (function loop() {
    var now = new Date();
    if (now.getHours() === 8 && now.getMinutes() === 30) {
      console.log('Morning message');
      getMessage('morning')
        .then(({ message }) => {
          sendGif('wakeup', message);
        })
      getQuote()
        .then(({ quote, author }) => {
          sendQuote(quote, author);
        });
    } else if (now.getHours() === 12 && now.getMinutes() === 0) {
      console.log('Lunch message');
      getMessage('lunch')
        .then(({ message }) => {
          sendGif('lunch', message);
        });
    } else if (now.getHours() === 17 && now.getMinutes() === 0) {
      console.log('Stand-up message');
      getMessage('standup')
        .then(({ message }) => {
          sendMessage(message);
        });
    } else if (now.getHours() === 18 && now.getMinutes() === 0) {
      console.log('Night message');
      getMessage('night')
        .then(({ message }) => {
          sendGif('sleepy', message);
        });
    }
    now = new Date();
    var delay = 60000 - (now % 60000);
    setTimeout(loop, delay);
  })();
}

main();