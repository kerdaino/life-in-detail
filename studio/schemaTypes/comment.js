// 📄 /schemas/comment.js
// This schema defines a comment document, allowing users to leave messages on blog posts or Q&A entries.

export default {
  name: 'comment', // 🆔 Internal schema ID used in queries and references
  title: 'Comment', // 🖼️ Display name in Sanity Studio
  type: 'document', // 📦 Declares this as a document (top-level content type)

  fields: [
    {
      name: 'post', // 🔗 Reference field linking to either a Q&A or User Blog post
      title: 'Related Post',
      type: 'reference',
      to: [
        { type: 'qaPost' },     // ✅ Link to Q&A post
        { type: 'userBlog' }    // ✅ Or link to a blog post
      ],
      validation: Rule => Rule.required() // 🛡️ Ensure a comment must be attached to a post
    },
    {
      name: 'name', // 👤 Commenter’s display name
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required() // 🛡️ Name is required
    },
    {
      name: 'message', // 💬 Actual comment content
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required() // 🛡️ Message must not be empty
    },
    {
      name: 'date', // 📅 Timestamp for when the comment was made
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString() // 🕓 Auto-fill with current time on creation
    }
  ]
}
