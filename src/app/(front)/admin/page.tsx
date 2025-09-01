import { findAllUsersFromDB } from '@/server/admin'
import { getCurrentUserServer } from '@/server/currentUserServer'
import { redirect } from 'next/navigation'
import UserActions from '@/components/userActions'

const AdminPage: React.FC = async () => {
  const loggedUser = await getCurrentUserServer()
  const users = await findAllUsersFromDB()
  const result = users && users[0] ? Object.keys(users[0]) : []
  const mapedoutKeys = (result ?? []).map((key) => <th key={key}>{key}</th>)

  const mapedoutUsers = (users ?? []).map((user) => {
    return (
      <tr key={user.id}>
        <td>
          <UserActions />
        </td>
        {Object.values(user).map((value, idx) => (
          <td key={idx}>{String(value)}</td>
        ))}
      </tr>
    )
  })

  if (loggedUser?.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <>
      <h1 className='m-auto p-9 text-3xl font-bold text-indigo-500'>
        Admin page is under construction but as admin you can still view the
        database{' '}
      </h1>
      <table>
        <tr className='border-none'>
          <th>Checkbox to make changes on this user or post</th>
          {mapedoutKeys}
        </tr>
        {mapedoutUsers}
      </table>
    </>
  )
}

export default AdminPage
