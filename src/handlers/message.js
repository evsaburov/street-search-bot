
const searchAddress = require('../services/searchAddress');
const { DADATA_API_KEY } = process.env;

module.exports = () => async (ctx) => {

  let region = ctx.session.region || 'Челябинская область';
  let max = ctx.session.max || 3;
  let query = `${region}, ${ctx.message.text}`;

  url = 'https://suggestions.dadata.ru:443/suggestions/api/4_1/rs/suggest/address';
  if (!region || !max || !query ) return;

  try {
    const result = await searchAddress(query, max);
    // console.log(result);
    // return ctx.replyWithMarkdown(result);
    return ctx.replyWithHTML(result,  {disable_web_page_preview: true });
  } catch (error) {
    // return ctx.reply(error + ' some error');
    return ctx.reply('some error');
  }
};