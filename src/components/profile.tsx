interface ProfileProps {
      user: { username: string }
}
    
    const Profile = ({ user }: ProfileProps) => {
      return (
        <div>
          <h1>Your Profile</h1>
          <p>Welcome, {user.username}!</p>
        </div>
      )
    }
    
    export default Profile
    