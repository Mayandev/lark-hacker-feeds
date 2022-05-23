const axios = require('axios');


async function fetchHackerNews() {
  const url = `https://hacker-news.firebaseio.com/v0/showstories.json`;
  const { data = [] } = await axios.get(url);
  const promises = data
      .slice(0, 10)
      .map((itemId) => axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`));
  const newses = await Promise.all(promises);
  return newses.map(item => item.data);
}

module.exports = fetchHackerNews;