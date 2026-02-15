// Firebase is loaded via CDN in index.html
// This file exports the Firebase auth functions from the global window object

const getFirebaseAuth = () => {
  return window.firebaseAuth || {}
}

export const auth = { get current() { return getFirebaseAuth().auth } }
export const googleProvider = { get current() { return getFirebaseAuth().googleProvider } }

export const signInWithPopup = (...args) => getFirebaseAuth().signInWithPopup(...args)
export const signInWithEmailAndPassword = (...args) => getFirebaseAuth().signInWithEmailAndPassword(...args)
export const createUserWithEmailAndPassword = (...args) => getFirebaseAuth().createUserWithEmailAndPassword(...args)
export const signOut = (...args) => getFirebaseAuth().signOut(...args)
export const onAuthStateChanged = (...args) => getFirebaseAuth().onAuthStateChanged(...args)
