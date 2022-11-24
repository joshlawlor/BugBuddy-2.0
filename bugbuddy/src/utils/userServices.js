import tokenService from "./tokenService";

function logout(){
    localStorage.removeItem("token")
}

function getUser(){
    return tokenService.getUserFromToken
}

export default {
    logout,
    getUser
}