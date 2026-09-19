const app = document.getElementById("app");
export function renderRoute(){
    const path = window.location.pathname;
    if(path === '/'){
        app.textContent = "Home page from client routing"
    }
    else if(path === "/projects"){
        app.textContent = "Projects page from client routing"
    }
    else if(path === "/users"){
        app.textContent = "Users page from client routing"
    }
    else{
        app.textContent = "404 - page not found"
    }
}
