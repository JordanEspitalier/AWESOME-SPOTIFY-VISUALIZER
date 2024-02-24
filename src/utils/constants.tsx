export const CLIENT_ID : string = '02c412f465e5473ea53e26b67b56e705'
export const REDIRECT_URI : string = 'http://localhost:5173/'
export const AUTH_ENDPOINT : string = 'https://accounts.spotify.com/authorize'
export const RESPONSE_TYPE : string = 'token'
export const HREF_LOGIN : string = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
export const API_BASE_URI : string = 'https://api.spotify.com/v1/'