import dbConnect from '../../../lib/dbConnect'
import Users from '../../../models/user'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const users = await Users.find({})
        res.status(200).json({users})
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