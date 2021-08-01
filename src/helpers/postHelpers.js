import { baseUrl, headers } from "./backend";

// Fetch posts
export async function fetchPosts() {
  const res = await fetch(`${baseUrl}/api/v1/posts`, {
    method: "GET",
    headers: headers,
  });
  let data = await res.json();
  return data;
}

export async function createNewPost(postData) {
  postData.user_id = "1";
  try {
    const res = await fetch(`${baseUrl}/api/v1/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${window.localStorage.getItem("pToken")}`,
      },
      body: JSON.stringify({ post: postData }),
    });

    const data = await res.json();
    console.log(`new post data: `, data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
