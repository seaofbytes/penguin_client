<script context="module">
  import { baseUrl, headers, getUserFromLocalStorage } from "../helpers/backend";

  // Fetch before rendering
  export async function load({ page }) {
    const res = await fetch(`${baseUrl}/api/v1/posts`, {
      method: "GET",
      headers: headers,
    });

    const data = await res.json();
    return { props: { posts: data.data } };
  }
</script>

<script>
  // Imports
  import Post from "../components/Post.svelte";
  import { onMount } from "svelte";

  export let loggedIn = false;

  onMount(() => {
    loggedIn = getUserFromLocalStorage();
  });

  // Vars
  export let searchTerm;
  export let posts;
</script>

<svelte:head>
  <title>Penguin</title>
</svelte:head>

<div class="py-4 grid gap-4 md:grid-cols-1 px-40 grid-cols-1">
  {#if loggedIn}
    <span class="icon cursor-pointer"
      ><a href="/new"><i class="far fa-plus-square hover:animate-pulse" /></a></span
    >
  {/if}
  <input
    class="w-full rounded-md text-lg p-4 border-2 border-gray-200"
    bind:value={searchTerm}
    placeholder="Search for penguins.."
  />
  <h1 class="text-4xl text-center my-8 uppercase">Peenguin Feed</h1>

  {#each posts as post}
    <Post post={post.attributes} />
  {/each}
</div>

<style>
  .icon {
    color: rgb(131, 203, 236);
    font-size: 60px;
    text-align: center;
    width: 400px;
    margin: 0 auto;
  }

  .icon:hover {
    border: 1px solid lightgrey;
    border-radius: 5px;
  }
</style>
