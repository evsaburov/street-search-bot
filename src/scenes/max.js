const Sceane = require('telegraf/scenes/base');

const max = new Sceane('max');
max.enter(ctx => ctx.reply('Укажите, сколько адресов искать.'));
max.on('text', ctx => {

  parsed = parseInt(ctx.message.text);
  if ( typeof(parsed) !== typeof(10) || parsed > 11 ){
    return ctx.reply('Должно быть указано число, не более 10.');
  }

  ctx.session.max = parsed;

  ctx.reply(`Будет предложено не более ${ctx.message.text} вариантов.`);
  return ctx.scene.leave();
});

max.leave(ctx => ctx.reply('Выбор закончен'));
max.on('message', ctx => ctx.reply('Для количество вариантов, вводить только текст'));

module.exports = max;