const getMessage = require('./helper/message-helper').getMessage;
const getQuote = require('./helper/quote-helper').getQuote;
const getJoke = require('./helper/joke-helper').getJoke;
const sendGif = require('./helper/send-helper').sendGif;
const sendMessage = require('./helper/send-helper').sendMessage;
const sendQuote = require('./helper/send-helper').sendQuote;
const sendJoke = require('./helper/send-helper').sendJoke;
const messageTime = require('./message-time.json');

function main() {
  (function loop() {
    var now = new Date();
    if (now.getHours() === messageTime.morning.hour && now.getMinutes() === messageTime.morning.minute) {
      console.log('Morning message');
      getQuote()
        .then(({ quote, author }) => {
          sendQuote(quote, author);
        });
      getMessage('morning')
        .then(({ message }) => {
          // sendGif('cat wake up', message);
          sendMessage(message);
        })
    } else if (now.getHours() === messageTime.lunch.hour && now.getMinutes() === messageTime.lunch.minute) {
      console.log('Lunch message');
      getMessage('lunch')
        .then(({ message }) => {
          sendGif('lunch', message);
        });
    } else if (now.getHours() === messageTime.joke.hour && now.getMinutes() === messageTime.joke.minute) {
      console.log('Joke message');
      getJoke()
        .then(({ joke }) => {
          sendJoke(joke);
        });
    } else if (now.getHours() === messageTime.standup.hour && now.getMinutes() === messageTime.standup.minute) {
      console.log('Stand-up message');
      getMessage('standup')
        .then(({ message }) => {
          sendMessage(message);
        });
    } else if (now.getHours() === messageTime.night.hour && now.getMinutes() === messageTime.night.minute) {
      console.log('Night message');
      getMessage('night')
        .then(({ message }) => {
          // sendGif('cat sleep', message);
          sendMessage(message);
        });
    }
    now = new Date();
    var delay = 60000 - (now % 60000);
    setTimeout(loop, delay);
  })();
}

console.log('Webhook started');
main();