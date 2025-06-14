// 📄 This schema defines a user-submitted blog post document in Sanity CMS

export default {
  name: 'userBlog', // 🆔 Unique internal name used in Sanity queries
  title: 'User Blog', // 🖼️ Display name shown in the Studio
  type: 'document', // 📦 Defines this as a top-level document

  fields: [
    {
      name: 'title', // 📰 Blog post title
      title: 'Title',
      type: 'string' // 🔤 Single-line input for the headline
    },
    {
      name: 'content', // 📝 Main body of the blog post
      title: 'Content',
      type: 'text' // 🧾 Multi-line input (can upgrade to blockContent for rich formatting)
    },
    {
      name: 'author', // ✍️ Name of the user who submitted the post
      title: 'Author',
      type: 'string'
    },
    {
      name: 'date', // 🗓️ Date of submission or publishing
      title: 'Date',
      type: 'datetime'
    }
  ]
}
