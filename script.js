const http = require('http')
const server = http.createServer((req,res)=>{

console.log(req.url,req.method)
console.log("Request made")
res.setHeader('Content-Type', 'text/html')
res.write("Hello from server")
res.end()
})

const port = 3000;
server.listen(port, (req,res)=>{

    console.log(`listening to port number ${port}`)
    
    })