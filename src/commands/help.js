module.exports = () => async (ctx) => {
  ctx.reply(`
Поисковый бот на основе api https://dadata.ru/.
Регион поиска (Челябинская область, меняется /region), 
Количество результатов (По умолчанию 3, меняется /max), 
Пишем боту улицу, бот возвращает найденные у провайдера адреса.`)
};