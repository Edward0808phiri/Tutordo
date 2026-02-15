import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe = null
    
    const checkAuth = () => {
      if (window.firebaseAuth && window.firebaseAuth.auth) {
        unsubscribe = window.firebaseAuth.onAuthStateChanged(window.firebaseAuth.auth, (currentUser) => {
          setUser(currentUser)
          setLoading(false)
        })
      } else {
        setTimeout(checkAuth, 50)
      }
    }
    
    checkAuth()
    
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const logout = async () => {
    if (window.firebaseAuth && window.firebaseAuth.auth) {
      await window.firebaseAuth.signOut(window.firebaseAuth.auth)
    }
  }

  const value = {
    user,
    loading,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
