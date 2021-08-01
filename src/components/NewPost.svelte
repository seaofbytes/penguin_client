<script>
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { getNotificationsContext } from "svelte-notifications";
  import { createNewPost } from "../helpers/postHelpers";

  // Push Notifications
  const { addNotification } = getNotificationsContext();

  let avatar, fileinput;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };

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
            on:change={(e) => onFileSelected(e)}
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
