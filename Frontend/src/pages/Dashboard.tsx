import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setUser, UserState } from '../store/userSlice'
import { getUserData, ExtendedUser } from '../services/userService'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const fetchUserData = async () => {
      if (user.id) {
        try {
          const userData = await getUserData(user.id);
          dispatch(setUser(mapUserToUserState(userData)));
        } catch (err) {
          console.error('Failed to fetch user data:', err);
        }
      }
    }

    fetchUserData()
  }, [dispatch, user.id])

  const mapUserToUserState = (user: ExtendedUser): UserState => {
    return {
      id: user.uid,
      name: user.displayName || 'Anonymous',
      email: user.email || '',
      completedChallenges: user.completedChallenges,
      currentStreak: user.currentStreak,
      badges: user.badges,
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Your Progress</h2>
          <p className="text-black">Completed Challenges: {user.completedChallenges}</p>
          <p className="text-black">Current Streak: {user.currentStreak} days</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Your Badges</h2>
          {user.badges.length > 0 ? (
            <ul>
              {user.badges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
          ) : (
            <p className="text-black">No badges earned yet. Keep coding!</p>
          )}
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-black">Recent Activity</h2>
          <p className="text-black">Coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

