// 🔐 Load environment variables from .env (e.g., SANITY_TOKEN)
require('dotenv').config();

// 🧠 Import Sanity client to interact with the CMS
const sanity = require('@sanity/client');

// 🔗 Initialize Sanity client with secure project settings
const client = sanity.createClient({
  projectId: '1pmeroly',               // 🆔 Your Sanity project ID
  dataset: 'production',              // 📦 Dataset used (usually 'production')
  apiVersion: '2023-01-01',           // 📅 API version (locked for stability)
  token: process.env.SANITY_TOKEN,    // 🔐 Read token loaded from .env
  useCdn: false                       // 🚫 Always fetch fresh data, not cached
});

// 🚀 Netlify function: Fetch a single blog/Q&A post by ID
exports.handler = async function(event) {
  // 🛡️ Restrict to only GET requests
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // 🔍 Extract post ID from URL query (e.g., ?id=abc123)
  const postId = event.queryStringParameters.id;

  // 🛑 Return error if ID is missing
  if (!postId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing post ID' })
    };
  }

  try {
    // 🧠 Fetch the matching post (from either qaPost or userBlog types)
    const post = await client.fetch(
      '*[_type in ["qaPost", "userBlog"] && _id == $id][0]', // 🧩 GROQ query with dynamic ID
      { id: postId }
    );

    // ❌ If no post was found, return 404
    if (!post) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Post not found' })
      };
    }

    // ✅ Return the post as JSON
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    };

  } catch (err) {
    // ❌ Handle any errors (e.g. network, auth, syntax)
    console.error("Error fetching post:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
