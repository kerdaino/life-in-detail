export default {
  name: 'qaPost',
  title: 'Q&A Post',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
    { name: 'date', title: 'Date', type: 'datetime' },
    { name: 'author', title: 'Author', type: 'string' }
  ]
}
