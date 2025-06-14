// 🔐 Load environment variables from the .env file (e.g., SANITY_TOKEN)
require("dotenv").config();

// 🚀 Netlify serverless function to POST a comment to Sanity CMS
exports.handler = async (event) => {
  // 🛑 Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed", // 🚫 Disallow non-POST requests
    };
  }

  try {
    // 🔄 Parse incoming JSON data from request body
    const data = JSON.parse(event.body);
    const { name, message, postId } = data;

    // 🧪 Validate required fields
    if (!name || !message || !postId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    // 🔐 Get Sanity token from environment variable
    const sanityToken = process.env.SANITY_TOKEN;

    // 🔗 Sanity Data Mutation API endpoint
    const sanityUrl =
      "https://1pmeroly.api.sanity.io/v2023-01-01/data/mutate/production";

    // 📡 Send a POST request to Sanity to create a new comment document
    const response = await fetch(sanityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sanityToken}`, // 🔐 Auth header using token
      },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: "comment", // 🧱 Sanity schema type
              name,             // 👤 Commenter's name
              message,          // 💬 Comment text
              date: new Date().toISOString(), // 🗓️ Current timestamp
              post: {
                _type: "reference", // 🔗 Reference field
                _ref: postId,       // 🔗 ID of the related post
              },
            },
          },
        ],
      }),
    });

    // 📥 Parse response from Sanity API
    const result = await response.json();

    // ❌ Handle mutation errors
    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: result.message || "Mutation failed",
        }),
      };
    }

    // ✅ Return success message with Sanity response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };

  } catch (error) {
    // 🛑 Catch and return any unexpected errors (e.g., parsing, network)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
