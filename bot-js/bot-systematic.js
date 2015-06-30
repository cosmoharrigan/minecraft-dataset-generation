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
var sleep = require('sleep');

// create and connect the bot
var mineflayer = require('mineflayer');
var bot = mineflayer.createBot({
  host: CONFIG_SERVER,
  port: CONFIG_PORT,
  username: CONFIG_EMAIL,
  password: CONFIG_PASSWORD, });

bot.on('login', function() {
  // wait a few seconds to allow the user to spectate the bot
  sleep.sleep(5);

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

  // defines the range within which the parameters will vary
  XMIN = -10;
  YMIN = 3;
  ZMIN = 0;
  XMAX = 10;
  YMAX = 9;
  ZMAX = 10;

  // Small range for testing:
  // XMAX = -8;
  // YMAX = 4;
  // ZMAX = 1;

  // initialize the environment so that it starts empty
  for (x = -16; x < 16; x++) {
    for (y = 3; y < 16; y++) {
    	for (z = -16; z < 16; z++) {
  			bot.chat('/setblock ' + x + ' ' + y + ' ' + z + ' air');
  		}
  	}
  }

  // initialize the bot position
  bot.chat('/tp 0 2 -10');

  // choose the different block types that will be used
  blockTypes = ['stone', 'log', 'bedrock', 'diamond_ore', 'pumpkin']
  x = XMIN;  // range: -10 to 10
  y = YMIN;   // range: 3 to 9
  z = ZMIN;   // range: 0 to 10

  block.x = x;
  block.y = y;
  block.z = z;

  blockTypeIndex = 0;

  firstIteration = true;

  // This function runs periodically
  setInterval(function() {
    blockType = blockTypes[blockTypeIndex];

    // iterate over the different block positions
    // remove the previous block
    bot.chat('/setblock ' + block.x + ' ' + block.y + ' ' + block.z + ' air');

    // choose the position of the new block
    block.x = x;
    block.y = y;
    block.z = z;

    // set the new block
    bot.chat('/setblock ' + block.x + ' ' + block.y + ' ' + block.z + ' ' + blockType);

    // periodically reset the lighting and weather
    if (i % 500 == 0) {
      // make sure the lighting stays the same
      bot.chat('/time set 1000');
      // make sure it doesn't rain
      bot.chat('/weather clear');
    }

    // save a screenshot with the counter as the filename
    command = '/usr/sbin/screencapture ' + i + '.png';
    // exec(command, function callback(error, stdout, stderr) {} );

    // log the current parameters
    console.log(i + ',' +                      // counter
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

    // check if we covered all the block positions already
    if (x == XMAX && y == YMAX && z == ZMAX) {
      // if so, go to the next block type
      blockTypeIndex++;
      // and reset to the initial block position
      x = XMIN;
      y = YMIN;
      z = ZMIN;
    }

    // otherwise, advance to the next block position
    if (x == XMAX) {
      x = XMIN;

      if (y == YMAX) {
        y = YMIN;

        if (z == ZMAX) {
          z = ZMIN;
        } else {
          z++;
        }
      } else {
        y++;
      }
    } else {
      x++;
    }

    // check if we covered all the block types
    if (blockTypeIndex == 5) {
      process.exit(); // done
    }
  }, 1 * 500);  // delay between updates in milliseconds
}
