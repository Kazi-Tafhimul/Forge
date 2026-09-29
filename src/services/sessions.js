const crypto = require("crypto");
const sessions = new Map();
async function createSession(userId){
    const sessionId = crypto.randomBytes(32).toString("hex");
    sessions.set(sessionId,{
        userId:userId
    })
    return sessionId;
    

}
 function getSession(sessionId){
    const session = sessions.get(sessionId);
    return session;
}
module.exports = {
    createSession, getSession
};