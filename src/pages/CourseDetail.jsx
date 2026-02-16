import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCourseProgress, saveProgress } from '../services/progressService'
import Quiz from '../components/Quiz'

// Course data with lessons
const coursesData = {
  'html-guide': {
    id: 'html-guide',
    title: 'Comprehensive Guide to HTML',
    subtitle: 'A Complete Beginner to Advanced Introduction',
    author: 'Edward Prosper Phiri',
    icon: '🌐',
    color: 'from-orange-500 to-red-500',
    lessons: [
      {
        id: 1,
        title: 'What is HTML?',
        content: `HTML (HyperText Markup Language) is the standard language used to create webpages. It structures content such as headings, paragraphs, images, links, and forms. HTML is the foundation of all websites.

How it works:
Browser → Reads HTML File → Builds Page Structure → Displays Webpage

HTML is essential because:
• Every website uses HTML
• It's the skeleton of web pages
• Easy to learn and understand
• Works with CSS and JavaScript`
      },
      {
        id: 2,
        title: 'Basic HTML Document Structure',
        content: `Every HTML document follows this basic structure:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome</h1>
  <p>This is my first webpage.</p>
</body>
</html>
\`\`\`

Explanation:
• DOCTYPE defines HTML5
• The html tag wraps everything
• The head contains metadata
• The body contains visible content`
      },
      {
        id: 3,
        title: 'Common HTML Tags',
        content: `Essential HTML tags you need to know:

Headings:
\`\`\`html
<h1>Main Title</h1>
<h2>Subtitle</h2>
<h3>Section Title</h3>
\`\`\`

Paragraph:
\`\`\`html
<p>This is a paragraph of text.</p>
\`\`\`

Links:
\`\`\`html
<a href="https://example.com">Click Here</a>
\`\`\`

Images:
\`\`\`html
<img src="photo.jpg" alt="Description">
\`\`\`

Container:
\`\`\`html
<div>This groups content together</div>
\`\`\``
      },
      {
        id: 4,
        title: 'HTML Attributes',
        content: `Attributes provide additional information inside opening tags. They modify how elements behave or display.

Link with attributes:
\`\`\`html
<a href="https://google.com" target="_blank">Visit Google</a>
\`\`\`

Image with attributes:
\`\`\`html
<img src="photo.jpg" alt="Sample Image" width="300">
\`\`\`

Common attributes:
• href - URL for links
• src - Source for images
• alt - Alternative text
• class - CSS styling
• id - Unique identifier
• style - Inline styles`
      },
      {
        id: 5,
        title: 'Lists in HTML',
        content: `HTML supports two types of lists:

Unordered List (bullets):
\`\`\`html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
\`\`\`

Ordered List (numbered):
\`\`\`html
<ol>
  <li>Step One</li>
  <li>Step Two</li>
  <li>Step Three</li>
</ol>
\`\`\`

You can also nest lists inside each other for sub-items.`
      },
      {
        id: 6,
        title: 'Creating Tables in HTML',
        content: `Tables organize data in rows and columns:

\`\`\`html
<table border="1">
  <tr>
    <th>Name</th>
    <th>Course</th>
  </tr>
  <tr>
    <td>Edward</td>
    <td>Web Development</td>
  </tr>
</table>
\`\`\`

Table elements:
• <table> - Creates the table
• <tr> - Table row
• <th> - Table header cell
• <td> - Table data cell`
      },
      {
        id: 7,
        title: 'HTML Forms',
        content: `Forms collect user input:

\`\`\`html
<form>
  <label>Name:</label>
  <input type="text"><br>
  
  <label>Email:</label>
  <input type="email"><br>
  
  <button>Submit</button>
</form>
\`\`\`

Input types:
• text - Single line text
• email - Email address
• password - Hidden text
• number - Numeric input
• checkbox - Check boxes
• radio - Radio buttons
• submit - Submit button`
      },
      {
        id: 8,
        title: 'Links and Navigation',
        content: `Links connect pages together using the anchor tag:

Internal link:
\`\`\`html
<a href="about.html">About Us</a>
\`\`\`

External link:
\`\`\`html
<a href="https://google.com">Google</a>
\`\`\`

Open in new tab:
\`\`\`html
<a href="https://google.com" target="_blank">Google</a>
\`\`\`

Email link:
\`\`\`html
<a href="mailto:email@example.com">Contact</a>
\`\`\``
      },
      {
        id: 9,
        title: 'Complete Mini Website Example',
        content: `Put it all together in a simple portfolio:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
</head>
<body>
  <h1>Edward Prosper Phiri</h1>
  <p>Welcome to my website.</p>
  
  <h2>About Me</h2>
  <p>I am a web developer.</p>
  
  <h2>Skills</h2>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>
  
  <a href="contact.html">Contact Me</a>
</body>
</html>
\`\`\``
      },
      {
        id: 10,
        title: 'Summary and Next Steps',
        content: `Congratulations! You've learned the fundamentals of HTML! 🎉

Key takeaways:
• HTML structures web content
• Tags define elements
• Attributes modify elements
• Forms collect user data
• Tables organize information

Next steps:
1. Practice by building small projects daily
2. Learn CSS for styling
3. Learn JavaScript for interactivity
4. Build a portfolio website

HTML is the foundation of web development. Keep practicing!`
      }
    ],
    quiz: [
   { q: "1. What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Machine Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"], answer: 0 },
    { q: "2. Which HTML element is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<hyper>"], answer: 1 },
    { q: "3. Which tag is used for a paragraph in HTML?", options: ["<p>", "<para>", "<h1>", "<text>"], answer: 0 },
    { q: "4. Correct element for a line break?", options: ["<break>", "<lb>", "<br>", "<hr>"], answer: 2 },
    { q: "5. Difference between <ul> and <ol>?", options: ["<ul> is numbered, <ol> is bullet", "<ul> is unordered, <ol> is ordered", "<ul> is bold, <ol> is italic", "No difference"], answer: 1 },
    { q: "6. Which attribute makes a link open in a new tab?", options: ["target='_blank'", "href='_new'", "rel='noopener'", "open='new'"], answer: 0 },
    { q: "7. HTML element for embedding video?", options: ["<video>", "<media>", "<movie>", "<embed>"], answer: 0 },
    { q: "8. Purpose of action attribute in a <form>?", options: ["Sets form submission URL", "Defines input types", "Validates form", "Adds styles"], answer: 0 },
    { q: "9. Which input type allows multiple selections?", options: ["text", "radio", "checkbox", "submit"], answer: 2 },
    { q: "10. HTML element for a drop-down list?", options: ["<input>", "<select>", "<option>", "<dropdown>"], answer: 1 },
    { q: "11. Correct attribute for image alt text?", options: ["alt", "title", "desc", "src"], answer: 0 },
    { q: "12. Difference between id and class?", options: ["id is unique, class can repeat", "class is unique, id can repeat", "No difference", "Both must be unique"], answer: 0 },
    { q: "13. Correct way to make a password field?", options: ["<input type='password'>", "<password>", "<input type='text'>", "<input pwd>"], answer: 0 },
    { q: "14. Correct way to display a table header?", options: ["<th>", "<tr>", "<td>", "<thead>"], answer: 0 },
    { q: "15. How do you merge two cells horizontally?", options: ["rowspan", "colspan", "merge", "span"], answer: 1 },
    { q: "16. How to create an ordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: 0 },
    { q: "17. How to make an option selected in a dropdown?", options: ["selected", "checked", "active", "default"], answer: 0 },
    { q: "18. Which tag is used for bold text?", options: ["<b>", "<i>", "<strong>", "<bold>"], answer: 0 },
    { q: "19. Correct tag for main heading?", options: ["<h1>", "<h6>", "<header>", "<title>"], answer: 0 },
    { q: "20. How to create a clickable button linking to example.com?", options: ["<a href='https://example.com'><button>Click</button></a>", "<button href='example.com'>Click</button>", "<link button='example.com'>Click</link>", "<button action='example.com'>Click</button>"], answer: 0 }
]
  },
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
  const [showQuiz, setShowQuiz] = useState(false)

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

  if (showQuiz) {
    return (
      <div className="px-4 py-4 space-y-4">
        <button
          onClick={() => setShowQuiz(false)}
          className="flex items-center text-gray-600"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Course
        </button>
        <Quiz questions={course.quiz} />
      </div>
    );
  }

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

      {course.quiz && (
        <div className="mt-4">
          <button
            onClick={() => setShowQuiz(true)}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  )
}

export { coursesData }
export default CourseDetail
