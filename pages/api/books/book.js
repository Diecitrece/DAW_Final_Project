// api/books/book.js

import dbConnect from '../../../lib/dbConnect'
import Books from '../../../models/book'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const books = await Books.find({})
        res.status(200).json({books})
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      break
    default:
      break
  }
}