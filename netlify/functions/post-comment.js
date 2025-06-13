require("dotenv").config();

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { name, message, postId } = data;

    if (!name || !message || !postId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const sanityToken = process.env.SANITY_TOKEN;
    const sanityUrl =
      "https://1pmeroly.api.sanity.io/v2023-01-01/data/mutate/production";

    const response = await fetch(sanityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sanityToken}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: "comment",
              name,
              message,
              date: new Date().toISOString(),
              post: {
                _type: "reference",
                _ref: postId,
              },
            },
          },
        ],
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: result.message || "Mutation failed",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
