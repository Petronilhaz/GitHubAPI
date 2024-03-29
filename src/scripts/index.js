
import { getUser } from "/src/scripts/services/user.js"
import { getRepositories } from "/src/scripts/services/repositories.js"
import { getEvents } from "/src/scripts/services/events.js"

import { user } from "/src/scripts/objects/user.js"
import { screen } from "/src/scripts/objects/screen.js"

document.getElementById("btn-search").addEventListener("click", () => {
    let userName = document.getElementById("input-search").value
    if(validateInput(userName)) return
    console.log(userName)
    getUserData(userName) 
})

document.getElementById("input-search").addEventListener("keyup", (e) => {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateInput(userName)) return
        getUserData(userName)
    }
})
/*
repositoriesResponse.forks_count
repositoriesResponse.stargazers_count
repositoriesResponse.watchers_count
repositoriesResponse.language
*/


async function getUserData(userName){
    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)
    const userEvents = await getEvents(userName)
    console.log('Response: ', repositoriesResponse)
    

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(userEvents)

    screen.renderUser(user)
    screen.renderEvents(userEvents)
}

function validateInput(userName){
    if(userName.length === 0){
    alert("Informe o nome do usuário GitHub")
    return true
}}
