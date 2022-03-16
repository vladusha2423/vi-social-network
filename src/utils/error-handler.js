export const errorHandler = (error) => {
    if (error.response.status === 401) {
        window.location.href = '/auth'
        localStorage.removeItem('token')
    }
}
