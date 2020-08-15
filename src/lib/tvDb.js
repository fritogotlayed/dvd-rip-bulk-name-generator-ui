import axios from 'axios';
import urlJoin from 'url-join';
import tvdb from 'node-tvdb';

const tvDbApiKey = '27271f6ae2f1a42b69f7094020a39fd9';
const tvDbUserName = 'fritogotlayed';
const tvDbUserKey = '2061EA4B93FE1007';

const searchShow = (show) => {
  const t = new tvdb(tvDbApiKey);
  return t.getSeriesByName(show)
    .then((results) => {
      debugger;
      return results;
    });
  // const fullUrl = urlJoin(
  //   'https://api.thetvdb.com',
  //   'search/series'
  // )
  // return axios.get(fullUrl, {
  //   params: { name: show }
  // })
};

export default {
  searchShow,
};