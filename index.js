const http = require('http')
const server = http.createServer((req,res)=>{
    console.log(req.url, req.method)
    console.log("request is made")
    res.setHeader('Content-Type','text/html') /* res.setHeader('Content-Type','text/plain')*/
    res.write('<h1>hello from server</h1>')
    res.end()
})


const port = 3000;
server.listen(port,()=>{
    console.log(`listening to requests on port number ${port}`)
})

setTimeout(()=>{
    console.log("hii i am karim")
},2000)

// setInterval(()=>{    /*loop*/
//     console.log("hello from karim2")
// },2000)

