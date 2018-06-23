/**
 * Service to fetch data through GET API
 * @param {String} url 
 */
const _fetchService = url => {
  return fetch(url)
  .then(res => res.json())
  .catch(e => {error: 'fetch error'});
};

export const fetchQuote = () => (_fetchService('../data/content.json'));
