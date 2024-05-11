import axios from 'axios'
import store from '../../../../store/store.js'

const API_URL = 'http://localhost:5050'

// Token Refresh
let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched (access_token) {
  subscribers = subscribers.filter(callback => callback(access_token))
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

export default {
  init () {
    axios.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      // const { config, response: { status } } = error
      const { config, response } = error
      const originalRequest = config

      // if (status === 401) {
      if (response && response.status === 401) {
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true
          store.dispatch('auth/fetchAccessToken')
            .then((access_token) => {
              isAlreadyFetchingAccessToken = false
              onAccessTokenFetched(access_token)
            })
        }

        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber(access_token => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            resolve(axios(originalRequest))
          })
        })
        return retryOriginalRequest
      }
      return Promise.reject(error)
    })
  },
  login (userID, pwd) {
    return axios.post(API_URL + '/api/auth/login', {
      userID,
      password: pwd
    })
  },
  async registerUser (name, userID, dob, organization, department, team, gender, pwd) {

    console.log(name, userID, dob, organization, department, team, gender, pwd)

    return await axios.post(API_URL + '/api/auth/register', {
      name,
      dob,
      gender,
      userID,
      organization,
      department,
      team,
      password: pwd
    })
  },
  refreshToken () {
    return axios.post(API_URL + '/api/auth/refresh-token', {accessToken: localStorage.getItem('accessToKen')})
  }
}
