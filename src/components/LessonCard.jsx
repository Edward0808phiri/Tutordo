function LessonCard({ lesson }) {
  const statusColors = {
    completed: 'bg-green-100 text-green-700',
    'in-progress': 'bg-yellow-100 text-yellow-700',
    locked: 'bg-gray-100 text-gray-500',
  }

  const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    locked: 'Locked',
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-4">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl flex-shrink-0">
        {lesson.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">{lesson.title}</h3>
        <p className="text-sm text-gray-500 truncate">{lesson.duration}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lesson.status]}`}>
        {statusLabels[lesson.status]}
      </span>
    </div>
  )
}

export default LessonCard
