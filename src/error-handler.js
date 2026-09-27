function handleError(error, response){
    console.error(error);
    response.writeHead(500, {
        "Content-Type":"application/json"
    });
    response.end(
        JSON.stringify({
            error:"Internal server error"
        })
    )

}
module.exports = handleError;