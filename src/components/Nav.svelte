<script>
  import SignInModal from "./SignInModal.svelte";
  import { UserStore } from "../stores/UserStore";
  import { onMount } from "svelte";

  // State
  export let showSignInModal = false;
  export let user;

  // Subscribe to User
  UserStore.subscribe((data) => {
    user = data.user;
  });

  onMount(() => {
    user = JSON.parse(window.localStorage.getItem("user"));
    //Token.update((value) => window.localStorage.getItem("pToken"));
  });

  export function toggleShow() {
    showSignInModal = !showSignInModal;
  }
</script>

<main>
  <nav class="flex justify-around w-full navbar">
    <div class="icon-container w-50">
      <img
        alt="icon"
        class=""
        width="30"
        height="30"
        type="image/png"
        src="../../public/penguin.svg"
      />
    </div>

    <div class="nav-container w-50">
      <a class="mx-4 text-lg" href="/">Home</a>
      <a class="mx-4 text-lg" href="/profile">Profile</a>
      <a class="mx-4 text-lg" href="status">API</a>

      {#if user && user.username}
        <span>{user.username}</span>
      {:else}
        <span on:click={toggleShow} class="mx-4 text-lg" href="">Sign In</span>
      {/if}
    </div>
  </nav>

  <div class="relative">
    {#if showSignInModal}
      <SignInModal bind:showSignInModal />
    {/if}
  </div>
</main>

<style>
  .relative {
    bottom: 0;
    left: 50%;
    margin: -10 0 0 0; /* 200px is half of the width */
  }

  .navbar {
    height: 50px;
    padding-top: 10px;
    background-color: rgb(131, 203, 236);
    border-radius: 3px;
  }
</style>
