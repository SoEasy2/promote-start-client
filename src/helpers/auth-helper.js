
function getAccessToken() {
    return localStorage.getItem('access_token')
}

function setAccessToken(token) {
    return localStorage.setItem('access_token', token)
}

function removeAccessToken() {
    return localStorage.removeItem('access_token')
}

export {
    getAccessToken, setAccessToken, removeAccessToken,
}
