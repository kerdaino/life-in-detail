// 🔌 Import all custom schema definitions
// Each of these defines a "document type" for use in Sanity Studio
import podcast from './podcast'   // 🎙️ Podcast episodes
import qaPost from './qa'         // ❓ Q&A posts (questions and answers)
import userBlog from './post'     // ✍️ User-submitted blog posts
import comment from './comment'   // 💬 Comments linked to blog or Q&A

// 📦 Export all schema types as a single array
// Sanity uses this array to build the content model visible in the Studio
export const schemaTypes = [
  qaPost,      // Q&A content
  userBlog,    // User blog content
  comment,     // Comments on posts
  podcast      // Podcast episodes
]
