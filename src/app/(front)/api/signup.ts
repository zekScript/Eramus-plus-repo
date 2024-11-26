import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import prisma from '@/lib/db'

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body

    try {
      // Hash the password with a salt of 10 rounds
      const hashedPassword = await bcrypt.hash(password, 10)

      // Store the username and hashed password in the database
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword
        }
      })

      res.status(201).json({ status: 'Created', user })
    } catch (error) {
      res.status(500).json({ status: 'Error', message: error.message })
    }
  } else {
    res.status(405).json({ status: 'Method Not Allowed' })
  }
}
