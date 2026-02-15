import { useState, useEffect } from 'react'
import ProgressRing from '../components/ProgressRing'
import LessonCard from '../components/LessonCard'

function Home() {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Simulate API fetch
  useEffect(() => {
    const fetchLessons = async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const mockLessons = [
        {
          id: 1,
          title: 'Introduction to React',
          duration: '15 min',
          status: 'completed',
          icon: '⚛️',
        },
        {
          id: 2,
          title: 'Components & Props',
          duration: '20 min',
          status: 'completed',
          icon: '🧩',
        },
        {
          id: 3,
          title: 'State Management',
          duration: '25 min',
          status: 'in-progress',
          icon: '🔄',
        },
        {
          id: 4,
          title: 'Hooks Deep Dive',
          duration: '30 min',
          status: 'locked',
          icon: '🪝',
        },
        {
          id: 5,
          title: 'Context API',
          duration: '20 min',
          status: 'locked',
          icon: '🌐',
        },
        {
          id: 6,
          title: 'Performance Optimization',
          duration: '25 min',
          status: 'locked',
          icon: '⚡',
        },
      ]

      setLessons(mockLessons)
      setLoading(false)
      
      // Calculate progress
      const completed = mockLessons.filter(l => l.status === 'completed').length
      setProgress(Math.round((completed / mockLessons.length) * 100))
    }

    fetchLessons()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Introduction Video */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Introduction Video</h3>
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <video 
            className="w-full aspect-video"
            controls
            poster=""
            playsInline
          >
            <source src="/tutorial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="p-3">
            <p className="text-sm text-gray-600">Watch this video to get started with VeroLearn</p>
          </div>
        </div>
      </div>

      {/* Welcome Card with Progress Ring */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">Welcome back! 👋</h2>
            <p className="text-indigo-100 text-sm mb-3">
              Keep up the great work on your learning journey.
            </p>
            <div className="flex items-center space-x-2">
              <div className="h-2 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
          <div className="ml-4">
            <div className="bg-white rounded-full p-1">
              <ProgressRing progress={progress} size={70} strokeWidth={6} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-indigo-600">2</div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-yellow-600">1</div>
          <div className="text-xs text-gray-500">In Progress</div>
        </div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-gray-400">3</div>
          <div className="text-xs text-gray-500">Remaining</div>
        </div>
      </div>

      {/* Current Lesson */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Continue Learning</h3>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl">
              🔄
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">State Management</h4>
              <p className="text-sm text-gray-500 mb-2">25 min • 60% complete</p>
              <div className="h-2 bg-yellow-200 rounded-full overflow-hidden">
                <div className="h-full w-3/5 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold shadow-md active:scale-[0.98] transition-transform">
            Continue Lesson
          </button>
        </div>
      </div>

      {/* Lesson List */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">All Lessons</h3>
        <div className="space-y-3">
          {lessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
