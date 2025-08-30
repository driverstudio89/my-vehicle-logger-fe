import {jwtDecode} from "jwt-decode";

function decodeJWT(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.log("Invalid token", error);
        return null;
    }
}

export default jwtDecode