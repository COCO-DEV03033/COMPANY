import auth from '@/auth/authService'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  isUserLoggedIn: () => {
    let isAuthenticated = localStorage.getItem('userInfo') ? true : false
    // let isAuthenticated = false

    // // get firebase current user
    // const firebaseCurrentUser = firebase.auth().currentUser

    // if (auth.isAuthenticated() || firebaseCurrentUser) isAuthenticated = true
    // else isAuthenticated = false

    return isAuthenticated
  }
}
