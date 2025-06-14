// 📄 This schema defines a Podcast document type for Sanity CMS
export default {
  name: 'podcast', // 🆔 Internal name used in queries and references
  title: 'Podcast', // 🖼️ Display name in Sanity Studio UI
  type: 'document', // 📦 This defines it as a document schema
  fields: [
    {
      name: 'title', // 🔤 Internal field name
      title: 'Episode Title', // 🖊️ Label shown to user in the Studio
      type: 'string', // 📌 Single-line text input
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text', // 📝 Multi-line text for show notes, summaries, etc.
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url', // 🔗 Link to hosted podcast file (e.g., MP3, Anchor, Spotify)
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime', // 🗓️ Used for scheduling, sorting, or display
    }
  ],
}
