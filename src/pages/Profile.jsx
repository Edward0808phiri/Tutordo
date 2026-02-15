import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const navigate = useNavigate()
  const { user: authUser, logout } = useAuth()

  const user = {
    name: authUser?.displayName || 'Learner',
    email: authUser?.email || 'Not signed in',
    avatar: authUser?.photoURL ? null : '👤',
    photoURL: authUser?.photoURL,
    streak: 7,
    totalHours: 24,
    coursesCompleted: 3,
    achievements: 12,
  }

  const handleSignOut = async () => {
    await logout()
    navigate('/login')
  }

  const menuItems = [
    { icon: '📊', label: 'Learning Statistics', badge: null },
    { icon: '🏆', label: 'Achievements', badge: '3 new' },
    { icon: '📥', label: 'Downloaded Courses', badge: null },
    { icon: '🔔', label: 'Notifications', badge: '5' },
    { icon: '⚙️', label: 'Settings', badge: null },
    { icon: '❓', label: 'Help & Support', badge: null },
  ]

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-4xl overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user.avatar
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <div className="flex items-center mt-2 space-x-1">
              <span className="text-orange-500">🔥</span>
              <span className="text-sm font-medium text-gray-700">{user.streak} day streak</span>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{user.totalHours}h</div>
          <div className="text-blue-100 text-sm">Total Learning</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{user.coursesCompleted}</div>
          <div className="text-green-100 text-sm">Courses Done</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{user.achievements}</div>
          <div className="text-purple-100 text-sm">Achievements</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <div className="text-3xl font-bold">{user.streak}</div>
          <div className="text-orange-100 text-sm">Day Streak</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 active:bg-gray-100 transition-colors ${
              index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.badge && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                  {item.badge}
                </span>
              )}
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Code Playground Button */}
      <button 
        onClick={() => navigate('/playground')}
        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 active:opacity-90 transition-opacity shadow-lg"
      >
        <span className="text-xl">💻</span>
        <span>Code Playground</span>
      </button>

      {/* Sign Out Button */}
      <button 
        onClick={handleSignOut}
        className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-semibold border border-red-100 active:bg-red-100 transition-colors"
      >
        Sign Out
      </button>

      {/* App Version */}
      <p className="text-center text-gray-400 text-xs">
        VeroLearn v1.0.0
      </p>
    </div>
  )
}

export default Profile
