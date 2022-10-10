require('dotenv').config();
const { BOT_TOKEN } = process.env;
const { Telegraf } = require('telegraf');
const Stage = require('telegraf/stage');
const TSL = require('telegraf-session-local');
const startCommand = require('./commands/start');
const helpCommand = require('./commands/help');
const regionScene = require('./scenes/region');
const maxScene = require('./scenes/max');

const init = async (bot, config) => {
  const stage = new Stage([regionScene, maxScene]);
  bot.use(new TSL({ database: 'data/sessions.json' }).middleware());
  bot.use(stage.middleware());
  bot.start(startCommand());
  bot.help(helpCommand());
  bot.command('region', ctx => ctx.scene.enter('region'));
  bot.command('max', ctx => ctx.scene.enter('max'));
  const messageHandler = require('./handlers/message');
  bot.on('message', messageHandler());
  return bot;
};

init(new Telegraf(BOT_TOKEN), process.env)
  .then(async (bot) => {
    await bot.launch();
    console.log(`launched ${new Date()}`);
  });

module.export = init;