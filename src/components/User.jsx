import { useEffect } from "react"
import { apiRequest } from "../services/api";
import { useState } from "react";
import "../css/User.css"

function User() {

    const [user, setUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await apiRequest("/auth/me");
                setUser(user);
            } catch(err) {
                console.log(err);
            }
        }
        getUser();
    }, []);

    return (
        <div className="user-container">
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Phone number: {user.phoneNumber}</p>
            <button className="btn-change-password">Change password</button>

        </div>
    )
}

export default User