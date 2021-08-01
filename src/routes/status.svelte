<script context="module">
  export async function load(ctx) {
    const res = await fetch("http://localhost:3000/api/v1/status");
    const data = await res.json();

    return { props: { status: data.online } };
  }
</script>

<script>
  export let status;
</script>

<svelte:head>
  <title>Status - {status}</title>
</svelte:head>

<div class="flex flex-col items-center">
  <h1 class="text-4xl text-center my-8 uppercase">Status: {status ? "Online" : "Offline"}</h1>
</div>
