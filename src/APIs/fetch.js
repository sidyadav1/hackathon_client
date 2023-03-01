export const BASE_URL = "https://6a99-125-20-24-2.in.ngrok.io";

export const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
};
