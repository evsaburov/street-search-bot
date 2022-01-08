require('dotenv').config();
const { BOT_TOKEN } = process.env;

const { Telegraf } = require('telegraf');
const Stage = require('telegraf/stage');

const TSL = require('telegraf-session-local');

//commands
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
//scenes
const regionScene = require('./scenes/region');
const maxScene = require('./scenes/max');

const init = async (bot, config) => {
  //stage, scence
  const stage = new Stage([regionScene, maxScene]);
  // bot.use(session());
  bot.use(new TSL({ database: 'data/sessions.json' }).middleware());
  //middleware
  bot.use(stage.middleware());
  //commands
  bot.start(startCommand());
  bot.help(helpCommand());

  bot.command('region', ctx => ctx.scene.enter('region'));
  bot.command('max', ctx => ctx.scene.enter('max'));

  //handlers
  // const messageHandler = require('./handlers/message');
  const messageHandler = require('./handlers/message');
  bot.on('message', messageHandler());

  return bot;
};

init(new Telegraf(BOT_TOKEN), process.env)
  .then(async (bot) => {
    await bot.launch();
    console.log(`lounched ${new Date()}`);
  });

module.export = init;