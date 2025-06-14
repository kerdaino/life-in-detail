// 📄 This schema defines a Q&A post used for storing questions and their answers

export default {
  name: 'qaPost', // 🆔 Internal schema ID used in Sanity queries
  title: 'Q&A Post', // 🖼️ Display name in the Studio sidebar
  type: 'document', // 📦 This schema defines a top-level document

  fields: [
    {
      name: 'question', // ❓ The user-submitted or curated question
      title: 'Question',
      type: 'string' // 🔤 Simple one-line text input
    },
    {
      name: 'answer', // 📝 Response or explanation to the question
      title: 'Answer',
      type: 'text' // 🧾 Multi-line rich explanation (can be upgraded to blockContent if needed)
    },
    {
      name: 'date', // 🗓️ When this Q&A was published or answered
      title: 'Date',
      type: 'datetime'
    },
    {
      name: 'author', // ✍️ Who answered the question (e.g., host, guest, admin)
      title: 'Author',
      type: 'string'
    }
  ]
}
