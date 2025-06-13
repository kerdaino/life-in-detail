require('dotenv').config();
const sanity = require('@sanity/client');

const client = sanity.createClient({
  projectId: '1pmeroly',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

exports.handler = async function (event) {
  const postId = event.queryStringParameters.postId;

  if (!postId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing post ID' })
    };
  }

  try {
    const comments = await client.fetch(
      '*[_type == "comment" && post._ref == $postId] | order(date asc)',
      { postId }
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comments)
    };
  } catch (error) {
    console.error("Comment fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
