export const baseUrl = "http://localhost:3000";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const getUserFromLocalStorage = () => {
  const user = window.localStorage.getItem("user");
  if (user) return JSON.parse(user);
  else return false;
};
