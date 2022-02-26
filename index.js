
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
    // console.log('Server is now running')

    // console.log(req.headers)
    if (req.url === '/favicon.ico') return
    // console.log(req.url)
    const myUrl = new URL(req.url, `http://${req.headers.host}`)
    // console.log(myUrl)
    const pathname = myUrl.pathname
    const id = myUrl.searchParams.get('id')
    // console.log(pathname, id)

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Welcome to the bicycle shop</h1>')
})

server.listen(3000)