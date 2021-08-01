<script context="module">
  export async function load(ctx) {
    const res = await fetch("http://localhost:3000/api/v1/status");
    const data = await res.json();

    return { props: { status: data.online } };
  }
</script>

<script>
  import NewPost from "../components/NewPost.svelte";

  export let status;
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="flex flex-col items-center">
  <h1 class="text-4xl text-center my-8 uppercase">Profile Page</h1>
</div>
