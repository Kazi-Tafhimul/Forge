const http = require("http");
const router = require("./router");




const server = http.createServer((request, response) => {
    function middleware(request, response, next){
        console.log(request.method);
        console.log(request.url);
        next(request, response)
    }
    middleware(request, response, router);
   
   

  
});



server.listen(3000, () => {
    console.log("Forge server is running at http://localhost:3000");
});