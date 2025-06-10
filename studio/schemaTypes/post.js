export default {
  name: 'userBlog',
  title: 'User Blog',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'author', title: 'Author', type: 'string' },
    { name: 'date', title: 'Date', type: 'datetime' }
  ]
}
