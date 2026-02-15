import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCourseProgress, saveProgress } from '../services/progressService'

// Course data with lessons
const coursesData = {
  'javascript-intro': {
    id: 'javascript-intro',
    title: 'JavaScript Introduction',
    subtitle: 'How to Run Commands in VS Code',
    author: 'Edward Prosper Phiri',
    icon: '💛',
    color: 'from-yellow-500 to-orange-500',
    lessons: [
      {
        id: 1,
        title: 'Introduction to JavaScript',
        content: `JavaScript is a high-level programming language used to create interactive and dynamic content on websites.

JavaScript works together with:
• HTML (Structure)
• CSS (Design)  
• JavaScript (Functionality)

It allows you to build:
• Web apps
• Mobile apps
• Backend servers
• Games
• Desktop applications`
      },
      {
        id: 2,
        title: 'JavaScript Basics',
        content: `Variables store data in JavaScript using let and const.

Example:
\`\`\`javascript
let name = 'Edward';
const age = 25;
\`\`\`

Common Data Types:
• String - Text values
• Number - Numeric values
• Boolean - true/false
• Array - List of items
• Object - Key-value pairs

Functions allow reuse of code:
\`\`\`javascript
function greet() {
  console.log('Welcome!');
}
\`\`\``
      },
      {
        id: 3,
        title: 'How to Run JavaScript in VS Code',
        content: `Step 1: Install Node.js
Confirm installation using:
\`\`\`bash
node -v
\`\`\`

Step 2: Create a JavaScript file (app.js) in VS Code
\`\`\`javascript
console.log('Hello Edward Prosper Phiri!');
\`\`\`

Step 3: Open Terminal in VS Code and run:
\`\`\`bash
node app.js
\`\`\``
      },
      {
        id: 4,
        title: 'Running JavaScript in the Browser',
        content: `Create an index.html file and include JavaScript inside <script> tags.

Use the browser console to test JavaScript using console.log().

Common Commands:
\`\`\`bash
node filename.js    # Run a JS file
node                # Interactive mode
.exit               # Exit interactive mode
cls                 # Clear terminal (Windows)
\`\`\`

Congratulations! You've completed the JavaScript Introduction course! 🎉`
      }
    ]
  }
}

function CourseDetail() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState([])
  const [loading, setLoading] = useState(true)

  const course = coursesData[courseId]

  // Load progress from Firestore on mount
  useEffect(() => {
    const loadProgress = async () => {
      if (user && courseId) {
        const savedProgress = await getCourseProgress(user.uid, courseId)
        setCompletedLessons(savedProgress)
      }
      setLoading(false)
    }
    loadProgress()
  }, [user, courseId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-gray-500">Course not found</p>
        <button 
          onClick={() => navigate('/courses')}
          className="mt-4 text-indigo-600 font-medium"
        >
          Back to Courses
        </button>
      </div>
    )
  }

  const handleLessonComplete = async (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompletedLessons = [...completedLessons, lessonId]
      setCompletedLessons(newCompletedLessons)
      
      // Save to Firestore
      if (user) {
        await saveProgress(user.uid, courseId, newCompletedLessons)
      }
    }
  }

  const progress = Math.round((completedLessons.length / course.lessons.length) * 100)

  // If a lesson is selected, show lesson content
  if (selectedLesson) {
    const lesson = course.lessons.find(l => l.id === selectedLesson)
    const currentIndex = course.lessons.findIndex(l => l.id === selectedLesson)
    const isCompleted = completedLessons.includes(selectedLesson)

    return (
      <div className="px-4 py-4 space-y-4">
        {/* Back button */}
        <button 
          onClick={() => setSelectedLesson(null)}
          className="flex items-center text-gray-600"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Lessons
        </button>

        {/* Lesson header */}
        <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-4 text-white`}>
          <p className="text-sm opacity-80">Lesson {lesson.id} of {course.lessons.length}</p>
          <h2 className="text-xl font-bold mt-1">{lesson.title}</h2>
        </div>

        {/* Lesson content */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="prose prose-sm max-w-none">
            {lesson.content.split('\n').map((line, i) => {
              // Handle code blocks
              if (line.startsWith('```')) {
                return null
              }
              // Handle bullet points
              if (line.startsWith('•')) {
                return <p key={i} className="ml-4 text-gray-700">{line}</p>
              }
              // Handle empty lines
              if (line.trim() === '') {
                return <br key={i} />
              }
              // Regular text
              return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex space-x-3">
          {currentIndex > 0 && (
            <button
              onClick={() => setSelectedLesson(course.lessons[currentIndex - 1].id)}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold"
            >
              Previous
            </button>
          )}
          {!isCompleted ? (
            <button
              onClick={() => {
                handleLessonComplete(selectedLesson)
                if (currentIndex < course.lessons.length - 1) {
                  setSelectedLesson(course.lessons[currentIndex + 1].id)
                }
              }}
              className={`flex-1 py-3 bg-gradient-to-r ${course.color} text-white rounded-xl font-semibold`}
            >
              {currentIndex < course.lessons.length - 1 ? 'Complete & Next' : 'Complete Lesson'}
            </button>
          ) : currentIndex < course.lessons.length - 1 ? (
            <button
              onClick={() => setSelectedLesson(course.lessons[currentIndex + 1].id)}
              className={`flex-1 py-3 bg-gradient-to-r ${course.color} text-white rounded-xl font-semibold`}
            >
              Next Lesson
            </button>
          ) : (
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold"
            >
              ✓ Course Complete!
            </button>
          )}
        </div>
      </div>
    )
  }

  // Show course overview with lesson list
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Back button */}
      <button 
        onClick={() => navigate('/courses')}
        className="flex items-center text-gray-600"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Courses
      </button>

      {/* Course header */}
      <div className={`bg-gradient-to-r ${course.color} rounded-2xl p-5 text-white`}>
        <div className="text-4xl mb-3">{course.icon}</div>
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-white/80 mt-1">{course.subtitle}</p>
        <p className="text-white/60 text-sm mt-2">By {course.author}</p>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{completedLessons.length} of {course.lessons.length} lessons</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Lessons list */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Lessons</h2>
        <div className="space-y-3">
          {course.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id)
            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4 active:bg-gray-50 transition-colors text-left"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                  <p className="text-sm text-gray-500">
                    {isCompleted ? 'Completed' : 'Tap to start'}
                  </p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export { coursesData }
export default CourseDetail
