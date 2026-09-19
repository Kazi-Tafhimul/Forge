import { renderRoute } from "./router.js";


const btn = document.getElementById("btn");
const para = document.querySelector(".para")
const form = document.getElementById("normal-form");
const result = document.createElement("p");

const state = {
    username:"",
    loading: false,
    error: null
}
document.body.appendChild(result);

form.addEventListener("submit", async function(event){
    event.preventDefault();
    const formData = new FormData(form);
    state.username = formData.get("username");
    state.loading = true;
    state.error = null;
    result.textContent = "Creating user..."
   
    try {
        const response = await fetch("/users", {
           method:"POST",
           headers:{
            "Content-Type" : "application/json"
           },
           body:JSON.stringify({
            username:state.username
           })
        })
        if(!response.ok){
            throw new Error(`HTTP error : ${response.status}`)
        }
         const data = await response.json();
         state.username = data.username;
         result.textContent = state.username;
    } catch (error) {
       state.error = error.message;
       result.textContent = state.error;
        
    }finally{
        state.loading = false;
    }
    


})


btn.addEventListener("click", function(){
    para.textContent = "Hi there";
     
})

document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) =>{
        event.preventDefault();
        const path = link.getAttribute("href");
        history.pushState({}, "", path);
        renderRoute();
    })

})
window.addEventListener("popstate", renderRoute);
renderRoute()