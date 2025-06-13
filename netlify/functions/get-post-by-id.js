require('dotenv').config();
const sanity = require('@sanity/client');

const client = sanity.createClient({
  projectId: '1pmeroly',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false
});

exports.handler = async function(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const postId = event.queryStringParameters.id;

  if (!postId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing post ID' }) };
  }

  try {
    const post = await client.fetch(
      '*[_type in ["qaPost", "userBlog"] && _id == $id][0]',
      { id: postId }
    );

    if (!post) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Post not found' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    };
  } catch (err) {
    console.error("Error fetching post:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
