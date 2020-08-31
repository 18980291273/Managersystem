import Cookie from "js-cookie";

let StoreCookie = Cookie;
const TOKEN_KEY = "token_key"

const SetToken = (token) => {
    StoreCookie.set(TOKEN_KEY, token);
}

const GetToken = () => {
    return StoreCookie.get(TOKEN_KEY);
}

const DeleteToken = () => {
    StoreCookie.remove(TOKEN_KEY);
}

export { SetToken, GetToken, DeleteToken }
