const token = localStorage.getItem("adminToken")
export const header = {
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
    }
}


