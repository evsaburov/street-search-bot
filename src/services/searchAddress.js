const axios = require('axios');

module.exports = (query, max) => {

  return axios({
    method: 'POST',
    url: url,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    data: {
      'query': query,
      'count': max
    }
  })
    .then(res => {
      let body = [];
      
      res.data.suggestions.forEach(adr => {
        // console.log(adr);
        mess = `<b>${adr.value}</b>
Почтовый инд.:  <b>${adr.data.postal_code || 'нет'}</b>
ФИАС улицы:      <b>${adr.data.street_fias_id || 'нет'}</b>
КЛАДР улицы:    <b>${adr.data.street_kladr_id || 'нет'}</b>
Широта: ${adr.data.geo_lat || 'нет'} Долгота: ${adr.data.geo_lon || 'нет'}
<a href="https://yandex.ru/maps/?ll=${adr.data.geo_lon},${adr.data.geo_lat}&z=17">Открыть на карте</a>

`;
        body.push(mess);
      });
      ret = body.join('') || 'нет вариантов';
      return ret
    })
    .catch(err => {
      // console.log(err);
      return err;
    });
};