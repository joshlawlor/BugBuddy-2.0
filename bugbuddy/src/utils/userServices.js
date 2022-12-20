import tokenService from "./tokenService";

const logout = function(){
    localStorage.removeItem("token")
}

const getUser = function(){
    return tokenService.getUserFromToken
}

export default {
    logout,
    getUser
}
