
export const login = async (email, password) => {
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  const accessToken = data.token;

  localStorage.setItem("accessToken", accessToken);
  
  return accessToken;
};

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