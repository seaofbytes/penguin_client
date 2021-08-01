<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { getNotificationsContext } from "svelte-notifications";
  import { createNewPost } from "../helpers/postHelpers";

  // Push Notifications
  const { addNotification } = getNotificationsContext();

  // New post form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      description: "",
      image_url: "",
    },
    validationSchema: yup.object().shape({
      description: yup.string().required(),
      image_url: yup.string().required(),
    }),
    onSubmit: async (values) => {
      const newPost = await createNewPost(values);

      if (newPost) {
        addNotification({
          text: "New post created.",
          position: "top-right",
          type: "success",
          removeAfter: 2000,
        });
      }
    },
  });
</script>

<div style="height: 500px fixed; margin-left: 35%;">
  <div class="fixed mx-4 w-80 pin flex items-center">
    <div class="fixed pin bg-black opacity-75 z-10" />

    <div class="relative w-full mx-4 m-8">
      <h1 class="text-center text-2xl">New post</h1>

      <form on:submit={handleSubmit} class="pt-6 pb-2 my-2">
        <div class="mb-6">
          <!-- password -->
          <label class="block text-sm font-bold mb-2" for="password"> Image </label>
          <input
            on:change={handleChange}
            bind:value={$form.image_url}
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="image_url"
            type="text"
            placeholder="Image url"
          />
          {#if $errors.image_url}
            <small class="uppercase">{$errors.image_url}</small>
          {/if}
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
              on:click={handleSubmit}
              class="ml-16 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
              type="button"
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
