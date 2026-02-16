import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const mockCourses = [
        {
          id: 'html-guide',
          title: 'Comprehensive Guide to HTML',
          lessons: 10,
          duration: '1h 30min',
          progress: 0,
          image: '🌐',
          color: 'from-orange-500 to-red-500',
          clickable: true,
        },
        {
          id: 'javascript-intro',
          title: 'JavaScript Introduction',
          lessons: 4,
          duration: '45min',
          progress: 0,
          image: '💛',
          color: 'from-yellow-500 to-orange-500',
          clickable: true,
        },
        {
          id: 'react-fundamentals',
          title: 'React Fundamentals',
          lessons: 12,
          duration: '3h 45min',
          progress: 40,
          image: '⚛️',
          color: 'from-blue-500 to-cyan-500',
          clickable: false,
        },
        {
          id: 'typescript-basics',
          title: 'TypeScript Basics',
          lessons: 10,
          duration: '2h 30min',
          progress: 0,
          image: '🔷',
          color: 'from-blue-600 to-indigo-600',
          clickable: false,
        },
        {
          id: 'nodejs-backend',
          title: 'Node.js Backend',
          lessons: 15,
          duration: '4h 15min',
          progress: 20,
          image: '🟩',
          color: 'from-green-500 to-emerald-500',
          clickable: false,
        },
        {
          id: 'css-tailwind',
          title: 'CSS & Tailwind',
          lessons: 8,
          duration: '2h 10min',
          progress: 100,
          image: '🎨',
          color: 'from-pink-500 to-purple-500',
          clickable: false,
        },
      ]

      setCourses(mockCourses)
      setLoading(false)
    }

    fetchCourses()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
        <span className="text-sm text-gray-500">{courses.length} courses</span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filter Pills */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollable-content">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium whitespace-nowrap">
          All
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium border border-gray-200 whitespace-nowrap">
          In Progress
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium border border-gray-200 whitespace-nowrap">
          Completed
        </button>
        <button className="px-4 py-2 bg-white text-gray-600 rounded-full text-sm font-medium border border-gray-200 whitespace-nowrap">
          Not Started
        </button>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {courses.map(course => (
          <div 
            key={course.id} 
            onClick={() => course.clickable && navigate(`/courses/${course.id}`)}
            className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${course.clickable ? 'cursor-pointer active:bg-gray-50' : 'opacity-75'}`}
          >
            <div className={`h-24 bg-gradient-to-r ${course.color} flex items-center justify-center text-4xl relative`}>
              {course.image}
              {course.clickable && (
                <span className="absolute top-2 right-2 bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  Available
                </span>
              )}
              {!course.clickable && (
                <span className="absolute top-2 right-2 bg-black/20 text-white text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {course.lessons} lessons • {course.duration}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${course.color} rounded-full transition-all duration-300`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">{course.progress}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
