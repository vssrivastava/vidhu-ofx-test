/**
 * Service to fetch data through GET API
 * @param {String} url 
 */
const _fetchService = url => {
  return fetch(url)
  .then(res => res.json())
  .catch(e => ({error: 'fetch error'}));
};

export const fetchQuote = (from, to, amount) => (_fetchService(`https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${from}/${to}/${amount}?format=json`));
