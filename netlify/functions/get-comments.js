// 🔐 Load environment variables from .env file (including SANITY_TOKEN)
require('dotenv').config();

// 🧠 Import Sanity client library
const sanity = require('@sanity/client');

// 🔗 Initialize Sanity client with project-specific credentials
const client = sanity.createClient({
  projectId: '1pmeroly',                  // 🆔 Your Sanity project ID
  dataset: 'production',                  // 📦 Your dataset (usually 'production')
  apiVersion: '2023-01-01',               // 📅 API version (locked for stability)
  token: process.env.SANITY_TOKEN,        // 🔐 Secure access token (read permissions)
  useCdn: false                           // ❌ Always fetch fresh data (not from cache)
});

// 🚀 Netlify serverless function to fetch comments for a given post
exports.handler = async function (event) {
  // 🔍 Extract postId from URL query parameters
  const postId = event.queryStringParameters.postId;

  // 🛑 Return an error if postId is missing
  if (!postId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing post ID' })
    };
  }

  try {
    // 📥 Query Sanity for comments matching the post ID, sorted by date
    const comments = await client.fetch(
      '*[_type == "comment" && post._ref == $postId] | order(date asc)',
      { postId } // 🧩 Inject variable into GROQ query
    );

    // ✅ Return success with JSON comments array
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comments)
    };

  } catch (error) {
    // ❌ Catch and return any server error (e.g., auth, network, syntax)
    console.error("Comment fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
