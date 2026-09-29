async function logoutController(request, response){
    response.writeHead(200, {
        "Content-Type":"application/json"
    });
    response.end(JSON.stringify({
        message:"Logged out successfully"
    }))

}
module.exports = logoutController;