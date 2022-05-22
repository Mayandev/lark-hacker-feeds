const axios = require('axios');
const PH_ACCESS_TOKEN = process.env.PH_ACCESS_TOKEN;
const { formatDate, getAfterNDayDate, getBeforeNDayDate } = require('./date');

async function fetchProductHunt() {
  const url = 'https://api.producthunt.com/v2/api/graphql/';
  const time = formatDate(new Date());
  const beforeOneDay = getBeforeNDayDate(time, 0);
  const afterOneDay = getAfterNDayDate(time, 1);
  const reqOptions = {
    url,
    headers: {
      Authorization: `Bearer ${PH_ACCESS_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
    data: JSON.stringify({
      query: `query { posts(first: 10, order: VOTES, postedAfter: "${beforeOneDay}", postedBefore: "${afterOneDay}") {
          edges{
            cursor
            node{
              id
              name
              tagline
              description
              url
              votesCount
              thumbnail{
                type
                url
              }
              website
              reviewsRating
}}}}`,
    }),
  };

  const { data } = await axios(reqOptions);
  const products = data.data.posts.edges || [];
  return products.map(item => item.node);
}

module.exports = fetchProductHunt;