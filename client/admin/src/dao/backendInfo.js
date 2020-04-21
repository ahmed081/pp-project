const uri = window.location.origin.split(':').filter((item , index) => index !=2).join(':')
const port = '3030'
const url = `${uri}:${port}`
export default url