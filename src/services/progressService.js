// Progress service for saving/loading course progress to Firebase Firestore

export const getProgress = async (userId) => {
  try {
    const { db, doc, getDoc } = window.firebaseDb
    const docRef = doc(db, 'userProgress', userId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return docSnap.data()
    }
    return { courses: {} }
  } catch (error) {
    console.error('Error getting progress:', error)
    return { courses: {} }
  }
}

export const saveProgress = async (userId, courseId, completedLessons) => {
  try {
    const { db, doc, setDoc, getDoc } = window.firebaseDb
    const docRef = doc(db, 'userProgress', userId)
    
    // Get existing data
    const docSnap = await getDoc(docRef)
    const existingData = docSnap.exists() ? docSnap.data() : { courses: {} }
    
    // Update with new course progress
    const updatedData = {
      ...existingData,
      courses: {
        ...existingData.courses,
        [courseId]: {
          completedLessons,
          lastUpdated: new Date().toISOString()
        }
      }
    }
    
    await setDoc(docRef, updatedData)
    return true
  } catch (error) {
    console.error('Error saving progress:', error)
    return false
  }
}

export const getCourseProgress = async (userId, courseId) => {
  try {
    const progress = await getProgress(userId)
    return progress.courses?.[courseId]?.completedLessons || []
  } catch (error) {
    console.error('Error getting course progress:', error)
    return []
  }
}
