// 🔐 Load environment variables (e.g., SANITY_TOKEN) from .env file
require('dotenv').config();

// 🧠 Import the Sanity client library
const sanity = require('@sanity/client');

// 🔗 Initialize Sanity client to connect to your Sanity project
const client = sanity.createClient({
  projectId: '1pmeroly',               // 🆔 Sanity project ID
  dataset: 'production',              // 📦 Dataset name (usually 'production')
  apiVersion: '2023-01-01',           // 📅 API version to lock the schema
  token: process.env.SANITY_TOKEN,    // 🔐 Secure token from .env
  useCdn: false                       // 🚫 Don't use CDN — always get fresh content
});

// 🚀 Serverless function to fetch recent blog/Q&A posts
exports.handler = async function () {
  try {
    // 🧠 GROQ query: Get 10 most recent entries from either 'qaPost' or 'userBlog'
    const posts = await client.fetch(
      '*[_type == "qaPost" || _type == "userBlog"] | order(date desc)[0...10]'
    );

    // ✅ Return successful JSON response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',           // 🌍 Allow cross-origin requests
        'Content-Type': 'application/json'            // 📄 Response format is JSON
      },
      body: JSON.stringify(posts)                     // 🧾 Convert posts array to JSON
    };

  } catch (error) {
    // ❌ Handle any errors (e.g. network, token, query failure)
    console.error("Sanity fetch error:", error.message, error.stack);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message }) // 🧾 Return error details
    };
  }
};
