
const http = require('http')
const url = require('url')
const fs = require('fs').promises

const server = http.createServer(async (req, res) => {

    if (req.url === '/favicon.ico') return

    const myUrl = new URL(req.url, `http://${req.headers.host}`)
    const pathname = myUrl.pathname
    const id = myUrl.searchParams.get('id')

    // console.log(req.url)

    if (pathname === '/') {

        const html = await fs.readFile('./views/bicycles.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(html)

    }

    else if (pathname === '/bicycle' && id >= 0 && id <= 5) {

        const html = await fs.readFile('./views/overview.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(html)

    }

    else if (/\.(png)$/i.test(req.url)) {
        const image = await fs.readFile(`./public/images/${req.url.slice(1)}`)
        res.writeHead(200, { 'Content-Type': 'image/png' })
        res.end(image)
    }

    else if (/\.(css)$/i.test(req.url)) {
        const css = await fs.readFile(`./public/css/index.css`)
        res.writeHead(200, { 'Content-Type': 'text/css' })
        res.end(css)
    }

    else if (/\.(svg)$/i.test(req.url)) {
        const svg = await fs.readFile(`./public/images/icons.svg`)
        res.writeHead(200, { 'Content-Type': 'image/svg+xml' })
        res.end(svg)
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.end('<div><h1>File Not Found</h1></div>')
    }
})

server.listen(3000)