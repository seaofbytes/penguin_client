<script>
  import Notifications from "svelte-notifications";
  import Nav from "../components/Nav.svelte";
</script>

<div class="p-8 max-w-6xl mx-auto">
  <Notifications>
    <Nav />
    <slot />
  </Notifications>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
