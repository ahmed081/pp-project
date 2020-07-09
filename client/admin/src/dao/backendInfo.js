const uri = window.location.origin.split(':').filter((item , index) => index !=2).join(':')
const port = '3030'
const url = `http://192.168.1.13:3030`
export default url