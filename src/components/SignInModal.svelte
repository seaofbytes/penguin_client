<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { loginUser } from "../helpers/userHelpers";
  import { getNotificationsContext } from "svelte-notifications";

  // Modal state
  export let showSignInModal;

  const toggleModal = () => {
    showSignInModal = !showSignInModal;
  };

  // Push Notifications
  const { addNotification } = getNotificationsContext();

  // Login form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      const user = await loginUser(values);

      if (user) {
        addNotification({
          text: "Sign in successful.",
          position: "top-right",
          type: "success",
          removeAfter: 2000,
        });

        showSignInModal = false;
      }
    },
  });

  // Create a new custom event when clicking outside target
  export function clickOutside(node) {
    const handleClick = (event) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent("click_outside", node));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }

  function handleClickOutside(event) {
    toggleModal();
  }
</script>

<div use:clickOutside on:click_outside={handleClickOutside} style="height: 500px fixed">
  <div class="fixed mx-4 w-80 pin flex items-center">
    <div class="fixed pin bg-black opacity-75 z-10" />

    <div class="relative w-full mx-4 m-8">
      <div class="shadow-lg bg-white rounded-lg p-8">
        <div class="flex justify-end mb-6">
          <button on:click={toggleModal}>
            <span class="mr-2">Close</span>
            <span>
              <i class="fa fa-times" />
            </span>
          </button>
        </div>

        <h1 class="text-center text-2xl">Login</h1>

        <form on:submit={handleSubmit} class="pt-6 pb-2 my-2">
          <div class="mb-4">
            <!-- email -->
            <label class="block text-sm font-bold mb-2" for="email"> Email Address </label>
            <input
              on:change={handleChange}
              bind:value={$form.email}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="email"
              type="text"
              placeholder="Email Address"
            />
            {#if $errors.email}
              <small class="uppercase">{$errors.email}</small>
            {/if}
          </div>
          <div class="mb-6">
            <!-- password -->
            <label class="block text-sm font-bold mb-2" for="password"> Password </label>
            <input
              on:change={handleChange}
              bind:value={$form.password}
              class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              placeholder="Password"
            />
            {#if $errors.password}
              <small class="uppercase">{$errors.password}</small>
            {/if}
          </div>
          <div class="mb-6 justify-around flex-col">
            <div>
              <button
                on:click={handleSubmit}
                class="ml-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
                type="button"
              >
                Sign In
              </button>
            </div>
            <br />

            <div class=" mt-4 md:mt-0">
              <a on:click={toggleModal} href="/register" class="ml-8 text-green underline"
                >No account? Sign up!</a
              >
              <!-- <span class="ml-12 text-green no-underline">Forget Password?</span> -->
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
