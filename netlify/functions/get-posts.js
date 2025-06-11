// netlify/functions/get-posts.js
const sanityClient = require('@sanity/client');

const client = sanityClient({
  projectId: '1pmeroly',
  dataset: 'production',
  apiVersion: '2023-01-01',
  token: process.env.SANITY_TOKEN, // Use env var for private token
  useCdn: false
});

exports.handler = async function () {
  try {
    const posts = await client.fetch(
      '*[_type == "qaPost" || _type == "userBlog"] | order(date desc)[0...10]'
    );

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (error) {
    console.error("Sanity fetch error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch posts." })
    };
  }
};
