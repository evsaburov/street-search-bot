const Sceane = require('telegraf/scenes/base');

const region = new Sceane('region');
region.enter(ctx => ctx.reply('Выберете регион поиска'));

region.on('text', ctx => {

  if (ctx.message.text.length < 3) {
    return ctx.reply('Регион поиска не менее 4 символов');
  }

  ctx.session.region = ctx.message.text.toLowerCase();

  ctx.reply(`${ctx.message.text} - регион установлен по умолчанию`);
  return ctx.scene.leave();
});

region.leave(ctx => ctx.reply('Выбор закончен'));
region.on('message', ctx => ctx.reply('Для установки региона, вводить только текст'));

module.exports = region;