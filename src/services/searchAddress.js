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
        mess = `*${adr.value}*
Почтовый инд.:  *${adr.data.postal_code || 'нет'}*
ФИАС улицы:      *${adr.data.street_fias_id || 'нет'}*
КЛАДР улицы:    *${adr.data.street_kladr_id || 'нет'}*

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