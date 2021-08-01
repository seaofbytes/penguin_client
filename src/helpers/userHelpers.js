import { UserStore } from "../stores/UserStore";

const baseUrl = "http://localhost:3000";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// Token
export function saveTokenToLocalStorage(token) {
  window.localStorage.setItem("pToken", token);
}

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", user);
}

// Register user
export async function registerUser(userData) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/users`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user: userData }),
    });

    return await res.json();
  } catch (error) {
    console.log(`error`, error);
    return null;
  }
}

// Log in user
export async function loginUser(userData) {
  try {
    const res = await fetch(`${baseUrl}/api/v1/users/sign_in`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ user: userData }),
    });

    const data = await res.json();
    const token = res.headers.get("access-token");
    if (token) {
      saveTokenToLocalStorage(token); // Token to local storage
    }

    if (data) {
      saveUserToLocalStorage(JSON.stringify(data.user));
      UserStore.set({ user: data.user }); // User to global store
    }

    return data;
  } catch (error) {
    console.log(`error`, error);
    return null;
  }
}
