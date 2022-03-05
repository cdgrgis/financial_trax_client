let apiUrl
const apiUrls = {
  production: 'postgres://wcyqtumzufajqt:84b603005416df9aab2e70cd8e06987356f7c941c67a2bf4c7a6d11eb6d486d8@ec2-3-225-79-57.compute-1.amazonaws.com:5432/dfik9m46ab3jud',
  development: 'http://localhost:8000'
}
if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
