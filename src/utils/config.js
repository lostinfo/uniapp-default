let BASE_URL
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://app/localhost'
} else {
  BASE_URL = 'https://app.com'
}

const API_URL = BASE_URL + '/api'
export {BASE_URL, API_URL}
