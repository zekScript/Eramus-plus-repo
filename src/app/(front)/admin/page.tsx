import { findAllUsersFromDB } from '@/server/admin'
import { getCurrentUserServer } from '@/server/currentUserServer'
import { redirect } from 'next/navigation'

const AdminPage: React.FC = async () => {
  const loggedUser = await getCurrentUserServer()
  const users = await findAllUsersFromDB()
  const result = users && users[0] ? Object.keys(users[0]) : []

  const mapedoutKeys = (result ?? []).map((key) => <th key={key}>{key}</th>)

  const mapedoutUsers = (users ?? []).map((user) => {
    return (
      <tr key={user.id} id='id' >
        {Object.values(user).map((value, idx) => (
          <td key={idx}>
            {String(value)}
          </td>
        ))}
      </tr>
    )
  })

  if (loggedUser?.role !== 'ADMIN') {
    redirect('/')
  }

  

  return (
    <>
      <table>
        <tr>{mapedoutKeys}</tr>

        {mapedoutUsers}
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>
            MexicoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaMexicoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </td>
        </tr>
        <tr>
          <td>Ernst Handel</td>
          <td>Roland Mendel</td>
          <td>Austria</td>
        </tr>
        <tr>
          <td>Island Trading</td>
          <td>Helen Bennett</td>
          <td>UK</td>
        </tr>
        <tr>
          <td>Laughing Bacchus Winecellars</td>
          <td>Yoshi Tannamuri</td>
          <td>Canada</td>
        </tr>
        <tr>
          <td>Magazzini Alimentari Riuniti</td>
          <td>Giovanni Rovelli</td>
          <td>Italy</td>
        </tr>
      </table>
    </>
  )
}

export default AdminPage
