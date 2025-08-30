
export const getVehicles = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch("http://localhost:8080/vehicles", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    
    return data;
}


const getUserData = async () => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    return data;
}