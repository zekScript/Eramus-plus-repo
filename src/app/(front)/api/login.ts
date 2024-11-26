import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import prisma from '@/lib/db'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    try {
      // Get the user from the database
      const user = await prisma.user.findUnique({
        where: { username }
      })

      if (user && await bcrypt.compare(password, user.password)) {
        // Password matches
        res.status(200).json({ status: 'Success', message: 'Login successful' })
      } else {
        // Invalid username or password
        res.status(403).json({ status: 'Error', message: 'Invalid credentials' })
      }
    } catch (error) {
      res.status(500).json({ status: 'Error', message: error.message })
    }
  } else {
    res.status(405).json({ status: 'Method Not Allowed' })
  }
}
