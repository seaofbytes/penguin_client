<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { getNotificationsContext } from "svelte-notifications";
  import { createNewPost } from "../helpers/postHelpers";
  import { getUserFromLocalStorage } from "../helpers/backend";
  import { onMount } from "svelte";

  // Push Notifications
  const { addNotification } = getNotificationsContext();

  // State
  let avatar, fileinput, user;
  let attachedImage;

  onMount(() => {
    user = getUserFromLocalStorage();
  });

  // File upload handler
  const handleImageUpload = async (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(image);

    reader.onload = (e) => {
      avatar = e.target.result;
    };
    attachedImage = e.target.files[0];
  };

  // New post form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      description: "",
    },
    validationSchema: yup.object().shape({
      description: yup.string().required(),
    }),
    onSubmit: async (values) => {
      const data = { ...values, user_id: user.id, image_url: "placeholder" };
      let formData = new FormData();
      formData.append("image", attachedImage);
      formData.append("post", JSON.stringify(data));

      const newPost = await createNewPost(formData);
      if (newPost) {
        addNotification({
          text: "New post created.",
          position: "top-right",
          type: "success",
          removeAfter: 2000,
        });

        // Wtf
        //window.location.replace("/");
        let redirect = document.createElement("a");
        redirect.href = "/";
        redirect.click();
      }
    },
  });
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="relative inline-block text-left">
  <div>
    <button
      type="button"
      class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      id="menu-button"
      aria-expanded="true"
      aria-haspopup="true"
    >
      Options
      <!-- Heroicon name: solid/chevron-down -->
      <svg
        class="-mr-1 ml-2 h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  -->
  <div
    class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div class="py-1" role="none">
      <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
      <a
        href="#"
        class="text-gray-700 block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-0">Account settings</a
      >
      <a
        href="#"
        class="text-gray-700 block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-1">Support</a
      >
      <a
        href="#"
        class="text-gray-700 block px-4 py-2 text-sm"
        role="menuitem"
        tabindex="-1"
        id="menu-item-2">License</a
      >
      <form method="POST" action="#" role="none">
        <button
          type="submit"
          class="text-gray-700 block w-full text-left px-4 py-2 text-sm"
          role="menuitem"
          tabindex="-1"
          id="menu-item-3"
        >
          Sign out
        </button>
      </form>
    </div>
  </div>
</div>
<div style="height: 500px fixed; margin-left: 35%;">
  <div class="fixed mx-4 w-80 pin flex items-center">
    <div class="fixed pin bg-black opacity-75 z-10" />

    <div class="relative w-full mx-4 m-8">
      <h1 class="text-center text-2xl">New post</h1>

      <form on:submit={handleSubmit} class="pt-6 pb-2 my-2">
        <div id="app">
          <h1>Upload Image</h1>

          {#if avatar}
            <img class="avatar" src={avatar} alt="d" />
          {:else}
            <img
              class="avatar"
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
              alt=""
            />
          {/if}
          <img
            class="upload"
            src="https://static.thenounproject.com/png/625182-200.png"
            alt=""
            on:click={() => {
              fileinput.click();
            }}
          />
          <div
            class="chan"
            on:click={() => {
              fileinput.click();
            }}
          >
            Choose Image
          </div>
          <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={(e) => handleImageUpload(e)}
            bind:this={fileinput}
          />
        </div>

        <div class="mb-4">
          <!-- description -->
          <label class="block text-sm font-bold mb-2" for="description"> Description </label>
          <textarea
            on:change={handleChange}
            bind:value={$form.description}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            id="description"
            type="text"
            placeholder="Description"
          />
          {#if $errors.description}
            <small class="uppercase">{$errors.description}</small>
          {/if}
        </div>

        <div class="mb-6 justify-around flex-col">
          <div>
            <button
              class="ml-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
              type="submit"
            >
              Create post
            </button>
          </div>
          <br />
        </div>
      </form>
    </div>
  </div>
</div>

<style>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
  }

  .upload {
    display: flex;
    height: 50px;
    width: 50px;
    cursor: pointer;
  }
  .avatar {
    display: flex;
    height: 200px;
    width: 200px;
  }
</style>
