let apiUrl
const apiUrls = {
  production: 'https://financial-trax-api.herokuapp.com',
  development: 'http://localhost:8000'
}
if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
