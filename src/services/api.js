
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