// Bot for collecting training data

// Requires https://github.com/andrewrk/mineflayer
// Usage: node bot.js

// Set the following parameters before running:
CONFIG_EMAIL = ''
CONFIG_PASSWORD = ''
CONFIG_SERVER = 'localhost'
CONFIG_PORT = 25565

var fs = require('fs');
var os = require('os');
var path = require('path');
var exec = require('child_process').exec;

// create and connect the bot
var mineflayer = require('mineflayer');
var bot = mineflayer.createBot({
  host: CONFIG_SERVER,
  port: CONFIG_PORT,
  username: CONFIG_EMAIL,
  password: CONFIG_PASSWORD, });

bot.on('login', function() {
  main();
});

// returns an integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// chooses one element from a list at random
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function main() {
  i = 0;
  block = {};
  block.x = 0;
  block.y = 0;
  block.z = 0;

  // initialize the environment so that it starts empty
  for (x = -16; x < 16; x++) {
    for (y = 2; y < 16; y++) {
      for (z = -16; z < 16; z++) {
        bot.chat('/setblock ' + x + ' ' + y + ' ' + z + ' air');
      }
    }
  }

  // This function runs periodically
  setInterval(function() {
    // set a new position every 100 iterations
    if (i % 10 == 0) {
      x = getRandomInt(-10, 11);
      z = getRandomInt(-14, -3);
      bot.chat('/tp ' + x + ' ' + 2 + ' ' + z);
    }

    // update the pitch and yaw every iteration
    // yaw = (i / 100) * 6.28;
    yaw = Math.random()*0.60 - 0.30 + 3.14;
    pitch = Math.random()*0.40 - 0.20;
    bot.look(yaw, pitch);

    // update the block every 100 iterations
    if (i % 100 == 0) {
      // remove the previous block
      bot.chat('/setblock ' + block.x + ' ' + block.y + ' ' + block.z + ' air');

      // choose the position of the new block
      block.x = getRandomInt(-10, 11);
      block.y = getRandomInt(2, 11);
      block.z = getRandomInt(2, 15);

      // choose the new block type
      blockTypes = ['stone', 'wood', 'leaves', 'ice', 'pumpkin']
      blockType = choose(blockTypes)

      // set the new block
      bot.chat('/setblock ' + block.x + ' ' + block.y + ' ' + block.z + ' ' + blockType);

      // make sure the lighting stays the same
      bot.chat('/time set 1000');
      // make sure it doesn't rain
      bot.chat('/weather clear');
    }

    // obtain the timestamp that will be used to correlate the parameters tuple
    // with the screenshot
    timestamp = Date.now().toString();

    // save a screenshot with the timestamp as the filename
    command = '/usr/sbin/screencapture ' + timestamp + '.png';
    exec(command, function callback(error, stdout, stderr) {} );

    // log the current parameters
    console.log(timestamp + ',' +              // timestamp
                block.x + ',' +                // block x
                block.y + ',' +                // block y
                block.z + ',' +                // block z
                blockType + ',' +              // block type
                bot.entity.position.x + ',' +  // bot x
                bot.entity.position.y + ',' +  // bot y
                bot.entity.position.z + ',' +  // bot z
                bot.entity.pitch + ',' +       // bot pitch
                bot.entity.yaw);               // bot yaw

  	i++;
  }, 1 * 500);  // delay between updates in milliseconds
}
